import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import { TravelEntry } from '../types';
import styles from '../styles/styles';

type Props = {
  entry: TravelEntry;
  onRemove: () => void;
};

export default function TravelEntryItem({ entry, onRemove }: Props) {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: entry.photoUri }} style={styles.image} />
      <Text style={styles.text}>{entry.address}</Text>
      <Button title="Remove" onPress={onRemove} />
    </View>
  );
}
