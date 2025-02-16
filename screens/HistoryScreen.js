// Import: Native React Modules
import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Function: History Screen
export default function HistoryScreen({ route, navigation }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (route.params?.newEntry) {
      setHistory((prevHistory) => [route.params.newEntry, ...prevHistory]); // Add new entry at the top
    }
  }, [route.params?.newEntry]);

  return (
    <View style={styles.container}>
      {/* Diagonal background shape */}
      <View style={styles.diagonalShape} />
      
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={35} color="#3C6049" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>History</Text>

      {/* History List */}
      <ScrollView style={styles.historyList}>
        {history.length === 0 ? (
          <Text style={styles.noHistoryText}>No history saved yet.</Text>
        ) : (
          history.map((item, index) => (
            <View key={index} style={styles.historyItem}>
              {item.photoUri && <Image source={{ uri: item.photoUri }} style={styles.historyImage} />}
              <Text style={styles.historyText}>Waste Type: {item.classification}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

// Stylesheet: Objects
const styles = StyleSheet.create({
  diagonalShape: {
    width: 0,
    height: 0,
    borderLeftWidth: 300,
    borderBottomWidth: 600,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#83AE96",
    position: "absolute",
    marginLeft: -50,
    top: 275,
    left: 200,
    transform: [{ rotate: "0deg" }],
  },

  container: {
    flex: 1,
    backgroundColor: "#D3E8D2",
    alignItems: "center",
    paddingTop: 80,
  },

  backButton: {
    position: "absolute",
    top: 80,
    left: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3C6049",
    marginBottom: 20,
  },

  historyList: {
    width: "90%",
    flex: 1,
  },

  noHistoryText: {
    fontSize: 18,
    color: "#3C6049",
    textAlign: "center",
    marginTop: 50,
  },

  historyItem: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  historyImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },

  historyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3C6049",
  },
});
