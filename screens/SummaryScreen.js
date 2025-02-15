import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
// Import TensorFlow.js and its React Native integration
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import { decodeJpeg } from "@tensorflow/tfjs-react-native";
import * as FileSystem from "expo-file-system";

export default function SummaryScreen({ route }) {
  // this is the uri that we passed from the camera screen page
  const { photoUri } = route.params || {};

  // This is just randomly selected right now --> we will have to feed image into
  // model later to get this values
  const [classification, setClassification] = useState(null);
  // State variable to hold the loaded Keras model instance
  const [model, setModel] = useState(null);

  // Load the Keras model when the component mounts
  useEffect(() => {
    async function loadModel() {
      try {
        // Wait for tfjs to be ready
        await tf.ready();
        // we load the Keras model using tf.loadLayersModel.
        const modelFile = require("src/bin/garbage_classifier_mobilenetv2.keras");
        const loadedModel = await tf.loadLayersModel(modelFile);
        console.log("Model loaded:", loadedModel);
        setModel(loadedModel);
      } catch (error) {
        console.log("Error loading model:", error);
      }
    }
    loadModel();
  }, []);

  // Once our model is loaded & we have a valid photoUri we run inference on the image.
  useEffect(() => {
    if (model && photoUri) {
      async function runInference() {
        try {
          // Load the image file from photoUri as a base64 string
          const imgB64 = await FileSystem.readAsStringAsync(photoUri, { encoding: FileSystem.EncodingType.Base64 });
          // Convert the base64 string to a binary string
          const imgBuffer = tf.util.encodeString(imgB64, "base64");
          const raw = new Uint8Array(imgBuffer);
          // Decode the JPEG image to a tensor
          const imageTensor = decodeJpeg(raw);
          // Preprocess the image:
          const resized = tf.image.resizeBilinear(imageTensor, [224, 224]);
          const normalized = resized.div(255.0);
          const batched = normalized.expandDims(0);
          // Run the model prediction
          const prediction = model.predict(batched);
          const predictionData = prediction.dataSync();
          const predictedIndex = predictionData.indexOf(Math.max(...predictionData));
          // Here we simulate mapping the predicted index to a label.
          const labels = ["Recycle", "Landfill", "Compost", "Hazardous Waste"];
          const predictedLabel = labels[predictedIndex] || "Unknown";
          console.log("Inference result:", predictedLabel);
          setClassification(predictedLabel);
        } catch (error) {
          console.log("Error during inference:", error);
        }
      }
      runInference();
    }
  }, [model, photoUri]);

  return (
    <View>
      <Text style={styles.container}>Classification Results</Text>
      {photoUri && <Image source={{ uri: photoUri }} style={styles.previewImage} />}
      {classification && (
        <Text style={styles.classificationText}>
          This item needs to go to the: {classification} bin
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  previewImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
    resizeMode: "contain",
  },
  classificationText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
