import React, { useState, useContext } from 'react';
import { View, Image, Alert, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { saveEntries, getEntries } from '../utils/storage';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';
import styles from '../styles/styles';

export default function TravelEntryScreen() {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Camera access is needed to take photos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({ quality: 0.5 });
    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);

      const { status: locStatus } = await Location.requestForegroundPermissionsAsync();
      if (locStatus === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        const geo = await Location.reverseGeocodeAsync(location.coords);
        const addr = `${geo[0].name}, ${geo[0].city}`;
        setAddress(addr);
      } else {
        setAddress('Unknown location');
      }
    }
  };

  const handleSave = async () => {
    if (!photoUri || !address) return;

    const entry = { photoUri, address };
    const entries = await getEntries();
    const updated = [...entries, entry];
    await saveEntries(updated);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Travel Entry Saved!',
        body: `📍 ${address}`,
      },
      trigger: null,
    });

    navigation.goBack();
  };

  const handleCancel = () => {
    Alert.alert(
      "Are you sure?",
      "Entry will not be saved if you go back.",
      [
        { text: "No" },
        { text: "Yes", onPress: () => navigation.goBack() },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
      {photoUri ? (
        <>
          <Image source={{ uri: photoUri }} style={styles.preview} />
          {address && (
            <Text style={[styles.text, { color: isDarkMode ? '#fff' : '#000' }]}>📍 {address}</Text>
          )}
          <TouchableOpacity style={[styles.button, { backgroundColor: '#c9a65f' }]} onPress={handleSave}>
            <Text style={styles.buttonText}>Log to Diary</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#888' }]} onPress={handleCancel}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#c9a65f', width: '80%' }]} onPress={takePhoto}>
            <Text style={styles.buttonText}>Take a Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#888', width: '80%' }]} onPress={navigation.goBack}>
            <Text style={styles.buttonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
