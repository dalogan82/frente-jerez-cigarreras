import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void; // se llama solo si la contraseña es correcta
}

export default function PasswordModal({ visible, onClose, onSuccess }: Props) {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ⚠️ Contraseña exacta
  const PASSWORD = "@Cigarreras.2015*";

  function handleConfirm() {
    const typed = password.trim();
    if (typed === PASSWORD) {
      // limpiar estado y continuar
      setPassword("");
      setShow(false);
      setError(null);
      onSuccess();
    } else {
      setError("Contraseña incorrecta. Revísala e inténtalo de nuevo.");
    }
  }

  function handleClose() {
    setPassword("");
    setShow(false);
    setError(null);
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>🔐 Confirmar eliminación</Text>
          <Text style={styles.subtitle}>
            Introduce la contraseña para borrar **historial** y **estadísticas**.
          </Text>

          <TextInput
            value={password}
            onChangeText={(t) => {
              setPassword(t);
              if (error) setError(null);
            }}
            placeholder="Contraseña"
            placeholderTextColor="#999"
            secureTextEntry={!show}
            autoCapitalize="none"
            autoCorrect={false}
            style={[
              styles.input,
              error ? { borderColor: "#d32f2f" } : { borderColor: "#4B0082" },
            ]}
          />

          {/* Mostrar / Ocultar */}
          <TouchableOpacity
            onPress={() => setShow((s) => !s)}
            style={styles.toggle}
          >
            <Text style={styles.toggleText}>
              {show ? "Ocultar" : "Mostrar"} contraseña
            </Text>
          </TouchableOpacity>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <View style={styles.row}>
            <TouchableOpacity style={[styles.btn, styles.cancel]} onPress={handleClose}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.confirm]} onPress={handleConfirm}>
              <Text style={styles.confirmText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: 420,
    borderRadius: 12,
    padding: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#4B0082",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#444",
    textAlign: "center",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#222",
  },
  toggle: { alignSelf: "flex-end", marginTop: 8, marginBottom: 4 },
  toggleText: { color: "#4B0082", fontWeight: "600" },
  error: { color: "#d32f2f", marginTop: 6, marginBottom: 6, textAlign: "center" },
  row: { flexDirection: "row", gap: 10, marginTop: 10 },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancel: { backgroundColor: "#e0e0e0" },
  confirm: { backgroundColor: "#4B0082" },
  cancelText: { color: "#333", fontWeight: "700" },
  confirmText: { color: "#fff", fontWeight: "700" },
});
