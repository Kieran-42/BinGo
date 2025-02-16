import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function SummaryScreen({ route }) {
  const { photoUri } = route.params || {};
  const [classification, setClassification] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Classification Results</Text>

      {photoUri ? (
        <Image source={{ uri: photoUri }} style={styles.previewImage} />
      ) : (
        <Text style={styles.placeholderText}>No image available</Text>
      )}

      {classification && (
        <Text style={styles.classificationText}>
          This item needs to go to the: <Text style={styles.highlight}>{classification}</Text> bin
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#D3E8D2",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  previewImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
    resizeMode: "contain",
  },
  classificationText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#444",
  },
  highlight: {
    color: "#007AFF", // Blue highlight for classification text
    fontWeight: "bold",
  },
  placeholderText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#888",
    marginBottom: 20,
  },
});
