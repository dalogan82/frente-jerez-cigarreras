// components/HorizontalBarChart.tsx

import React from "react";
import { View, Text } from "react-native";
import { COLORS } from "../constants/theme";

export type HBarDatum = {
  label: string;
  normal: number; // desplazamientos cortos
  desplazamiento: number; // desplazamientos largos
};

type Props = {
  data: HBarDatum[];
  max: number;
};

export default function HorizontalBarChart({ data, max }: Props) {
  if (!data || data.length === 0) {
    return (
      <Text
        style={{
          color: COLORS.muted,
          textAlign: "center",
          marginTop: 16,
        }}
      >
        No hay datos para mostrar.
      </Text>
    );
  }

  return (
    <View
      style={{
        marginTop: 20,
        paddingVertical: 10,
      }}
    >
      <Text
        style={{
          color: COLORS.primary,
          fontWeight: "bold",
          fontSize: 18,
          marginBottom: 10,
          textAlign: "center",
        }}
      >
        Gráfico de desplazamientos
      </Text>

      {data.map((item, index) => {
        const total = item.normal + item.desplazamiento;
        const cortoWidth = (item.normal / max) * 100;
        const largoWidth = (item.desplazamiento / max) * 100;

        return (
          <View key={index} style={{ marginBottom: 14 }}>
            {/* Nombre del conductor */}
            <Text
              style={{
                color: COLORS.text,
                marginBottom: 4,
                fontWeight: "bold",
              }}
            >
              {item.label}
            </Text>

            {/* Contenedor de barras */}
            <View
              style={{
                flexDirection: "row",
                height: 26,
                backgroundColor: "#EEE",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              {/* Desplazamientos cortos (morado) */}
              {item.normal > 0 && (
                <View
                  style={{
                    width: `${cortoWidth}%`,
                    backgroundColor: COLORS.primary,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    {item.normal}
                  </Text>
                </View>
              )}

              {/* Desplazamientos largos (dorado) */}
              {item.desplazamiento > 0 && (
                <View
                  style={{
                    width: `${largoWidth}%`,
                    backgroundColor: COLORS.gold,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    {item.desplazamiento}
                  </Text>
                </View>
              )}
            </View>

            {/* Totales numéricos debajo */}
            <Text
              style={{
                marginTop: 4,
                color: COLORS.muted,
                fontSize: 13,
                textAlign: "right",
              }}
            >
              Total: {total}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
