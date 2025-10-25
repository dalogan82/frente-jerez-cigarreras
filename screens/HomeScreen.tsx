import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Animated,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const MORADO = "#5E1381";
const DORADO = "#FFD700";
const BLANCO = "#FFFFFF";
const TARJETA = "rgba(255,255,255,0.12)";
const RADIUS = 14;

const CONDUCTORES = ["Alberto", "Daniel", "Manuel", "Miguel"];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [tipoDesplazamiento, setTipoDesplazamiento] = useState<"Corto" | "Largo">("Corto");
  const [disponibles, setDisponibles] = useState<string[]>([...CONDUCTORES]);
  const [hoyConduce, setHoyConduce] = useState<string | null>(null);
  const [siguiente, setSiguiente] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    actualizarTurnos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipoDesplazamiento, disponibles]);

  function avisar(texto: string) {
    setMensaje(texto);
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.delay(1800),
      Animated.timing(fadeAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
    ]).start(() => setMensaje(null));
  }

  function toggleDisponibilidad(nombre: string) {
    setDisponibles((prev) =>
      prev.includes(nombre) ? prev.filter((n) => n !== nombre) : [...prev, nombre]
    );
  }

  async function actualizarTurnos() {
    const key = "ULTIMOS_CONDUCTORES";
    const saved = await AsyncStorage.getItem(key);
    const prev = saved ? JSON.parse(saved) : { ultimoCorto: null, ultimoLargo: null };

    const ultimo = tipoDesplazamiento === "Corto" ? prev.ultimoCorto : prev.ultimoLargo;
    let idx = ultimo ? CONDUCTORES.indexOf(ultimo) : -1;

    // siguiente disponible
    let intentos = 0;
    let i = (idx + 1) % CONDUCTORES.length;
    while (!disponibles.includes(CONDUCTORES[i]) && intentos < CONDUCTORES.length) {
      i = (i + 1) % CONDUCTORES.length;
      intentos++;
    }
    const actual = CONDUCTORES[i];

    // siguiente después del actual
    let intentos2 = 0;
    let j = (i + 1) % CONDUCTORES.length;
    while (!disponibles.includes(CONDUCTORES[j]) && intentos2 < CONDUCTORES.length) {
      j = (j + 1) % CONDUCTORES.length;
      intentos2++;
    }
    const prox = CONDUCTORES[j];

    setHoyConduce(actual);
    setSiguiente(prox);
  }

  async function registrarActo() {
    try {
      const keyTurnos = "ULTIMOS_CONDUCTORES";
      const keyHist = "HISTORIAL";

      // Cargar último por tipo
      const savedTurnos = await AsyncStorage.getItem(keyTurnos);
      const turnos = savedTurnos
        ? JSON.parse(savedTurnos)
        : { ultimoCorto: null, ultimoLargo: null };

      const ultimo = tipoDesplazamiento === "Corto" ? turnos.ultimoCorto : turnos.ultimoLargo;
      let idx = ultimo ? CONDUCTORES.indexOf(ultimo) : -1;

      // calcular siguiente disponible
      let intentos = 0;
      let i = (idx + 1) % CONDUCTORES.length;
      while (!disponibles.includes(CONDUCTORES[i]) && intentos < CONDUCTORES.length) {
        i = (i + 1) % CONDUCTORES.length;
        intentos++;
      }
      const nuevoConductor = CONDUCTORES[i];

      // guardar último por tipo
      const actualizadoTurnos = {
        ...turnos,
        [tipoDesplazamiento === "Corto" ? "ultimoCorto" : "ultimoLargo"]: nuevoConductor,
      };
      await AsyncStorage.setItem(keyTurnos, JSON.stringify(actualizadoTurnos));

      // guardar en historial
      const hoy = new Date().toISOString().split("T")[0];
      const savedHist = await AsyncStorage.getItem(keyHist);
      const parsedHist = savedHist ? JSON.parse(savedHist) : [];
      const registro = { fecha: hoy, tipo: tipoDesplazamiento, conductor: nuevoConductor };
      await AsyncStorage.setItem(keyHist, JSON.stringify([...parsedHist, registro]));

      avisar(`✅ Conductor asignado: ${nuevoConductor}`);
      actualizarTurnos();
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "No se pudo registrar el acto.");
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: MORADO }} contentContainerStyle={{ padding: 18 }}>
      {/* aviso flotante */}
      {mensaje && (
        <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
          <Text style={{ color: "#000", fontWeight: "bold", textAlign: "center" }}>{mensaje}</Text>
        </Animated.View>
      )}

      {/* título */}
      <Text style={styles.titulo}>🚗 Módulo Coche</Text>

      {/* selector corto/largo */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tipo de desplazamiento</Text>
        <View style={styles.segment}>
          {(["Corto", "Largo"] as const).map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setTipoDesplazamiento(t)}
              style={[
                styles.segmentBtn,
                tipoDesplazamiento === t ? styles.segmentBtnActive : undefined,
              ]}
            >
              <Text
                style={[
                  styles.segmentText,
                  tipoDesplazamiento === t ? styles.segmentTextActive : undefined,
                ]}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* disponibilidad */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Conductores disponibles</Text>
        <View style={{ rowGap: 8 }}>
          {CONDUCTORES.map((n) => {
            const activo = disponibles.includes(n);
            return (
              <TouchableOpacity
                key={n}
                onPress={() => toggleDisponibilidad(n)}
                style={[
                  styles.dispBtn,
                  { backgroundColor: activo ? DORADO : "rgba(255,255,255,0.2)" },
                ]}
              >
                <Text style={{ fontWeight: "700", color: activo ? MORADO : BLANCO }}>
                  {n} {activo ? "✅" : "❌"}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* hoy y siguiente */}
      <View style={[styles.card, { alignItems: "center", rowGap: 8 }]}>
        <Text style={{ color: BLANCO, fontSize: 16 }}>
          Hoy conduce: <Text style={{ color: DORADO, fontWeight: "bold" }}>{hoyConduce ?? "-"}</Text>
        </Text>
        <Text style={{ color: BLANCO, fontSize: 15 }}>
          Siguiente: <Text style={{ color: DORADO }}>{siguiente ?? "-"}</Text>
        </Text>
      </View>

      {/* acciones */}
      <TouchableOpacity style={styles.cta} onPress={registrarActo}>
        <Text style={styles.ctaText}>Registrar acto</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 20, alignItems: "center", gap: 12 }}>
        <TouchableOpacity style={styles.secundario} onPress={() => navigation.navigate("Stats" as never)}>
          <Text style={styles.secundarioText}>📊 Ver estadísticas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secundario} onPress={() => navigation.navigate("History" as never)}>
          <Text style={styles.secundarioText}>🕓 Ver historial</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titulo: {
    color: DORADO,
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 14,
  },
  card: {
    backgroundColor: TARJETA,
    borderRadius: RADIUS,
    padding: 14,
    marginBottom: 14,
  },
  cardTitle: { color: BLANCO, fontSize: 16, marginBottom: 10, fontWeight: "600" },

  segment: { flexDirection: "row", gap: 10 },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  segmentBtnActive: { backgroundColor: DORADO },
  segmentText: { textAlign: "center", color: BLANCO, fontWeight: "700" },
  segmentTextActive: { color: MORADO },

  dispBtn: {
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  cta: {
    alignSelf: "center",
    backgroundColor: DORADO,
    paddingVertical: 14,
    paddingHorizontal: 26,
    borderRadius: 999,
    minWidth: 220,
  },
  ctaText: { textAlign: "center", color: MORADO, fontWeight: "800", fontSize: 16 },

  secundario: {
    alignSelf: "center",
    backgroundColor: BLANCO,
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 999,
    minWidth: 240,
  },
  secundarioText: { textAlign: "center", color: MORADO, fontWeight: "800" },

  toast: {
    position: "absolute",
    top: 20,
    left: 16,
    right: 16,
    backgroundColor: DORADO,
    borderRadius: 10,
    padding: 10,
    zIndex: 10,
  },
});
