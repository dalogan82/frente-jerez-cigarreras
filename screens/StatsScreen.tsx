import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, CARD } from '../constants/theme';
import HorizontalBarChart, { HBarDatum } from '../components/HorizontalBarChart';
import PasswordModal from '../components/PasswordModal';

const CONDUCTORES = ['Alberto', 'Daniel', 'Manuel', 'Miguel'];

type Registro = {
  fecha: string;
  tipo: 'Corto' | 'Largo';
  conductor: string;
};

export default function StatsScreen() {
  const [rows, setRows] = useState<HBarDatum[]>([]);
  const [totales, setTotales] = useState({ corto: 0, largo: 0, general: 0 });
  const [showPwd, setShowPwd] = useState(false);
  const [ultimoConductor, setUltimoConductor] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      await cargar();
      await obtenerUltimoConductor();
    })();
  }, []);

  async function cargar() {
    try {
      const raw = await AsyncStorage.getItem('HISTORIAL');
      if (!raw) {
        setRows([]);
        return;
      }

      const registros: Registro[] = JSON.parse(raw);
      if (!Array.isArray(registros) || registros.length === 0) {
        setRows([]);
        return;
      }

      // Crear mapa de conteo
      const mapa: Record<string, { corto: number; largo: number }> = {};
      CONDUCTORES.forEach((c) => (mapa[c] = { corto: 0, largo: 0 }));

      registros.forEach((r) => {
        if (!mapa[r.conductor]) mapa[r.conductor] = { corto: 0, largo: 0 };
        if (r.tipo === 'Corto') mapa[r.conductor].corto++;
        if (r.tipo === 'Largo') mapa[r.conductor].largo++;
      });

      const datos: HBarDatum[] = Object.entries(mapa).map(([nombre, v]) => ({
        label: nombre,
        normal: v.corto,
        desplazamiento: v.largo,
      }));

      const totalCorto = Object.values(mapa).reduce((acc, v) => acc + v.corto, 0);
      const totalLargo = Object.values(mapa).reduce((acc, v) => acc + v.largo, 0);

      setRows(datos);
      setTotales({
        corto: totalCorto,
        largo: totalLargo,
        general: totalCorto + totalLargo,
      });
    } catch (err) {
      console.error('Error cargando estadísticas:', err);
      Alert.alert('Error', 'No se pudieron cargar las estadísticas.');
      setRows([]);
    }
  }

  async function obtenerUltimoConductor() {
    try {
      const data = await AsyncStorage.getItem('ULTIMOS_CONDUCTORES');
      if (data) {
        const parsed = JSON.parse(data);
        const last = parsed.ultimoCorto || parsed.ultimoLargo || null;
        setUltimoConductor(last);
      }
    } catch (err) {
      console.error('Error obteniendo último conductor:', err);
    }
  }

  async function borrarHistorialProtegido() {
    try {
      await AsyncStorage.removeItem('HISTORIAL');
      setRows([]);
      setTotales({ corto: 0, largo: 0, general: 0 });
      Alert.alert('🧹', 'Historial eliminado correctamente');
    } catch (err) {
      Alert.alert('Error', 'No se pudo eliminar el historial.');
    }
  }

  const puedeBorrar =
    ultimoConductor?.toLowerCase() === 'daniel' ||
    ultimoConductor?.toLowerCase() === 'congui';

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.background, padding: 16 }}
    >
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
        <Text style={{ color: COLORS.muted, textAlign: 'center' }}>
          No hay datos registrados todavía.
        </Text>
      ) : (
        <>
          {/* Tabla de totales */}
          <View style={{ ...CARD, marginBottom: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderColor: '#2a2a2a',
                paddingVertical: 8,
              }}
            >
              <Text style={{ flex: 2, color: COLORS.white, fontWeight: 'bold' }}>
                Conductor
              </Text>
              <Text
                style={{
                  flex: 1.5,
                  color: COLORS.blue,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Corto
              </Text>
              <Text
                style={{
                  flex: 1.5,
                  color: COLORS.green,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Largo
              </Text>
              <Text
                style={{
                  flex: 1,
                  color: COLORS.white,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Total
              </Text>
            </View>

            {rows.map((d) => (
              <View
                key={d.label}
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderColor: '#2a2a2a',
                  paddingVertical: 6,
                }}
              >
                <Text style={{ flex: 2, color: COLORS.white }}>{d.label}</Text>
                <Text
                  style={{
                    flex: 1.5,
                    color: COLORS.white,
                    textAlign: 'center',
                  }}
                >
                  {d.normal}
                </Text>
                <Text
                  style={{
                    flex: 1.5,
                    color: COLORS.white,
                    textAlign: 'center',
                  }}
                >
                  {d.desplazamiento}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    color: COLORS.white,
                    textAlign: 'center',
                  }}
                >
                  {d.normal + d.desplazamiento}
                </Text>
              </View>
            ))}

            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#0f0f0f',
                paddingVertical: 8,
              }}
            >
              <Text
                style={{
                  flex: 2,
                  color: COLORS.white,
                  fontWeight: 'bold',
                }}
              >
                TOTAL
              </Text>
              <Text
                style={{
                  flex: 1.5,
                  color: COLORS.blue,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                {totales.corto}
              </Text>
              <Text
                style={{
                  flex: 1.5,
                  color: COLORS.green,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                {totales.largo}
              </Text>
              <Text
                style={{
                  flex: 1,
                  color: COLORS.white,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                {totales.general}
              </Text>
            </View>
          </View>

          {/* Gráfica de barras */}
          <HorizontalBarChart
            data={rows}
            max={Math.max(...rows.map((r) => r.normal + r.desplazamiento), 1)}
          />
        </>
      )}

      {/* Botón de eliminación solo para Congui */}
      {puedeBorrar && (
        <TouchableOpacity
          onPress={() => setShowPwd(true)}
          style={{
            backgroundColor: COLORS.red,
            padding: 12,
            borderRadius: 8,
            marginTop: 24,
          }}
        >
          <Text
            style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}
          >
            🧹 Eliminar historial
          </Text>
        </TouchableOpacity>
      )}

      <PasswordModal
        visible={showPwd}
        onClose={() => setShowPwd(false)}
        onSuccess={async () => {
          await borrarHistorialProtegido();
          setShowPwd(false);
        }}
      />
    </ScrollView>
  );
}
