import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const COLORS = {
  purple: "#4B0082",
  gold: "#FFD700",
  green: "#228B22",
  muted: "#666",
};

const CONDUCTORES = ["Alberto", "Daniel", "Manuel", "Miguel"] as const;
type Conductor = (typeof CONDUCTORES)[number];
type Tipo = "Corto" | "Largo";

const STORAGE_TURNOS = "ULTIMOS_CONDUCTORES"; // { ultimoCorto, ultimoLargo }
const STORAGE_HISTORIAL = "HISTORIAL";

export default function TransportScreen() {
  const navigation = useNavigation();
  const [tipo, setTipo] = useState<Tipo>("Corto");
  const [disponibles, setDisponibles] = useState<Conductor[]>([...CONDUCTORES]);
  const [hoyConduce, setHoyConduce] = useState<Conductor | null>(null);
  const [siguiente, setSiguiente] = useState<Conductor | null>(null);

  useEffect(() => {
    recalc();
  }, [tipo, disponibles]);

  async function recalc() {
    const saved = await AsyncStorage.getItem(STORAGE_TURNOS);
    const turnos =
      saved ? JSON.parse(saved) : { ultimoCorto: null, ultimoLargo: null };

    const ultimo: Conductor | null =
      tipo === "Corto" ? turnos.ultimoCorto : turnos.ultimoLargo;

    let startIdx = ultimo ? CONDUCTORES.indexOf(ultimo) : -1;

    // 🚫 Si no hay nadie disponible, mostrar sin asignar
    if (disponibles.length === 0) {
      setHoyConduce(null);
      setSiguiente(null);
      return;
    }

    // Hoy
    let i = (startIdx + 1) % CONDUCTORES.length;
    let vueltas = 0;
    while (!disponibles.includes(CONDUCTORES[i]) && vueltas < CONDUCTORES.length) {
      i = (i + 1) % CONDUCTORES.length;
      vueltas++;
    }
    const actual = CONDUCTORES[i] as Conductor;

    // Siguiente
    let j = (i + 1) % CONDUCTORES.length;
    vueltas = 0;
    while (!disponibles.includes(CONDUCTORES[j]) && vueltas < CONDUCTORES.length) {
      j = (j + 1) % CONDUCTORES.length;
      vueltas++;
    }
    const prox = CONDUCTORES[j] as Conductor;

    setHoyConduce(actual);
    setSiguiente(prox);
  }

  function toggleDisponibilidad(nombre: Conductor) {
    setDisponibles((prev) =>
      prev.includes(nombre)
        ? (prev.filter((x) => x !== nombre) as Conductor[])
        : ([...prev, nombre] as Conductor[])
    );
  }

  async function registrarDesplazamiento() {
    try {
      await recalc();
      if (!hoyConduce) {
        Alert.alert("Sin conductor disponible", "Activa al menos un conductor.");
        return;
      }

      const hoy = new Date().toISOString().split("T")[0];
      const rawHist = await AsyncStorage.getItem(STORAGE_HISTORIAL);
      const hist = rawHist ? JSON.parse(rawHist) : [];
      hist.push({ fecha: hoy, tipo, conductor: hoyConduce });
      await AsyncStorage.setItem(STORAGE_HISTORIAL, JSON.stringify(hist));

      const rawTurnos = await AsyncStorage.getItem(STORAGE_TURNOS);
      const turnos = rawTurnos
        ? JSON.parse(rawTurnos)
        : { ultimoCorto: null, ultimoLargo: null };

      if (tipo === "Corto") turnos.ultimoCorto = hoyConduce;
      else turnos.ultimoLargo = hoyConduce;

      await AsyncStorage.setItem(STORAGE_TURNOS, JSON.stringify(turnos));

      await recalc();
      Alert.alert("✅ Registrado", `Conduce: ${hoyConduce} · Tipo: ${tipo}`);
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "No se pudo registrar el desplazamiento.");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🚗 COCHE</Text>

      <View style={styles.box}>
        <Text style={styles.subtitle}>Tipo de desplazamiento:</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.option, tipo === "Corto" && styles.optionActive]}
            onPress={() => setTipo("Corto")}
          >
            <Text style={styles.optionText}>Corto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, tipo === "Largo" && styles.optionActive]}
            onPress={() => setTipo("Largo")}
          >
            <Text style={styles.optionText}>Largo</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.box}>
        <Text style={styles.subtitle}>Conductores disponibles:</Text>
        {CONDUCTORES.map((n) => {
          const on = disponibles.includes(n);
          return (
            <TouchableOpacity
              key={n}
              onPress={() => toggleDisponibilidad(n)}
              style={[styles.driver, { backgroundColor: on ? COLORS.purple : "#eee" }]}
            >
              <Text style={{ color: on ? "#fff" : COLORS.muted, fontWeight: "700" }}>
                {n} {on ? "✅" : "❌"}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.info}>
        <Text>
          Hoy conduce:{" "}
          <Text style={{ color: COLORS.green, fontWeight: "800" }}>
            {hoyConduce ?? "-"}
          </Text>
        </Text>
        <Text>
          Siguiente:{" "}
          <Text style={{ color: COLORS.purple, fontWeight: "800" }}>
            {siguiente ?? "-"}
          </Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.btnMain} onPress={registrarDesplazamiento}>
        <Text style={styles.btnMainText}>Registrar desplazamiento</Text>
      </TouchableOpacity>

      <View style={styles.navBtns}>
        <TouchableOpacity
          style={[styles.btnNav, { backgroundColor: COLORS.purple }]}
          onPress={() => navigation.navigate("Stats" as never)}
        >
          <Text style={styles.btnNavText}>📊 Ver estadísticas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnNav, { backgroundColor: COLORS.green }]}
          onPress={() => navigation.navigate("History" as never)}
        >
          <Text style={styles.btnNavText}>🕓 Ver historial</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.purple,
    marginBottom: 16,
  },
  subtitle: { fontWeight: "bold", color: COLORS.purple, marginBottom: 8 },
  box: { marginBottom: 16 },
  row: { flexDirection: "row", gap: 8 },
  option: {
    flex: 1,
    backgroundColor: "#eee",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  optionActive: { backgroundColor: COLORS.purple },
  optionText: { color: "#fff", fontWeight: "bold" },
  driver: { borderRadius: 8, padding: 12, alignItems: "center", marginBottom: 6 },
  info: {
    alignItems: "center",
    marginBottom: 16,
    gap: 4,
    backgroundColor: "#F5EFFF",
    padding: 10,
    borderRadius: 10,
  },
  btnMain: {
    backgroundColor: COLORS.purple,
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
  },
  btnMainText: { color: "#fff", fontWeight: "bold" },
  navBtns: { marginTop: 20, alignItems: "center", gap: 12 },
  btnNav: {
    borderRadius: 8,
    padding: 12,
    width: "80%",
    alignItems: "center",
  },
  btnNavText: { color: "#fff", fontWeight: "bold" },
});
