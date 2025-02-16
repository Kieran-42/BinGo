import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // or another icon set

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Top-left "hamburger" menu */}
      <TouchableOpacity style={styles.menuButton} onPress={() => { /* handle menu */ }}>
        <Ionicons name="menu" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* BinGo logo text */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoBin}>Bin</Text>
        <Text style={styles.logoG}>G</Text>
        <Image
          source={require('../assets/icon.png')}
          style={styles.logoO}
        />
      </View>

      {/* Identify (Camera) Button */}
      <TouchableOpacity 
        style={styles.identifyButton} 
        onPress={() => navigation.navigate("Camera")}
      >
        <Ionicons name="camera" size={50} color="#FFFFFF" />
      </TouchableOpacity>
      <Text style={styles.identifyLabel}>Identify</Text>

      {/* Bottom row of icons */}
      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.iconWrapper}>
          <Ionicons name="stats-chart" size={30} color="#3C6049" />
          <Text style={styles.iconText}>Statistics</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconWrapper}>
          <Ionicons name="albums" size={30} color="#3C6049" />
          <Text style={styles.iconText}>Card</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconWrapper}>
          <Ionicons name="time" size={30} color="#3C6049" />
          <Text style={styles.iconText}>History</Text>
        </TouchableOpacity>
      </View>

      {/* Diagonal background shape */}
      <View style={styles.diagonalShape} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3E8D2', // light green
    alignItems: 'center',
    position: 'relative',
  },
  menuButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#3C6049',
    padding: 10,
    borderRadius: 30,
    zIndex: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    marginTop: 100,
    alignItems: 'center',
  },
  logoBin: {
    color: "#BCBCBC",
		fontSize: 105,
		fontWeight: "bold",
		marginTop: 50,
		marginBottom: 67,
  },
  logoG: {
    color: "#3C6049",
		fontSize: 105,
		fontWeight: "bold",
		marginTop: 78,
		marginBottom: 86,
  },
  logoO: {
    width: 94,
		height: 94,
		marginTop: 71,
		marginBottom: 79,
  },
  identifyButton: {
    width: 100,
    height: 100,
    backgroundColor: '#8FB98F', // darker green
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    elevation: 5, // Shadow on Android
    shadowColor: '#000', // Shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  identifyLabel: {
    marginTop: 10,
    fontSize: 18,
    color: '#3C6049',
    fontWeight: '600',
  },
  bottomRow: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconWrapper: {
    alignItems: 'center',
  },
  iconText: {
    marginTop: 5,
    fontSize: 14,
    color: '#3C6049',
  },
  diagonalShape: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '60%',
    height: '45%',
    backgroundColor: '#AECBA0', // darker block
    transform: [{ rotate: '-15deg' }],
    zIndex: -1, // place behind other elements
  },
});
