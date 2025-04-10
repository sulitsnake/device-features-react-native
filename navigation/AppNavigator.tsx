import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';  
import { useTheme } from '../context/ThemeContext';
import HomeScreen from '../screens/HomeScreen';
import TravelEntryScreen from '../screens/TravelEntryScreen';

export type RootStackParamList = {
  Home: undefined;
  TravelEntry: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: 'Travel Diary',
          headerLeft: () => null,
          headerRight: () => (
            <Ionicons
              name={isDarkMode ? 'sunny' : 'moon'}
              size={24}
              color={isDarkMode ? '#c7983c' : '#2e2e2e'}
              onPress={toggleDarkMode}
              style={{ paddingRight: 10 }}
            />
          ),
          headerStyle: {
            backgroundColor: isDarkMode ? 'black' : 'white',
          },
          headerTitleStyle: {
            color: isDarkMode ? 'white' : 'black',
          },
        }}
      />
      <Stack.Screen
        name="TravelEntry"
        component={TravelEntryScreen}
        options={{
          headerTitle: '',
          headerLeft: () => null,
          headerRight: () => (
            <Ionicons
              name={isDarkMode ? 'sunny' : 'moon'}
              size={24}
              color={isDarkMode ? '#c7983c' : 'black'}
              onPress={toggleDarkMode}
              style={{ paddingRight: 10 }}
            />
          ),
          headerStyle: {
            backgroundColor: isDarkMode ? '#2e2e2e' : 'white',
          },
          headerTitleStyle: {
            color: isDarkMode ? 'white' : 'black',
          },
        }}
      />
    </Stack.Navigator>
  );
}
