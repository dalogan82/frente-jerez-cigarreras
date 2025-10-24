import React from 'react';
import { View, Text, Switch } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

export default function MemberRow({ name, value, onChange }: { name: string; value: boolean; onChange: (v: boolean) => void; }) {
  return (
    <View style={{
      backgroundColor: '#141414',
      borderRadius: RADIUS,
      padding: SPACING,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: '#1f1f1f'
    }}>
      <Text style={{ color: COLORS.white, fontSize: 16 }}>{name}</Text>
      <Switch value={value} onValueChange={onChange} thumbColor={value ? COLORS.blue : '#999'} trackColor={{ false: '#444', true: '#2E51F5' }} />
    </View>
  );
}
