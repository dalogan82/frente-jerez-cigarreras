import React from 'react';
import { View, Text } from 'react-native';
import { COLORS, RADIUS } from '../constants/theme';

export type HBarDatum = {
  label: string;
  normal: number;
  desplazamiento: number;
};

export default function HorizontalBarChart({ data, max }: { data: HBarDatum[]; max?: number }) {
  const maxVal = max ?? Math.max(1, ...data.map(d => Math.max(d.normal, d.desplazamiento, d.normal + d.desplazamiento)));

  return (
    <View style={{ gap: 10 }}>
      {data.map((d) => {
        const normalPct = maxVal ? d.normal / maxVal : 0;
        const desplPct = maxVal ? d.desplazamiento / maxVal : 0;
        const normalWidth = `${normalPct * 100}%`;
        const desplWidth = `${desplPct * 100}%`;

        return (
          <View key={d.label} style={{ gap: 6 }}>
            <Text style={{ color: COLORS.white }}>{d.label}</Text>
            <View style={{ backgroundColor: '#1b1b1b', borderRadius: RADIUS, overflow: 'hidden', height: 28 }}>
              <View style={{ flexDirection: 'row', height: '100%' }}>
                {d.normal > 0 && <View style={{ width: normalWidth, backgroundColor: COLORS.blue }} />}
                {d.desplazamiento > 0 && <View style={{ width: desplWidth, backgroundColor: COLORS.green }} />}
              </View>
            </View>
            <Text style={{ color: COLORS.muted, fontSize: 12 }}>
              Corto: {d.normal} · Largo: {d.desplazamiento} · Total: {d.normal + d.desplazamiento}
            </Text>
          </View>
        );
      })}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 12, height: 12, backgroundColor: COLORS.blue, borderRadius: 2, marginRight: 6 }} />
          <Text style={{ color: COLORS.muted, fontSize: 12 }}>Corto</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 12, height: 12, backgroundColor: COLORS.green, borderRadius: 2, marginRight: 6 }} />
          <Text style={{ color: COLORS.muted, fontSize: 12 }}>Largo</Text>
        </View>
      </View>
    </View>
  );
}
