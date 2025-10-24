import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Button, Image, StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
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
          title="Entrar al Módulo de Noticias"
          onPress={() => navigation.navigate("Noticias")}
          color="#800080"
        />
      </View>
    </View>
  );
}

function NoticiasScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📰 Noticias</Text>
      <Text style={styles.subtitle}>
        Aquí aparecerán las noticias del Frente Jerez.
      </Text>

      <View style={{ marginTop: 30 }}>
        <Button
          title="Volver al Inicio"
          onPress={() => navigation.navigate("Inicio")}
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
        <Stack.Screen
          name="Inicio"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Noticias"
          component={NoticiasScreen}
          options={{
            title: "Noticias",
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
