import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { Camera } from 'expo-camera';

export const requestPermissions = async () => {
  const cameraPermission = await Camera.requestCameraPermissionsAsync();
  const locationPermission = await Location.requestForegroundPermissionsAsync();
  const notificationsPermission = await Notifications.requestPermissionsAsync();

  return {
    camera: cameraPermission.granted,
    location: locationPermission.granted,
    notifications: notificationsPermission.granted,
  };
};
