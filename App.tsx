import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import HistoryScreen from "./screens/HistoryScreen";
import StatsScreen from "./screens/StatsScreen";
import { COLORS } from "./constants/theme";

const Stack = createNativeStackNavigator();

function InicioScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/icon.png")}
        style={styles.icon}
        resizeMode="contain"
      />

      <Text style={styles.title}>🎺 Frente Jerez App 🎺</Text>
      <Text style={styles.subtitle}>“Las Cigarreras”</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>🚗 COCHE</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen
          name="Inicio"
          component={InicioScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Transporte",
            headerStyle: { backgroundColor: COLORS.background },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{
            title: "Historial",
            headerStyle: { backgroundColor: COLORS.background },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Stats"
          component={StatsScreen}
          options={{
            title: "Estadísticas",
            headerStyle: { backgroundColor: COLORS.background },
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // 💜 mismo tono del logo
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  icon: {
    width: 180,
    height: 180,
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.gold,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  button: {
    backgroundColor: COLORS.gold,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#5E1381",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
