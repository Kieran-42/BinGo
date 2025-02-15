import sys
from classification import image_classification  # Assuming your function is in model.py

if len(sys.argv) < 2:
    print("Error: No image file provided")
    sys.exit(1)

image_path = sys.argv[1]
result = image_classification(image_path)

if result:
    print(result)
else:
    print("Unknown")
