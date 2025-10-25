import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, CARD } from '../constants/theme';
import HorizontalBarChart, { HBarDatum } from '../components/HorizontalBarChart';

const CONDUCTORES = ['Alberto', 'Daniel', 'Manuel', 'Miguel'];

type Registro = {
  fecha: string;
  tipo: 'Corto' | 'Largo';
  conductor: string;
};

export default function StatsScreen() {
  const [rows, setRows] = useState<HBarDatum[]>([]);

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem('HISTORIAL');
      if (!raw) return;
      const registros: Registro[] = JSON.parse(raw);
      const mapa: Record<string, { corto: number; largo: number }> = {};
      CONDUCTORES.forEach((c) => (mapa[c] = { corto: 0, largo: 0 }));

      registros.forEach((r) => {
        if (r.tipo === 'Corto') mapa[r.conductor].corto++;
        else mapa[r.conductor].largo++;
      });

      const datos: HBarDatum[] = Object.entries(mapa).map(([nombre, v]) => ({
        label: nombre,
        normal: v.corto,
        desplazamiento: v.largo,
      }));

      setRows(datos);
    })();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.background, padding: 16 }}>
      <Text
        style={{
          color: COLORS.gold,
          fontSize: 22,
          fontWeight: 'bold',
          marginBottom: 16,
          textAlign: 'center',
        }}
      >
        Estadísticas de Conductores
      </Text>

      {rows.length === 0 ? (
        <Text style={{ color: COLORS.white, textAlign: 'center' }}>
          No hay datos registrados todavía.
        </Text>
      ) : (
        rows.map((r) => (
          <View key={r.label} style={{ ...CARD, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: COLORS.white }}>{r.label}</Text>
            <Text style={{ color: COLORS.gold }}>
              Corto: {r.normal} | Largo: {r.desplazamiento}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}
