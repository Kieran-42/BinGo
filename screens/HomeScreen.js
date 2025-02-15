// Home screen --> inside screens/HomeScreen.js

import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import {Camera} from "expo-camera";

// Home Screen page
export default function HomeScreen({ navigation }) {
	return(
		<View style={styles.container}>
			<Text>Welcome to BinGo</Text>
			<Button title={"Take a Photo of Your Trash"} onPress={() => navigation.navigate("Camera")}/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	text: {
		fontSize: 20,
		marginBottom: 20
	}
})

