import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import HomeScreen from "./screens/HomeScreen";
import TransportScreen from "./screens/TransportScreen";
import StatsScreen from "./screens/StatsScreen";
import HistoryScreen from "./screens/HistoryScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerStyle: { backgroundColor: "#4B0082" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="Inicio"
          component={HomeScreen}
          options={{ title: " " }}
        />
        <Stack.Screen
          name="Coche"
          component={TransportScreen}
          options={{ title: "COCHE" }}
        />
        <Stack.Screen
          name="Stats"
          component={StatsScreen}
          options={{ title: "Estadísticas" }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{ title: "Historial" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
