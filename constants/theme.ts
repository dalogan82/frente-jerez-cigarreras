// constants/theme.ts

export const COLORS = {
  // 🎨 Colores principales
  primary: "#5E1381", // Morado corporativo principal
  secondary: "#E9D6F5", // Morado claro de fondo en tablas y secciones
  gold: "#FFD700", // Dorado para botones secundarios y detalles
  white: "#FFFFFF", // Fondo base
  light: "#F9F5FF", // Fondo de tarjetas o secciones
  text: "#2D2D2D", // Texto principal
  muted: "#666666", // Texto secundario
  border: "#E0E0E0", // Líneas divisorias o bordes suaves

  // 🌈 Colores complementarios
  success: "#2ECC71", // Verde para estados correctos o confirmaciones
  danger: "#E74C3C", // Rojo para eliminar o advertencias
  blue: "#2980B9", // Azul complementario (opcional)
  gray: "#BDC3C7", // Gris neutro
};

export const RADIUS = 10; // Curvatura general de botones y tarjetas

export const CARD = {
  backgroundColor: COLORS.light,
  borderRadius: RADIUS,
  padding: 16,
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  elevation: 2,
  marginBottom: 12,
};
