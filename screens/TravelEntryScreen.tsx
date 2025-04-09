import React, { useState, useEffect } from 'react';
import { View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { v4 as uuidv4 } from 'uuid';
import { saveEntries, getEntries } from '../utils/storage';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/styles';

export default function TravelEntryScreen() {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      const { status: notifStatus } = await Notifications.requestPermissionsAsync();

      if (cameraStatus !== 'granted') {
        alert('Camera permission is required.');
      }

      if (locationStatus !== 'granted') {
        alert('Location permission is required.');
      }

      if (notifStatus !== 'granted') {
        alert('Notification permission is required.');
      }
    })();
  }, []);

  const launchCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setPhotoUri(uri);
    }
  };

  const getAddress = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const geo = await Location.reverseGeocodeAsync(location.coords);
      const place = geo[0];
      return `${place.name ?? 'Unknown'}, ${place.city ?? 'Unknown'}`;
    } catch (error) {
      console.error("Location error:", error);
      return "Unknown location";
    }
  };

  const handleSave = async () => {
    try {
      console.log("Starting save process...");
      const address = await getAddress();
      console.log("Got address:", address);

      const entry = {
        id: uuidv4(),
        photoUri: photoUri!,
        address,
      };
      console.log("New entry:", entry);

      const entries = await getEntries();
      const updated = [...entries, entry];
      await saveEntries(updated);
      console.log("Saved to AsyncStorage");

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Travel Entry Saved!',
          body: `📍 ${address}`,
        },
        trigger: null,
      });

      console.log("Notification sent. Navigating back.");
      navigation.goBack();
    } catch (error) {
      console.error("Save failed:", error);
      alert("Something went wrong while saving the entry.");
    }
  };

  const handleCancel = () => {
    setPhotoUri(null);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {photoUri ? (
        <>
          <Image source={{ uri: photoUri }} style={styles.preview} />
          <Button title="Save Entry" onPress={handleSave} />
          <Button title="Try Again" onPress={() => setPhotoUri(null)} />
        </>
      ) : (
        <>
          <Button title="Take a Photo" onPress={launchCamera} />
          <Button title="Cancel" onPress={handleCancel} />
        </>
      )}
    </View>
  );
}
