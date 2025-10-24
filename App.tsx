import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Button, Image, StyleSheet } from "react-native";

// 👇 Importa tus pantallas reales
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

      <View style={{ marginTop: 30 }}>
        <Button
          title="Entrar al módulo COCHE"
          // 👇 Aquí decides a qué pantalla va
          onPress={() => navigation.navigate("Stats")}
          color="#800080"
        />
      </View>
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

        {/* Tus pantallas reales */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Inicio" }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{ title: "Historial" }}
        />
        <Stack.Screen
          name="Stats"
          component={StatsScreen}
          options={{
            title: "Módulo Coche",
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
  },
});
