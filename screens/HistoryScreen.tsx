import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { COLORS, CARD, RADIUS } from '../constants/theme';

type Registro = {
  fecha: string;
  tipo: 'Corto' | 'Largo';
  conductor: string;
};

export default function HistoryScreen() {
  const navigation = useNavigation();
  const [historial, setHistorial] = useState<Registro[]>([]);

  useEffect(() => {
    cargarHistorial();
  }, []);

  async function cargarHistorial() {
    try {
      const data = await AsyncStorage.getItem('HISTORIAL');
      if (data) {
        const parsed = JSON.parse(data);
        // Ordenar por fecha descendente
        const ordenado = parsed.sort(
          (a: Registro, b: Registro) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        );
        setHistorial(ordenado);
      }
    } catch (err) {
      console.error('Error cargando historial:', err);
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.background, padding: 16 }}>
      <Text
        style={{
          color: COLORS.gold,
          fontSize: 22,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 20,
        }}
      >
        Historial de Actos
      </Text>

      {historial.length === 0 ? (
        <Text style={{ color: COLORS.muted, textAlign: 'center' }}>
          No hay registros guardados todavía.
        </Text>
      ) : (
        historial.map((item, index) => (
          <View
            key={index}
            style={{
              ...CARD,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
              alignItems: 'center',
            }}
          >
            <View>
              <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>
                {item.conductor}
              </Text>
              <Text style={{ color: COLORS.muted, fontSize: 13 }}>
                {item.tipo === 'Corto'
                  ? 'Desplazamiento Corto'
                  : 'Desplazamiento Largo'}
              </Text>
            </View>
            <Text style={{ color: COLORS.gold, fontSize: 13 }}>{item.fecha}</Text>
          </View>
        ))
      )}

      {/* Botón Volver */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={{
          backgroundColor: COLORS.blue,
          padding: 14,
          borderRadius: RADIUS,
          marginTop: 30,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 16,
          }}
        >
          ⬅️ Volver al inicio
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
