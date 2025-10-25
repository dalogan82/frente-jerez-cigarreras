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

export default function StatsScreen() {
  const [stats, setStats] = useState<any>({});
  const [showPwd, setShowPwd] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    const hist = await AsyncStorage.getItem("HISTORIAL");
    const datos = hist ? JSON.parse(hist) : [];
    const resumen: any = {};

    datos.forEach((r: any) => {
      if (!resumen[r.conductor]) resumen[r.conductor] = { Corto: 0, Largo: 0 };
      resumen[r.conductor][r.tipo]++;
    });
    setStats(resumen);
  }

  async function borrarTodo() {
    await AsyncStorage.removeItem("HISTORIAL");
    setStats({});
    Alert.alert("✅ Éxito", "Estadísticas eliminadas correctamente");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📊 Estadísticas</Text>

      {Object.keys(stats).length === 0 ? (
        <Text style={styles.empty}>No hay datos registrados</Text>
      ) : (
        Object.entries(stats).map(([nombre, val]: any) => (
          <View key={nombre} style={styles.box}>
            <Text style={styles.name}>{nombre}</Text>
            <Text style={styles.data}>
              Corto: {val.Corto} | Largo: {val.Largo} | Total:{" "}
              {val.Corto + val.Largo}
            </Text>
            <View style={styles.barContainer}>
              <View
                style={[styles.bar, { flex: val.Corto, backgroundColor: "#4B0082" }]}
              />
              <View
                style={[styles.bar, { flex: val.Largo, backgroundColor: "#FFD700" }]}
              />
            </View>
          </View>
        ))
      )}

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => setShowPwd(true)}
      >
        <Text style={styles.deleteTxt}>🧹 Eliminar estadísticas</Text>
      </TouchableOpacity>

      <PasswordModal
        visible={showPwd}
        onClose={() => setShowPwd(false)}
        onSuccess={() => {
          setShowPwd(false);
          borrarTodo();
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
  box: { marginBottom: 14 },
  name: { fontWeight: "bold", color: "#4B0082" },
  data: { color: "#666", marginBottom: 4 },
  barContainer: {
    flexDirection: "row",
    height: 14,
    borderRadius: 6,
    overflow: "hidden",
  },
  bar: {},
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
