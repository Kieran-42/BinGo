import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import GlobalAveragePooling2D, Dense, Dropout
from tensorflow.keras.models import Sequential
import numpy as np
import os
import base64
from io import BytesIO
from PIL import Image


# Define a singleton model loader
class ModelSingleton:
    _model = None

    @staticmethod
    def get_model():
        """Load the fine-tuned model once and keep it in memory."""
        if ModelSingleton._model is None:
            model_path = os.path.join(os.path.dirname(__file__), "bin", "model.tflite")

            if os.path.exists(model_path):
                print(f"Using TFLite model from {model_path}")
                ModelSingleton._model = tf.lite.Interpreter(model_path=model_path)
                ModelSingleton._model.allocate_tensors()
            else:
                print("No TFLite model found, loading and fine-tuning Keras model...")
                ModelSingleton._model = ModelSingleton.finetune_model()
                ModelSingleton.convert_to_tflite()

        return ModelSingleton._model

    @staticmethod
    def finetune_model():
        """Fine-tune MobileNetV2 for garbage classification."""
        base_model = MobileNetV2(weights="imagenet", include_top=False)
        base_model.trainable = True  # Enable fine-tuning

        model = Sequential([
            base_model,
            GlobalAveragePooling2D(),
            Dense(512, activation="relu"),
            Dropout(0.3),
            Dense(len(class_labels), activation="softmax")
        ])

        model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.0001),
                      loss="categorical_crossentropy",
                      metrics=["accuracy"])
        return model

    @staticmethod
    def convert_to_tflite():
        """Convert the trained model to TensorFlow Lite."""
        converter = tf.lite.TFLiteConverter.from_keras_model(ModelSingleton._model)
        tflite_model = converter.convert()

        # Save the TFLite model
        model_path = os.path.join(os.path.dirname(__file__), "bin", "model.tflite")
        with open(model_path, "wb") as f:
            f.write(tflite_model)

        print(f"TFLite model saved at {model_path}")


# Define the class labels (Maintain the same order as in training)
class_labels = [
    "battery", "biological", "brown-glass", "cardboard", "clothes", "green-glass",
    "metal", "paper", "plastic", "shoes", "trash", "white-glass"
]


def image_classification(img_input):
    """Classifies an image using the fine-tuned MobileNetV2 model.

    Parameters:
        img_input (str, bytes, or PIL Image): Image data as a file path, base64 string, or PIL image object.

    Returns:
        list: Top-3 predicted class labels with probabilities.
    """
    model = ModelSingleton.get_model()

    # Handle different input formats
    if isinstance(img_input, str):
        if img_input.startswith("data:image"):  # Base64 string from React Native
            base64_data = img_input.split(",")[1]  # Remove the prefix
            img = Image.open(BytesIO(base64.b64decode(base64_data)))
        elif os.path.exists(img_input):  # Local file path
            img = Image.open(img_input)
    elif isinstance(img_input, bytes):
        img = Image.open(BytesIO(img_input))
    else:
        return None

    # Preprocess Image
    img = img.resize((224, 224))  # Ensure it's the right size
    img_array = np.array(img) / 255.0  # Normalize
    img_array = np.expand_dims(img_array, axis=0)

    # Run inference with TFLite
    input_tensor_index = model.get_input_details()[0]['index']
    output_tensor_index = model.get_output_details()[0]['index']

    model.set_tensor(input_tensor_index, img_array.astype(np.float32))
    model.invoke()
    predictions = model.get_tensor(output_tensor_index)[0]

    # Get top-3 predictions
    top_3_indices = np.argsort(predictions)[-3:][::-1]  # Sort in descending order
    top_3_labels = [(class_labels[i], float(predictions[i])) for i in top_3_indices]

    return top_3_labels
