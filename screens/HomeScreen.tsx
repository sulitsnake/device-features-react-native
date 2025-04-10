import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TravelEntryItem from '../components/TravelEntryItem';
import { getEntries, saveEntries } from '../utils/storage';
import { TravelEntry } from '../types';
import styles from '../styles/styles';
import { ThemeContext } from '../context/ThemeContext';
import { requestPermissions } from '../utils/permissions';

export default function HomeScreen() {
  const [entries, setEntries] = useState<TravelEntry[]>([]);
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const load = async () => {
      const saved = await getEntries();
      setEntries(saved);
    };

    const checkPermissions = async () => {
      const { camera, location } = await requestPermissions();
      if (!camera || !location) {
        Alert.alert(
          "Permissions Required",
          "Please enable Camera and Location permissions in your device settings to add an entry.",
          [
            { text: "Cancel" },
            { text: "Go to Settings", onPress: () => Linking.openURL('app-settings:') }
          ]
        );
      }
    };

    checkPermissions();
    const unsubscribe = navigation.addListener('focus', load);
    return unsubscribe;
  }, [navigation]);

  const handleRemove = (photoUri: string, location: string) => {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete this entry from ${location}?`,
      [
        { text: "Cancel" },
        { text: "Delete", onPress: () => removeEntry(photoUri) },
      ]
    );
  };

  const removeEntry = async (photoUri: string) => {
    const updated = entries.filter(e => e.photoUri !== photoUri);
    setEntries(updated);
    await saveEntries(updated);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
      {entries.length === 0 ? (
        <View style={styles.noEntriesContainer}>
          <Text style={[styles.text, { color: isDarkMode ? '#fff' : '#000' }]}>No Entries Yet</Text>
        </View>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item, index) => item.photoUri + index}
          renderItem={({ item }) => (
            <TravelEntryItem
              entry={item}
              onRemove={() => handleRemove(item.photoUri, item.address)} 
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}

      <TouchableOpacity
        style={[styles.Addbutton, { backgroundColor: isDarkMode ? '#888' : '#c9a65f' }]}
        onPress={() => navigation.navigate('TravelEntry' as never)}
      >
        <Text style={styles.buttonText}>Add Entry</Text>
      </TouchableOpacity>
    </View>
  );
}
