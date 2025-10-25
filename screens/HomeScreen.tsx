import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/icon.png")}
        style={styles.logo}
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4B0082",
  },
  subtitle: {
    fontSize: 16,
    color: "#4B0082",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#4B0082",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
