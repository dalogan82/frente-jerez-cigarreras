import React, { useRef, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

import HomeScreen from "./screens/HomeScreen";
import HistoryScreen from "./screens/HistoryScreen";
import StatsScreen from "./screens/StatsScreen";

const Stack = createNativeStackNavigator();

/* --- Pantalla de bienvenida (splash animado) --- */
function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }),
      ]),
      Animated.delay(2000),
    ]).start(() => {
      navigation.replace("Inicio"); // cambia automáticamente
    });
  }, []);

  return (
    <View style={styles.splashContainer}>
      <Animated.Image
        source={require("./assets/icon.png")}
        style={[
          styles.splashLogo,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
        resizeMode="contain"
      />
      <Animated.Text style={[styles.splashText, { opacity: fadeAnim }]}>
        Frente Jerez “Las Cigarreras”
      </Animated.Text>
    </View>
  );
}

/* --- Pantalla principal con el botón COCHE --- */
function StartScreen({ navigation }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const { width } = useWindowDimensions();
  const logoSize = width < 500 ? 220 : 260;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 50,
      bounciness: 6,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 6,
    }).start();
    navigation.navigate("Coche");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/icon.png")}
        style={[styles.icon, { width: logoSize, height: logoSize }]}
        resizeMode="contain"
      />

      <Text style={styles.title}>🎺 Frente Jerez App 🎺</Text>
      <Text style={styles.subtitle}>
        Bienvenido a la aplicación del Frente Jerez “Las Cigarreras”
      </Text>

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
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ animation: "fade" }}>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Inicio" component={StartScreen} options={{ headerShown: false }} />
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
    backgroundColor: "#800080",
    alignItems: "center",
    justifyContent: "center",
  },
  splashLogo: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },
  splashText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  icon: {
    marginBottom: 35,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 17,
    color: "#444",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 50,
  },
  boton: {
    backgroundColor: "#800080",
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
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
});
