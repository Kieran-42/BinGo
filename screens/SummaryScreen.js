import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons

export default function SummaryScreen({ route }) {
  const navigation = useNavigation(); // Navigation hook

  // This is the uri that we passed from the camera screen page
  const { photoUri } = route.params || {};

  // Placeholder classification (replace this later with actual model output)
  const [classification, setClassification] = useState("General  Waste");

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Waste Type: {classification}</Text>

      {/* Image Preview */}
      {photoUri && <Image source={{ uri: photoUri }} style={styles.previewImage} />}

      {/* Home Button at Bottom */}
      <View style={styles.homeButtonBackground}>
        <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate("Home")}>
          <Ionicons name="home" size={40} color="#ffffff" />
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D3E8D2",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  homeButton: {
    width: 55,
		height: 55,
    marginTop: 15,
    marginLeft: 9,
    alignItems: "center",
  },

  homeButtonBackground: {
    width: 75,
		height: 75,
		backgroundColor: "#3C6049",
		borderColor: "#3C6049",
		marginTop: 60,
		marginBottom: 30,
		marginHorizontal: 159,
		borderWidth: 1,
    borderRadius: 20,
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#3C6049",
    top: 10,
    marginTop:-150,
    marginBottom: 40,
    textAlign: "center",
  },

  previewImage: {
    width: 300,
    height: 300,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
  },

  classificationText: {
    fontSize: 25,
    fontWeight: "600",
    color: "#3C6049",
    textAlign: "center",
    marginTop: 50,
  },
});
