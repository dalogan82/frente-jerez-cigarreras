import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PasswordModal from "../components/PasswordModal";

export default function HistoryScreen() {
  const [historial, setHistorial] = useState<any[]>([]);
  const [showPwd, setShowPwd] = useState(false);

  useEffect(() => {
    cargarHistorial();
  }, []);

  async function cargarHistorial() {
    const data = await AsyncStorage.getItem("HISTORIAL");
    setHistorial(data ? JSON.parse(data) : []);
  }

  async function borrarHistorial() {
    await AsyncStorage.removeItem("HISTORIAL");
    setHistorial([]);
    Alert.alert("✅ Éxito", "Historial eliminado correctamente");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🕓 Historial de desplazamientos</Text>

      {historial.length === 0 ? (
        <Text style={styles.empty}>No hay registros</Text>
      ) : (
        historial.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.name}>{item.conductor}</Text>
            <Text style={styles.type}>Desplazamiento {item.tipo}</Text>
            <Text style={styles.date}>{item.fecha}</Text>
          </View>
        ))
      )}

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => setShowPwd(true)}
      >
        <Text style={styles.deleteTxt}>🧹 Eliminar historial</Text>
      </TouchableOpacity>

      <PasswordModal
        visible={showPwd}
        onClose={() => setShowPwd(false)}
        onSuccess={() => {
          setShowPwd(false);
          borrarHistorial();
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4B0082",
    textAlign: "center",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#F5EFFF",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  name: { fontWeight: "bold", color: "#4B0082" },
  type: { color: "#666" },
  date: { color: "#999", textAlign: "right" },
  deleteBtn: {
    marginTop: 20,
    backgroundColor: "#4B0082",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
  },
  deleteTxt: { color: "#fff", fontWeight: "bold" },
  empty: { textAlign: "center", color: "#666", marginTop: 20 },
});
