import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Diagonal background shape */}
      <View style={styles.diagonalShape} />

      {/* Top-left "hamburger" menu */}
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate("Menu")}>
        <Ionicons name="menu" size={40} color="#FFFFFF" />
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
      <TouchableOpacity style={styles.identifyButton} onPress={() => navigation.navigate("Camera")}>
        <Ionicons style={styles.identifyIcon} name="camera" size={100} color="#FFFFFF" />
      </TouchableOpacity>
      <Text style={styles.identifyLabel}>Identify</Text>

      {/* Bottom row of icons */}
      <View style={styles.bottomRow}>
        {/* Statistics */}
        <View style={styles.iconWrapper}>
          <TouchableOpacity style={styles.shapeButton} onPress={() => navigation.navigate("Statistic")}>
            <Ionicons name="stats-chart" size={40} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.iconLabel}>Statistics</Text>
        </View>

        {/* Cards */}
        <View style={styles.iconWrapper}>
          <TouchableOpacity style={styles.shapeButton} onPress={() => navigation.navigate("Card")}>
            <Ionicons name="albums" size={40} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.iconLabel}>Cards</Text>
        </View>

        {/* History */}
        <View style={styles.iconWrapper}>
          <TouchableOpacity style={styles.shapeButton} onPress={() => navigation.navigate("History")}>
            <Ionicons name="time" size={40} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.iconLabel}>History</Text>
        </View>
      </View>
    </View>
  );
}

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
    backgroundColor: '#D3E8D2',
    alignItems: 'center',
    position: 'relative',
  },

  menuButton: {
    position: 'absolute',
    top: 75,
    left: 30,
    backgroundColor: '#3C6049',
    padding: 10,
    borderRadius: 20,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },

  logoG: {
    color: "#3C6049",
		fontSize: 110,
		fontWeight: "bold",
		marginTop: 78,
    marginLeft: 5,
		marginBottom: 86,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },

  logoO: {
    width: 110,
		height: 110,
		marginTop: 71,
    marginLeft: -5,
		marginBottom: 79,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },

  identifyButton: {
    width: 155,
    height: 155,
    bottom: 5,
    backgroundColor: '#8FB98F',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  identifyIcon: {
    width: 100,
    height: 100,
  },

  identifyLabel: {
    color: "#515151",
		fontSize: 20,
		fontWeight: "bold",
		marginTop: 10,
		marginBottom: 40,
		marginLeft: 10,
		marginRight: 7,
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },

  iconWrapper: {
    alignItems: 'center',
  },

  iconText: {
    marginTop: 5,
    fontSize: 14,
    color: '#3C6049',
  },

  shapeButton: {
    width: 70,
    height: 70,
    backgroundColor: '#3C6049',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },

  iconLabel: {
    color: "#515151",
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 8,
  },
});
