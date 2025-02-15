import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function SummaryScreen({ route }) {
	// this is the uri that we passed from the camera screen page
	const { photoUri } = route.params || {};

	// This is just randomly selected right now --> we will have to feed image into
	// model later to get this values
	const [classification, setClassification] = useState(null);

	useEffect(() => {
		const categories = ["Recycle", "Landfill", "Compost", "Hazardous Waste"];
		const randomeCategory = categories[Math.floor(Math.random()) * categories.length];

		// we will set the classifcation after doing some 'make believe magic' computation
		// once our model is fully ready we need to set classifaction based on model output

		setClassification(randomeCategory);
	}, []);

	return(
		<View>
			<Text style={styles.container}>Classification Results</Text>
			{photoUri && <Image source={{ uri: photoUri }} style={styles.previewImage} />}
			{classification && (<Text style={styles.classificationText}>This item needs to go to the: {classification} bin</Text>)}
		</View>
	)
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		padding: 20,
		marginTop: 20
	},
	title: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 20
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
		textAlign: "center"
	}
});