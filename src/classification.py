import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
import os
import base64
from io import BytesIO
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow requests from React Native

# Load Model Singleton
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

# Define class labels
class_labels = [
    "battery", "biological", "brown-glass", "cardboard", "clothes", "green-glass",
    "metal", "paper", "plastic", "shoes", "trash", "white-glass"
]

def image_classification(img_input):
    """
    Classifies an image using the pre-loaded model.
    """
    model = ModelSingleton.get_model()
    if model is None:
        print("Error: Model is not loaded.")
        return None

    try:
        # Decode Base64 Image
        img = Image.open(BytesIO(base64.b64decode(img_input)))
        img = img.resize((224, 224))  # Resize for model
        img_array = image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # Predict
        predictions = model.predict(img_array)[0]
        predicted_class = np.argmax(predictions)
        predicted_label = class_labels[predicted_class]
        confidence = predictions[predicted_class] * 100

        return {"class": predicted_label, "confidence": confidence}
    except Exception as e:
        print(f"Error processing image: {e}")
        return None

# Flask API Endpoint
@app.route('/classify', methods=['POST'])
def classify():
    try:
        data = request.json
        if "image" not in data:
            return jsonify({"error": "No image provided"}), 400
        
        result = image_classification(data["image"])
        if result:
            return jsonify(result)
        else:
            return jsonify({"error": "Classification failed"}), 500
    except Exception as e:
        return jsonify({"error": f"Server error: {e}"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
