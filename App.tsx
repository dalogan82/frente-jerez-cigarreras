import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

// Tus pantallas reales
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
      >
        <Text style={styles.botonTexto}>🚗 Entrar al módulo TRANSPORTE</Text>
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
            title: "Transporte",
            headerStyle: { backgroundColor: "#800080" },
            headerTintColor: "#fff",
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
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
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
    borderRadius: 10,
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
