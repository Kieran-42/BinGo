// Import: Native React Modules
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Function: MenuScreen
export default function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
        {/* Diagonal background shape */}
        <View style={styles.diagonalShape} />

        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="#3C6049" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Menu</Text>

        {/* About */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("About")}>
            <Ionicons name="information-circle-outline" size={30} color="#ffffff" />
            <Text style={styles.menuText}>About</Text>
        </TouchableOpacity>

        {/* FAQs */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("FAQs")}>
            <Ionicons name="help-circle-outline" size={30} color="#ffffff" />
            <Text style={styles.menuText}>FAQs</Text>
        </TouchableOpacity>
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
        justifyContent: "center",
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
        marginBottom: 30,
    },

    menuItem: {
        flexDirection: "row",
        backgroundColor: "#3C6049",
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },

    menuText: {
        fontSize: 20,
        color: "#FFFFFF",
    },
});