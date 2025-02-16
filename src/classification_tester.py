import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
import os

#Load the trained model
model_path = os.path.join("bin", "garbage_classifier_mobilenetv2.keras")
model = tf.keras.models.load_model(model_path)

# Define the class labels (Keep order if trained)
class_labels = [
    "battery", "biological", "brown-glass", "cardboard", "clothes", "green-glass",
    "metal", "paper", "plastic", "shoes", "trash", "white-glass"
]

# Path to test images folder
test_folder = "test_images"

# Loop through all test images in the folder
for img_name in os.listdir(test_folder):
    img_path = os.path.join(test_folder, img_name)

    # Load and preprocess the image
    img = image.load_img(img_path, target_size=(224, 224))  # Resize to model's input size
    img_array = image.img_to_array(img) / 255.0  # Normalize
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

    # Make a prediction
    predictions = model.predict(img_array)[0]  # Extract the single batch prediction
    predicted_class = np.argmax(predictions)

    # Display result with percentages
    print(f"Image: {img_name} --> Predicted Class: {class_labels[predicted_class]} ({predictions[predicted_class] * 100:.2f}%)")

    # Show all class probabilities
    print("Class probabilities:")
    for label, prob in zip(class_labels, predictions):
        print(f"  {label}: {prob * 100:.2f}%")
    print("-" * 50)  # Separator for readability


def image_classification(img, model, class_labels, img_name="Image"):
    img_array = image.img_to_array(img) / 255.0  # Normalize
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

    # Make a prediction
    predictions = model.predict(img_array)[0]  # Extract the single batch prediction
    predicted_class = np.argmax(predictions)
    predicted_label = class_labels[predicted_class]
    confidence = predictions[predicted_class] * 100  # Convert to percentage

    # Display result with percentages
    print(f"Image: {img_name} --> Predicted Class: {predicted_label} ({confidence:.2f}%)")

    # Show all class probabilities
    print("Class probabilities:")
    for label, prob in zip(class_labels, predictions):
        print(f"  {label}: {prob * 100:.2f}%")
    print("-" * 50)  # Separator for readability

    # Return label if confidence is high
    if confidence >= 95:
        return predicted_label

    return None