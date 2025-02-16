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
            model_path = os.path.join(os.path.dirname(__file__), "bin", "saved_model")  # 🔹 Using TensorFlow SavedModel format
            try:
                ModelSingleton._model = tf.saved_model.load(model_path)  # 🔹 Faster model loading
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

# Combine glass categories into one
glass_labels = ["brown-glass", "green-glass", "white-glass"]

def update_classification_count(label):
    """Update classification count in the JSON file."""
    try:
        with open(CLASSIFICATION_COUNT_FILE, "r") as f:
            counts = json.load(f)

        # Merge glass categories early
        if label in glass_labels:
            label = "glass"

        # Increment the count for the classified item
        counts[label] = counts.get(label, 0) + 1

        # Save updated counts back to file
        with open(CLASSIFICATION_COUNT_FILE, "w") as f:
            json.dump(counts, f, indent=4)

    except Exception as e:
        print(f"Error updating classification count: {e}")

def predict_with_augmentations(img_array, model):
    """
    Perform test-time augmentations (horizontal & vertical flips) and
    average predictions to improve accuracy.
    """
    augmentations = [
        img_array,
        np.fliplr(img_array),  # Flip horizontally
        np.flipud(img_array)   # Flip vertically
    ]
    
    predictions = np.mean(
        [model(np.expand_dims(aug, axis=0)) for aug in augmentations], axis=0
    )
    return predictions

def image_classification(img_input):
    """
    Classifies an image using the pre-loaded model.
    """
    model = ModelSingleton.get_model()
    if model is None:
        print("Error: Model is not loaded.")
        return {"class": "unknown", "confidence": "undefined"}

    try:
        # Decode Base64 Image
        img = Image.open(BytesIO(base64.b64decode(img_input)))
        img = img.resize((256, 256))  # 🔹 Increased resolution for better accuracy
        img_array = image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # 🔹 Use test-time augmentation
        predictions = predict_with_augmentations(img_array, model)

        predicted_class = np.argmax(predictions)
        predicted_label = class_labels[predicted_class]
        confidence = float(predictions[predicted_class] * 100)  # Ensure float conversion

        # 🔹 Merge glass categories
        if predicted_label in glass_labels:
            predicted_label = "glass"

        # 🔹 Confidence Thresholding (ignore low-confidence predictions)
        confidence_threshold = 50  # Only accept predictions above 50%
        if confidence < confidence_threshold:
            return {"class": "uncertain", "confidence": str(confidence)}

        # Update classification count
        update_classification_count(predicted_label)

        return {"class": predicted_label, "confidence": str(confidence)}

    except Exception as e:
        print(f"Error processing image: {e}")
        return {"class": "unknown", "confidence": "undefined"}

# Flask API Endpoint
@app.route('/classify', methods=['POST'])
def classify():
    try:
        data = request.json
        if "image" not in data:
            return jsonify({"class": "unknown", "confidence": "undefined", "error": "No image provided"}), 400
        
        result = image_classification(data["image"])
        return jsonify(result), (200 if "error" not in result else 500)

    except Exception as e:
        return jsonify({"class": "unknown", "confidence": "undefined", "error": f"Server error: {e}"}), 500

@app.route('/stats', methods=['GET'])
def get_classification_stats():
    """Endpoint to return classification statistics, with an optional category query."""
    try:
        with open(CLASSIFICATION_COUNT_FILE, "r") as f:
            counts = json.load(f)

        category = request.args.get("category")  # Get category from query parameter
        
        if category:
            if category in counts:
                return jsonify({category: counts[category]})
            else:
                return jsonify({"error": "Category not found"}), 404
        else:
            return jsonify(counts)  # Return all stats if no category is specified

    except Exception as e:
        return jsonify({"error": f"Server error: {e}"}), 500

if __name__ == "__main__":
    initialize_json()  # Ensure JSON file is initialized
    app.run(host="0.0.0.0", port=5000, debug=True)
