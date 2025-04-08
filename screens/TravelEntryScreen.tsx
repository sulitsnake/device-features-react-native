import React, { useRef, useState } from 'react';
import { View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { v4 as uuidv4 } from 'uuid';
import { saveEntries, getEntries } from '../utils/storage';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/styles';

export default function TravelEntryScreen() {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const navigation = useNavigation();

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
    }
  };

  const getAddress = async () => {
    const location = await Location.getCurrentPositionAsync({});
    const geo = await Location.reverseGeocodeAsync(location.coords);
    return `${geo[0].name}, ${geo[0].city}`;
  };

  const handleSave = async () => {
    const address = await getAddress();
    const entry = {
      id: uuidv4(),
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
          <Camera style={styles.camera} ref={cameraRef} />
          <Button title="Take Picture" onPress={takePicture} />
          <Button title="Cancel" onPress={handleCancel} />
        </>
      )}
    </View>
  );
}
