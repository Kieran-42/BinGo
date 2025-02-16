import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#3C6049" />
      </TouchableOpacity>

      <Text style={styles.title}>Menu</Text>

      {/* About */}
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("About")}>
        <Text style={styles.menuText}>About</Text>
      </TouchableOpacity>

      {/* FAQs */}
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("FAQs")}>
        <Text style={styles.menuText}>FAQs</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D3E8D2",
    alignItems: "center",
    justifyContent: "center",
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

  menuItem: {
    backgroundColor: "#3C6049",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },

  menuText: {
    fontSize: 20,
    color: "#FFFFFF",
  },
});
