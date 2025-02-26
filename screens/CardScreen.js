import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// List of waste types
const wasteTypes = ["battery", "compost", "glass", "metal", "paper", "plastic", "shoes", "trash"];

// Bingo column labels
const bingoLabels = ["B", "I", "N", "G", "O"];

// Map waste types to Ionicons
const wasteIcons = {
  battery: "battery-charging",
  compost: "leaf",
  glass: "wine",
  metal: "construct",
  paper: "document-text",
  plastic: "cube",
  shoes: "walk",
  trash: "trash-bin",
};

export default function CardScreen({ navigation }) {
  // Function to get a random waste type
  const getRandomWasteType = () => {
    return wasteTypes[Math.floor(Math.random() * wasteTypes.length)];
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={35} color="#3C6049" />
      </TouchableOpacity>

      {/* Bingo Header (B I N G O) */}
      <View style={styles.bingoHeader}>
        {bingoLabels.map((letter, index) => (
          <View key={index} style={styles.headerCell}>
            <Text style={styles.headerText}>{letter}</Text>
          </View>
        ))}
      </View>

      {/* Bingo Grid */}
      <View style={styles.bingoCard}>
        <View style={styles.cardGrid}>
          {Array.from({ length: 25 }).map((_, index) => {
            const wasteType = getRandomWasteType();
            return (
              <View key={index} style={styles.cardCell}>
                <Ionicons name={wasteIcons[wasteType]} size={30} color="#FFFFFF" />
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D3E8D2",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 30 : 100, // Adjust for status bar
  },

  backButton: {
    position: "absolute",
    top: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 50, // Lower the back button
    left: 20,
    zIndex: 10,
  },

  bingoHeader: {
    flexDirection: "row",
    justifyContent: "center",
    width: "90%",
    marginBottom: 10,
  },

  headerCell: {
    width: "20%", // 5 columns
    alignItems: "center",
  },

  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#3C6049",
  },

  bingoCard: {
    width: "90%", // Keep consistent with the header width
    aspectRatio: 1, // Ensures it remains a square grid
    alignItems: "center",
    justifyContent: "center",
  },

  cardGrid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  cardCell: {
    width: "18%", // 5 columns evenly spaced
    aspectRatio: 1, // Keeps cells square
    backgroundColor: "#8FB98F",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    margin: 3, // Slightly increase margin for spacing
  },
});
