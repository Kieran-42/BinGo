import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
import os
import base64
import json
from io import BytesIO
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024  # 16MB file size limit

# Path to JSON file for tracking classification counts
CLASSIFICATION_COUNT_FILE = "classification_counts.json"

# Ensure JSON file exists
def initialize_json():
    if not os.path.exists(CLASSIFICATION_COUNT_FILE):
        with open(CLASSIFICATION_COUNT_FILE, "w") as f:
            json.dump({}, f)

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

# Merge glass categories
glass_labels = {"brown-glass", "green-glass", "white-glass"}

def update_classification_count(label):
    """Update classification count in the JSON file."""
    try:
        with open(CLASSIFICATION_COUNT_FILE, "r") as f:
            counts = json.load(f)

        # Merge glass categories
        if label in glass_labels:
            label = "glass"

        # Increment the count
        counts[label] = counts.get(label, 0) + 1

        # Save updated counts
        with open(CLASSIFICATION_COUNT_FILE, "w") as f:
            json.dump(counts, f, indent=4)

    except Exception as e:
        print(f"Error updating classification count: {e}")

def image_classification(img_input):
    """
    Classifies an image using the pre-loaded model.
    """
    model = ModelSingleton.get_model()
    if model is None:
        return {"class": "unknown", "confidence": "undefined"}

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

        confidence = predictions[predicted_class] * 100  # Convert to percentage

        # Merge glass categories
        if predicted_label in glass_labels:
            predicted_label = "glass"

        # Apply confidence threshold
        confidence_threshold = 95  # Only accept high-confidence predictions
        if confidence < confidence_threshold:
            return {"class": "uncertain", "confidence": f"{confidence:.2f}%"}

        # Update classification count
        update_classification_count(predicted_label)

        return {"class": predicted_label, "confidence": f"{confidence:.2f}%"}

    except Exception as e:
        return {"class": "unknown", "confidence": "undefined", "error": str(e)}

# Flask API Endpoint
@app.route('/classify', methods=['POST'])
def classify():
    try:
        data = request.json
        if "image" not in data:
            return jsonify({"error": "No image provided"}), 400
        
        result = image_classification(data["image"])
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": f"Server error: {e}"}), 500

if __name__ == "__main__":
    initialize_json()  # Ensure JSON file is initialized
    app.run(host="0.0.0.0", port=5000, debug=True)
