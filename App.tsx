import React, { useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  Image,
  StyleSheet,
} from "react-native";

import HomeScreen from "./screens/HomeScreen";
import HistoryScreen from "./screens/HistoryScreen";
import StatsScreen from "./screens/StatsScreen";

const Stack = createNativeStackNavigator();

/* --- Pantalla fija con fondo morado y logo --- */
function SplashScreen({ navigation }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    navigation.navigate("Coche");
  };

  return (
    <View style={styles.splashContainer}>
      <Image
        source={require("./assets/icon.png")}
        style={styles.splashLogo}
        resizeMode="contain"
      />
      <Text style={styles.splashTitle}>🎺 Frente Jerez App 🎺</Text>
      <Text style={styles.splashSubtitle}>“Las Cigarreras”</Text>

      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={[styles.boton, { transform: [{ scale: scaleAnim }] }]}>
          <Text style={styles.botonTexto}>🚗 COCHE</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

/* --- Navegación principal --- */
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio" screenOptions={{ animation: "fade" }}>
        <Stack.Screen name="Inicio" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Coche" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Historial"
          component={HistoryScreen}
          options={{
            title: "Historial de Actos",
            headerStyle: { backgroundColor: "#800080" },
            headerTintColor: "#fff",
          }}
        />
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

/* --- Estilos --- */
const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: "#800080", // 💜 mismo color de fondo del logo
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  splashLogo: {
    width: 240,
    height: 240,
    marginBottom: 25,
  },
  splashTitle: {
    color: "#FFD700", // dorado
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  splashSubtitle: {
    color: "#fff",
    fontSize: 18,
    marginTop: 5,
    fontStyle: "italic",
    marginBottom: 40,
  },
  boton: {
    backgroundColor: "#FFD700", // dorado
    paddingVertical: 16,
    paddingHorizontal: 36,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  botonTexto: {
    color: "#800080",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
});
