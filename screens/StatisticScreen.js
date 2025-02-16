import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function StatisticScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#3C6049" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Statistics</Text>

      {/* Placeholder for Statistics Data */}
      <View style={styles.contentBox}>
        <Text style={styles.contentText}>Statistics data will be displayed here.</Text>
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

  backButton: {
    position: "absolute",
    top: 80,
    left: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3C6049",
    marginBottom: 30,
  },

  contentBox: {
    backgroundColor: "#FFFFFF",
    width: "90%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  contentText: {
    fontSize: 18,
    color: "#3C6049",
    textAlign: "center",
  },
});
