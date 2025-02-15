import tensorflow as tf
from tensorflow.keras.preprocessing import image
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
        """Load the model once and keep it in memory."""
        if ModelSingleton._model is None:
            model_path = os.path.join(os.path.dirname(__file__), "bin", "garbage_classifier_mobilenetv2.keras")
            try:
                ModelSingleton._model = tf.keras.models.load_model(model_path)
                print(f"Model loaded successfully from {model_path}")
            except Exception as e:
                print(f"Error loading model: {e}")
                ModelSingleton._model = None
        return ModelSingleton._model

# Define the class labels (Maintain the same order as in training)
class_labels = [
    "battery", "biological", "brown-glass", "cardboard", "clothes", "green-glass",
    "metal", "paper", "plastic", "shoes", "trash", "white-glass"
]


def image_classification(img_input):
    """
    Classifies an image using a pre-loaded MobileNetV2 model.

    Parameters:
        img_input (str, bytes, or PIL Image): Image data as a file path, base64 string, or PIL image object.

    Returns:
        str or None: The predicted class label if confidence is 95% or higher, else None.
    """
    model = ModelSingleton.get_model()
    if model is None:
        print("Error: Model is not loaded. Cannot classify images.")
        return None

    try:
        # Handle different input formats
        if isinstance(img_input, str):
            if img_input.startswith("data:image"):  # Base64 string from React Native
                base64_data = img_input.split(",")[1]  # Remove the prefix
                img = Image.open(BytesIO(base64.b64decode(base64_data)))
            elif os.path.exists(img_input):  # Local file path
                img = image.load_img(img_input, target_size=(224, 224))
            else:
                print("Error: Invalid image input format")
                return None
        elif isinstance(img_input, bytes):  # If directly received as bytes
            img = Image.open(BytesIO(img_input))
        else:  # Assume it's already a PIL image object
            img = img_input

        # Resize image for the model
        img = img.resize((224, 224))

        # Convert image to array and normalize
        img_array = image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

        # Make a prediction
        predictions = model.predict(img_array)[0]
        if len(predictions) != len(class_labels):
            print("Error: Model output does not match expected class labels.")
            return None

        predicted_class = np.argmax(predictions)
        predicted_label = class_labels[predicted_class]
        confidence = predictions[predicted_class] * 100  # Convert to percentage

        # Return label if confidence is high
        return predicted_label if confidence >= 95 else None

    except Exception as e:
        print(f"Error processing image: {e}")
        return None
