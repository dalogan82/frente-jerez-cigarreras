import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { COLORS, RADIUS } from '../constants/theme';

export default function PasswordModal({ visible, onClose, onSuccess }) {
  const [password, setPassword] = useState('');

  const handleConfirm = () => {
    // Validación segura
    if (password.trim() === '@Cigarreras.2015*') {
      setPassword('');
      onSuccess();
    } else {
      Alert.alert('Contraseña incorrecta');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.6)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.background,
            padding: 20,
            borderRadius: RADIUS,
            width: '100%',
            maxWidth: 350,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 18,
              marginBottom: 10,
              textAlign: 'center',
            }}
          >
            Introduce la contraseña
          </Text>

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••••"
            placeholderTextColor="#777"
            secureTextEntry
            style={{
              backgroundColor: '#1a1a1a',
              color: COLORS.white,
              borderRadius: RADIUS,
              padding: 10,
              marginBottom: 20,
            }}
          />

          <TouchableOpacity
            onPress={handleConfirm}
            style={{
              backgroundColor: COLORS.blue,
              padding: 10,
              borderRadius: RADIUS,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: '#fff',
                fontWeight: 'bold',
              }}
            >
              Confirmar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={{ marginTop: 10 }}>
            <Text style={{ color: COLORS.muted, textAlign: 'center' }}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
