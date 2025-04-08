import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import TravelEntryScreen from '../screens/TravelEntryScreen';

export type RootStackParamList = {
  Home: undefined;
  TravelEntry: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="TravelEntry" component={TravelEntryScreen} />
    </Stack.Navigator>
  );
}
