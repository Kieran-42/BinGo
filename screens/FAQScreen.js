// Import: Native React Module
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Fuction: FAQ Screen
export default function FAQScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={35} color="#3C6049" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>FAQs</Text>

      {/* FAQ List */}
      <ScrollView style={styles.faqContainer}>
        <View style={styles.faqItem}>
          <Text style={styles.question}>How does BinGo classify waste?</Text>
          <Text style={styles.answer}>
            BinGo uses AI to analyze images and determine the appropriate bin for each item.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.question}>Can I view my previous classifications?</Text>
          <Text style={styles.answer}>
            Yes! All saved classifications are stored in the History section.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.question}>Does the app require an internet connection?</Text>
          <Text style={styles.answer}>
            The core classification features may require an internet connection for AI processing.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.question}>How can I clear my history?</Text>
          <Text style={styles.answer}>
            Currently, history is stored locally. A "Clear History" button will be added in future updates.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

// Stylesheet: Objects
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#3C6049",
    marginBottom: 15,
  },

  faqContainer: {
    width: "90%",
  },

  faqItem: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  question: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3C6049",
  },

  answer: {
    fontSize: 16,
    color: "#3C6049",
    marginTop: 5,
  },
});
