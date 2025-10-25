import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import HistoryScreen from "./screens/HistoryScreen";
import StatsScreen from "./screens/StatsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        {/* Pantalla de inicio */}
        <Stack.Screen
          name="Inicio"
          component={InicioScreen}
          options={{ headerShown: false }}
        />

        {/* Módulo principal */}
        <Stack.Screen
          name="Coche"
          component={HomeScreen}
          options={{
            title: "🚗 Coche",
            headerStyle: { backgroundColor: "#5E1381" },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Stats"
          component={StatsScreen}
          options={{
            title: "📊 Estadísticas",
            headerStyle: { backgroundColor: "#5E1381" },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{
            title: "🕓 Historial",
            headerStyle: { backgroundColor: "#5E1381" },
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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
        onPress={() => navigation.navigate("Coche")}
      >
        <Text style={styles.buttonText}>🚗 COCHE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Fondo blanco
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 180,
    height: 180,
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#5E1381",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#5E1381",
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#5E1381", // 👈 Morado del logo
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
    color: "#FFFFFF", // 👈 Texto blanco
    fontSize: 18,
    fontWeight: "bold",
  },
});
