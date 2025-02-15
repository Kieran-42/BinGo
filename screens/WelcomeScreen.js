import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulate some loading or startup work
    const timer = setTimeout(() => {
      // After 2 seconds, navigate to the Home screen
      navigation.replace('Home');
    }, 2000);

    // Clean up the timer to prevent memory leaks if the component unmounts
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to BinGo</Text>
      <Text style={styles.subText}>Giving Your Waste a Second Life.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1FAEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#3C6049',
  },
  subText: {
    fontSize: 15,
    fontWeight: 'semi-bold',
    color: '#3C6049',
    marginTop: 10,
  }
});

export default WelcomeScreen;
