// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import the screens
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from "./screens/HomeScreen";
import CameraScreen from "./screens/CameraScreen";
import SummaryScreen from "./screens/SummaryScreen";
import StatisticScreen from "./screens/StatisticScreen";
import CardScreen from "./screens/CardScreen";
import HistoryScreen from "./screens/HistoryScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          {/* Welcome Screen */}
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }} 
          />

          {/* Home Screen */}
          <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
          />

          {/* Camera Screen */}
          <Stack.Screen
              name="Camera"
              component={CameraScreen}
              options={{ title: "Photo Capture" }}
          />

          {/* Statistics Screen */}
          <Stack.Screen
              name="Statistic"
              component={StatisticScreen}
              options={{ title: "Statistics" }}
          />

          {/* Cards Screen */}
          <Stack.Screen
              name="Card"
              component={CardScreen}
              options={{ title: "Cards" }}
          />

          {/* History Screen */}
          <Stack.Screen
              name="History"
              component={HistoryScreen}
              options={{ title: "History" }}
          />
          
          {/* Summary Screen */}
          <Stack.Screen
              name="Summary"
              component={SummaryScreen}
              options={{ title: "Result" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}