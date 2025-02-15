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

	return(
		<View>
			<Text style={styles.container}>Results</Text>
			{photoUri && <Image source={{ uri: photoUri }} style={styles.previewImage} />}
			{classification && (<Text style={styles.classificationText}>Object Classification: {classification} Bin</Text>)}
		</View>
	)
};

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
