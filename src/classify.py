import base64

with open("test.jpg", "rb") as img_file:
    base64_string = base64.b64encode(img_file.read()).decode("utf-8")

print(base64_string[:100])  # Print first 100 characters to verify

with open("output_file.txt", "w") as txt_file:
    txt_file.write(base64_string)
