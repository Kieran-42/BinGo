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
    model = ModelSingleton.get_model()
    if model is None:
        print("Error: Model not loaded")
        return {"class": "unknown", "confidence": 0.0}

    try:
        print("Decoding image...")  # ✅ Log decoding
        img_bytes = base64.b64decode(img_input)
        img = Image.open(BytesIO(img_bytes))
        img = img.resize((224, 224))  # Resize for model
        img_array = image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        print("Running model prediction...")  # ✅ Log prediction start
        predictions = model.predict(img_array)[0]
        predicted_class = np.argmax(predictions)
        predicted_label = class_labels[predicted_class]
        confidence = predictions[predicted_class] * 100

        print(f"Predicted: {predicted_label}, Confidence: {confidence:.2f}%")  # ✅ Log results

        return {"class": predicted_label, "confidence": round(confidence, 2)}

    except Exception as e:
        print(f"Error during classification: {e}")  # ✅ Log errors
        return {"class": "unknown", "confidence": 0.0, "error": str(e)}


# Flask API Endpoint
@app.route('/classify', methods=['POST'])
def classify():
    try:
        print("📩 Received API request...")  # ✅ Log request

        data = request.json
        if "image" not in data:
            print("❌ Error: No image provided")
            return jsonify({"error": "No image provided"}), 400

        print("✅ Image received. Processing...")
        result = image_classification(data["image"])

        print(f"✅ Classification Result: {result}")  # ✅ Log prediction
        return jsonify(result)

    except Exception as e:
        print(f"❌ Server error: {e}")  # ✅ Log errors
        return jsonify({"error": f"Server error: {e}"}), 500


if __name__ == "__main__":
    initialize_json()  # Ensure JSON file is initialized
    port = int(os.environ.get("PORT", 5000))  # ✅ Use Railway's dynamic port
    app.run(host="0.0.0.0", port=port, debug=True)
