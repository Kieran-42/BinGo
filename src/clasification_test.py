import sys
from classification import image_classification  # Import your function
from PIL import Image

def test_with_image(image_path):
    """ Test the classification function with a local image file. """
    result = image_classification(image_path)
    if result:
        print(f"Predicted Class: {result}")
    else:
        print("Prediction confidence too low or an error occurred.")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python test_classifier.py <image_path>")
    else:
        image_path = sys.argv[1]
        test_with_image(image_path)
