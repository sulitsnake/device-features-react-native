import React, { useState } from 'react';
import { View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { saveEntries, getEntries } from '../utils/storage';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/styles';

export default function TravelEntryScreen() {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const navigation = useNavigation();

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Camera access is needed to take photos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.5,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const getAddress = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Location access is needed to tag your entry.');
      return 'Unknown location';
    }

    const location = await Location.getCurrentPositionAsync({});
    const geo = await Location.reverseGeocodeAsync(location.coords);
    return `${geo[0].name}, ${geo[0].city}`;
  };

  const handleSave = async () => {
    const address = await getAddress();
    const entry = {
      photoUri: photoUri!,
      address,
    };
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
    setPhotoUri(null);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {photoUri ? (
        <>
          <Image source={{ uri: photoUri }} style={styles.preview} />
          <Button title="Use This Photo" onPress={handleSave} />
          <Button title="Try Again" onPress={() => setPhotoUri(null)} />
        </>
      ) : (
        <>
          <Button title="Take Picture" onPress={takePhoto} />
          <Button title="Cancel" onPress={handleCancel} />
        </>
      )}
    </View>
  );
}
