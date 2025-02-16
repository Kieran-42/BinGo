import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

// Import TensorFlow.js and its React Native integration

import * as FileSystem from "expo-file-system";
export default function SummaryScreen({ route }) {
  // this is the uri that we passed from the camera screen page
  const { photoUri } = route.params || {};
  // This is just randomly selected right now --> we will have to feed image into
  // model later to get this values
  const [classification, setClassification] = useState(null);
  // State variable to hold the loaded Keras model instance

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