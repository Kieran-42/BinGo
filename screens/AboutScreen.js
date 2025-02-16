import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Developer Data
const developers = [
  {
    name: "Mihir Gajjar",
    role: "Fullstack Developer",
    description: "Currently a Junior student majoring in Finance at Santa Clara University.",
    image: require("../assets/MihirProfile.jpeg"),
  },
  {
    name: "Kaiwen Du",
    role: "Frontend Developer",
    description: "Currently a Freshman student majoring in Computer Science at Santa Clara University.",
    image: require("../assets/KaiwenProfile.jpg"),
  },
  {
    name: "Jemian Lam",
    role: "Frontend Developer",
    description: "Currently a Freshman student majoring in Computer Science at Santa Clara University.",
    image: require("../assets/JemianProfile.png"),
  },
  {
    name: "Stanley Mei",
    role: "AI Engineer",
    description: "Currently a Graduate student majoring in Computer Science at Santa Clara University.",
    image: require("../assets/StanleyProfile.jpg"),
  },
  {
    name: "Kieran Pazmino",
    role: "Backend Developer",
    description: "Currently a Junior student majoring in Computer Engineering with a strong passion for robotics and AI machine learning.",
    // Add image
  },
  {
    name: "Wesley Cordier",
    role: "Backend Developer",
    description: "Currently a Freshman student majoring in Computer Science at Santa Clara University.",
    image: require("../assets/WesleyProfile.jpeg"),
  },
];

export default function AboutScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={35} color="#3C6049" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>About</Text>

      {/* Content */}
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.contentText}>
          Welcome to BinGo! This app helps you classify waste items and determine the appropriate bin for disposal.
        </Text>
        <Text style={styles.contentText}>
          Our goal is to promote sustainable waste management and make recycling easy for everyone.
        </Text>
        <Text style={styles.contentText}>
          Simply take a picture of an item, and BinGo will classify it for you. Save your history and track your waste habits over time!
        </Text>

        {/* Meet the Developers Section */}
        <Text style={styles.sectionTitle}>Meet the Developers</Text>
        
        {developers.map((dev, index) => (
          <View key={index} style={styles.devCard}>
            <Image source={dev.image} style={styles.devImage} />
            <View style={styles.devInfo}>
              <Text style={styles.devName}>{dev.name}</Text>
              <Text style={styles.devRole}>{dev.role}</Text>
              <Text style={styles.devDescription}>{dev.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 30,
    fontWeight: "bold",
    color: "#3C6049",
    marginBottom: 15,
  },

  contentContainer: {
    width: "90%",
  },

  contentText: {
    fontSize: 18,
    color: "#3C6049",
    textAlign: "center",
    marginTop: 25,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3C6049",
    textAlign: "center",
    marginVertical: 20,
  },

  devCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  devImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },

  devInfo: {
    flex: 1,
  },

  devName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3C6049",
  },

  devRole: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3C6049",
    marginBottom: 5,
  },

  devDescription: {
    fontSize: 14,
    color: "#3C6049",
  },
});