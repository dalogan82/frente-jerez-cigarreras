import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

// Importa tus pantallas reales
import HomeScreen from "./screens/HomeScreen";
import HistoryScreen from "./screens/HistoryScreen";
import StatsScreen from "./screens/StatsScreen";

const Stack = createNativeStackNavigator();

function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/icon.png")}
        style={styles.icon}
        resizeMode="contain"
      />

      <Text style={styles.title}>🎺 Frente Jerez App 🎺</Text>
      <Text style={styles.subtitle}>
        Bienvenido a la aplicación del Frente Jerez “Las Cigarreras”
      </Text>

      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate("Transporte")}
        activeOpacity={0.8}
      >
        <Text style={styles.botonTexto}>🚗 TRANSPORTE</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        {/* Pantalla de bienvenida */}
        <Stack.Screen
          name="Inicio"
          component={StartScreen}
          options={{ headerShown: false }}
        />

        {/* Módulo TRANSPORTE */}
        <Stack.Screen
          name="Transporte"
          component={HomeScreen}
          options={{
            headerShown: false, // 🔥 sin barra superior
          }}
        />

        {/* Historial */}
        <Stack.Screen
          name="Historial"
          component={HistoryScreen}
          options={{
            title: "Historial de Actos",
            headerStyle: { backgroundColor: "#800080" },
            headerTintColor: "#fff",
          }}
        />

        {/* Estadísticas */}
        <Stack.Screen
          name="Estadísticas"
          component={StatsScreen}
          options={{
            title: "Estadísticas",
            headerStyle: { backgroundColor: "#800080" },
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  icon: {
    width: 130,
    height: 130,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  boton: {
    backgroundColor: "#800080",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Android
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
