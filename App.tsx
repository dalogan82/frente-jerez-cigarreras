import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen';
import StatsScreen from './screens/StatsScreen';
import HistoryScreen from './screens/HistoryScreen';
import { COLORS } from './constants/theme';

export type RootStackParamList = {
  Home: undefined;
  Stats: undefined;
  History: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const DarkTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.background,
    card: '#0A0A0A',
    primary: COLORS.blue,
    text: '#FFFFFF',
    border: '#1E1E1E',
    notification: COLORS.red
  }
};

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar style='light' />
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#0A0A0A' }, headerTintColor: '#fff' }}>
        <Stack.Screen name='Home' component={HomeScreen} options={{ title: 'Inicio' }} />
        <Stack.Screen name='Stats' component={StatsScreen} options={{ title: 'Estadisticas' }} />
        <Stack.Screen name='History' component={HistoryScreen} options={{ title: 'Historial' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
