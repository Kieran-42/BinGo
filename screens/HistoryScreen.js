import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, AsyncStorage } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HistoryScreen({ route, navigation }) {
  const [history, setHistory] = useState([]);

  // Load saved history from AsyncStorage when the screen loads
  useEffect(() => {
    loadHistory();
  }, []);

  // Save new entries when route params change
  useEffect(() => {
    if (route.params?.newEntry) {
      const updatedHistory = [route.params.newEntry, ...history];
      setHistory(updatedHistory);
      saveHistory(updatedHistory); // Persist to storage
    }
  }, [route.params?.newEntry]);

  // Function to load history from AsyncStorage
  const loadHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem("wasteHistory");
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.log("Failed to load history:", error);
    }
  };

  // Function to save history to AsyncStorage
  const saveHistory = async (data) => {
    try {
      await AsyncStorage.setItem("wasteHistory", JSON.stringify(data));
    } catch (error) {
      console.log("Failed to save history:", error);
    }
  };

  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D3E8D2",
    alignItems: "center",
    paddingTop: 80, // Space for status bar
  },

  backButton: {
    position: "absolute",
    top: 100,
    left: 20,
  },

  title: {
    top: 20,
    fontSize: 30,
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
