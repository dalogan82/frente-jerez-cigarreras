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
      let siguiente2Idx = (siguienteIdx + 1) % CONDUCTORES.length;
      let intentos2 = 0;
      while (!disponibles.includes(CONDUCTORES[siguiente2Idx]) && intentos2 < CONDUCTORES.length) {
        siguiente2Idx = (siguiente2Idx + 1) % CONDUCTORES.length;
        intentos2++;
      }
      setSiguiente(CONDUCTORES[siguiente2Idx]);

      mostrarAviso(`✅ Conductor asignado: ${nuevoConductor}`);
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'No se pudo guardar el registro.');
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.background, padding: 20 }}>
      {mensaje && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 30,
            left: 20,
            right: 20,
            backgroundColor: COLORS.gold,
            borderRadius: RADIUS,
            padding: 10,
            opacity: fadeAnim,
            zIndex: 99,
          }}
        >
          <Text style={{ textAlign: 'center', color: '#000', fontWeight: 'bold' }}>
            {mensaje}
          </Text>
        </Animated.View>
      )}

      <Text
        style={{
          color: COLORS.gold,
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
          textAlign: 'center',
        }}
      >
        Frente Jerez{'\n'}“Las Cigarreras”
      </Text>

      {/* Tipo de desplazamiento */}
      <View style={{ ...CARD, marginBottom: 20 }}>
        <Text style={{ color: COLORS.white, fontSize: 18, marginBottom: 10 }}>
          Tipo de desplazamiento:
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          {['Corto', 'Largo'].map((tipo) => (
            <TouchableOpacity
              key={tipo}
              onPress={() => setTipoDesplazamiento(tipo as 'Corto' | 'Largo')}
              style={{
                backgroundColor:
                  tipoDesplazamiento === tipo ? COLORS.blue : '#1b1b1b',
                padding: 10,
                borderRadius: RADIUS,
                width: '40%',
              }}
            >
              <Text style={{ color: COLORS.white, textAlign: 'center' }}>{tipo}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Disponibilidad */}
      <View style={{ ...CARD, marginBottom: 20 }}>
        <Text style={{ color: COLORS.white, fontSize: 18, marginBottom: 10 }}>
          Selecciona los conductores disponibles:
        </Text>
        {CONDUCTORES.map((nombre) => (
          <TouchableOpacity
            key={nombre}
            onPress={() => toggleDisponibilidad(nombre)}
            style={{
              backgroundColor: disponibles.includes(nombre)
                ? COLORS.green
                : COLORS.red,
              padding: 10,
              borderRadius: RADIUS,
              marginVertical: 4,
            }}
          >
            <Text
              style={{
                color: '#000',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              {nombre} {disponibles.includes(nombre) ? '✅' : '❌'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Hoy conduce */}
      <View style={{ ...CARD, alignItems: 'center', gap: 10 }}>
        <Text style={{ color: COLORS.white, fontSize: 18 }}>
          Hoy conduce:{' '}
          <Text style={{ color: COLORS.green, fontWeight: 'bold' }}>
            {hoyConduce ?? '-'}
          </Text>
        </Text>
        <Text style={{ color: COLORS.white, fontSize: 16 }}>
          Siguiente:{' '}
          <Text style={{ color: COLORS.blue }}>{siguiente ?? '-'}</Text>
        </Text>
      </View>

      {/* Botón registrar */}
      <TouchableOpacity
        onPress={handleRegistrar}
        style={{
          backgroundColor: COLORS.gold,
          padding: 14,
          borderRadius: RADIUS,
          marginTop: 30,
        }}
      >
        <Text
          style={{ textAlign: 'center', color: '#000', fontWeight: 'bold' }}
        >
          Registrar Acto
        </Text>
      </TouchableOpacity>

      {/* Botones de navegación centrados */}
      <View style={{ marginTop: 30, alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Stats')}
          style={{
            backgroundColor: COLORS.blue,
            paddingVertical: 14,
            borderRadius: RADIUS,
            width: '80%',
            marginBottom: 16,
          }}
        >
          <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>
            📊 Ver estadísticas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('History')}
          style={{
            backgroundColor: COLORS.green,
            paddingVertical: 14,
            borderRadius: RADIUS,
            width: '80%',
          }}
        >
          <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>
            🕓 Ver historial
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
