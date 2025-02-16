import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function SummaryScreen({ route }) {
  // this is the uri that we passed from the camera screen page
  const { photoUri } = route.params || {};

  // This is just randomly selected right now --> we will have to feed image into
  // model later to get this values
  const [classification, setClassification] = useState(null);

  // State variable to hold the loaded Keras model instance
  const [model, setModel] = useState(null);

	return(
		<View>
			<Text style={styles.container} />
			{photoUri && <Image source={{ uri: photoUri }} style={styles.previewImage} />}
			{classification && (<Text style={styles.classificationText}>Object Classification: {classification} Bin</Text>)}
		</View>
	)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 100,
    backgroundColor: "#D3E8D2",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  previewImage: {
    width: 300,
    height: 300,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    alignSelf: 'center',
  },

  
  classificationText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
