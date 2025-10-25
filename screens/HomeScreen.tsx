import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { COLORS, CARD, RADIUS } from '../constants/theme';

const CONDUCTORES = ['Alberto', 'Daniel', 'Manuel', 'Miguel'];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [tipoDesplazamiento, setTipoDesplazamiento] = useState<'Corto' | 'Largo'>('Corto');
  const [disponibles, setDisponibles] = useState<string[]>([...CONDUCTORES]);
  const [hoyConduce, setHoyConduce] = useState<string | null>(null);
  const [siguiente, setSiguiente] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      await actualizarTurnos();
    })();
  }, [tipoDesplazamiento, disponibles]);

  function mostrarAviso(texto: string) {
    setMensaje(texto);
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(2500),
      Animated.timing(fadeAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start(() => setMensaje(null));
  }

  function toggleDisponibilidad(nombre: string) {
    setDisponibles((prev) =>
      prev.includes(nombre)
        ? prev.filter((n) => n !== nombre)
        : [...prev, nombre]
    );
  }

  async function actualizarTurnos() {
    const key = 'ULTIMOS_CONDUCTORES';
    const saved = await AsyncStorage.getItem(key);
    const prev = saved ? JSON.parse(saved) : { ultimoCorto: null, ultimoLargo: null };

    const ultimo = tipoDesplazamiento === 'Corto' ? prev.ultimoCorto : prev.ultimoLargo;
    let idx = ultimo ? CONDUCTORES.indexOf(ultimo) : -1;

    let intentos = 0;
    let siguienteIdx = (idx + 1) % CONDUCTORES.length;
    while (!disponibles.includes(CONDUCTORES[siguienteIdx]) && intentos < CONDUCTORES.length) {
      siguienteIdx = (siguienteIdx + 1) % CONDUCTORES.length;
      intentos++;
    }

    const conductorActual = CONDUCTORES[siguienteIdx];

    let siguiente2Idx = (siguienteIdx + 1) % CONDUCTORES.length;
    let intentos2 = 0;
    while (!disponibles.includes(CONDUCTORES[siguiente2Idx]) && intentos2 < CONDUCTORES.length) {
      siguiente2Idx = (siguiente2Idx + 1) % CONDUCTORES.length;
      intentos2++;
    }

    const conductorSiguiente = CONDUCTORES[siguiente2Idx];

    setHoyConduce(conductorActual);
    setSiguiente(conductorSiguiente);
  }

  async function handleRegistrar() {
    try {
      const keyTurnos = 'ULTIMOS_CONDUCTORES';
      const keyHistorial = 'HISTORIAL';
      const savedTurnos = await AsyncStorage.getItem(keyTurnos);
      const turnos = savedTurnos
        ? JSON.parse(savedTurnos)
        : { ultimoCorto: null, ultimoLargo: null };

      const ultimo = tipoDesplazamiento === 'Corto' ? turnos.ultimoCorto : turnos.ultimoLargo;
      let idx = ultimo ? CONDUCTORES.indexOf(ultimo) : -1;

      let intentos = 0;
      let siguienteIdx = (idx + 1) % CONDUCTORES.length;
      while (!disponibles.includes(CONDUCTORES[siguienteIdx]) && intentos < CONDUCTORES.length) {
        siguienteIdx = (siguienteIdx + 1) % CONDUCTORES.length;
        intentos++;
      }

      const nuevoConductor = CONDUCTORES[siguienteIdx];
      const hoy = new Date().toISOString().split('T')[0];

      const actualizadoTurnos = {
        ...turnos,
        [tipoDesplazamiento === 'Corto' ? 'ultimoCorto' : 'ultimoLargo']: nuevoConductor,
      };
      await AsyncStorage.setItem(keyTurnos, JSON.stringify(actualizadoTurnos));

      const savedHist = await AsyncStorage.getItem(keyHistorial);
      const parsedHist = savedHist ? JSON.parse(savedHist) : [];
      const nuevoRegistro = {
        fecha: hoy,
        tipo: tipoDesplazamiento,
        conductor: nuevoConductor,
      };
      await AsyncStorage.setItem(keyHistorial, JSON.stringify([...parsedHist, nuevoRegistro]));

      setHoyConduce(nuevoConductor);
      mostrarAviso(`✅ Conductor asignado: ${nuevoConductor}`);
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'No se pudo guardar el registro.');
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.background, padding: 20 }}>
      <Text
        style={{
          color: COLORS.gold,
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
          textAlign: 'center',
        }}
      >
        🚗 Módulo Coche
      </Text>

      {/* Botón registrar */}
      <TouchableOpacity
        onPress={handleRegistrar}
        style={{
          backgroundColor: COLORS.gold,
          padding: 14,
          borderRadius: RADIUS,
          marginBottom: 30,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: COLORS.background,
            fontWeight: 'bold',
            fontSize: 16,
          }}
        >
          Registrar Acto
        </Text>
      </TouchableOpacity>

      {/* Navegación */}
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Stats')}
          style={{
            backgroundColor: COLORS.gold,
            paddingVertical: 14,
            borderRadius: RADIUS,
            width: '80%',
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              color: COLORS.background,
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 16,
            }}
          >
            📊 Ver estadísticas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('History')}
          style={{
            backgroundColor: COLORS.gold,
            paddingVertical: 14,
            borderRadius: RADIUS,
            width: '80%',
          }}
        >
          <Text
            style={{
              color: COLORS.background,
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 16,
            }}
          >
            🕓 Ver historial
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
