import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { TravelEntry } from '../types';
import styles from '../styles/styles';
import { ThemeContext } from '../context/ThemeContext';

type Props = {
  entry: TravelEntry;
  onRemove: () => void;
};

export default function TravelEntryItem({ entry, onRemove }: Props) {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.entryItem,
        { backgroundColor: isDarkMode ? '#4d4d4d' : '#f5f5dc' } 
      ]}
    >
      <Image source={{ uri: entry.photoUri }} style={styles.entryImage} />
      <View style={styles.entryDetails}>
        <Text style={[styles.text, { color: isDarkMode ? '#fff' : '#000' }]}>
          📍 {entry.address}
        </Text>
      </View>
      <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
}
