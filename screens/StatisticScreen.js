import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function StatisticScreen({ navigation }) {
  const [plasticCount, setPlasticCount] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const count = await RequestStats("plastic");
      if (count !== null) {
        setPlasticCount(count);
      }
    };

    fetchStats();
  }, []);

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
        <Text style={styles.contentText}>
          {plasticCount !== null
            ? `You collected ${plasticCount} pieces of plastic.`
            : "Loading statistics..."}
        </Text>
      </View>
    </View>
  );
}

// Fetch classification count for a given material
const RequestStats = async (material) => {
  try {
    const response = await fetch(`http://bingo-production-38b8.up.railway.app/stats?category=${material}`, {
      method: "GET",
    });

    const result = await response.json();
    console.log("Classification Stats:", result);

    if (result.error) {
      Alert.alert("Error", result.error);
      return null; // Return null on error
    } else {
      return result[material]; // Extract and return the count
    }
  } catch (error) {
    console.error("Error fetching stats:", error);
    return null;
  }
};

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
    top: 50,
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
