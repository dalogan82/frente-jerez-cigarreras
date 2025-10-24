import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Asset } from "expo-asset";
import { StatusBar } from "expo-status-bar";

// 👇 Importa tus pantallas
// import HomeScreen from "./screens/HomeScreen";
// import AnotherScreen from "./screens/AnotherScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  // ✅ Precarga las imágenes para que se incluyan en el bundle web (Render)
  useEffect(() => {
    const images = [
      require("./assets/icon.png"),
      require("./assets/adaptive-icon.png"),
      require("./assets/splash.png"),
    ];
    images.forEach((img) => Asset.fromModule(img).downloadAsync());
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="dark" />

      {/* 👇 Ejemplo temporal hasta tener tus pantallas */}
      <View style={styles.container}>
        <Image
          source={require("./assets/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Frente Jerez App</Text>
        <Text style={styles.subtitle}>
          Bienvenido. App optimizada para Web, iOS y Android.
        </Text>
      </View>

      {/* 🔹 Estructura de navegación (descomenta si usas pantallas) */}
      {/*
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Another" component={AnotherScreen} />
      </Stack.Navigator>
      */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 8,
  },
});
