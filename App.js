// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import the screens
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from "./screens/HomeScreen";
import CameraScreen from "./screens/CameraScreen";
import SummaryScreen from "./screens/SummaryScreen";

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
              options={{ title: "Welcome" }}
          />

          {/* Camera Screen */}
          <Stack.Screen
              name="Camera"
              component={CameraScreen}
              options={{ title: "Take a Photo" }}
          />
          
          {/* Summary Screen */}
          <Stack.Screen
              name="Summary"
              component={SummaryScreen}
              options={{ title: "Classification Result" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
