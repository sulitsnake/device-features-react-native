import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TravelEntryItem from '../components/TravelEntryItem';
import { getEntries, saveEntries } from '../utils/storage';
import { TravelEntry } from '../types';
import styles from '../styles/styles';

export default function HomeScreen() {
  const [entries, setEntries] = useState<TravelEntry[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const load = async () => {
      const saved = await getEntries();
      setEntries(saved);
    };
    const unsubscribe = navigation.addListener('focus', load);
    return unsubscribe;
  }, [navigation]);

  const handleRemove = async (id: string) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    await saveEntries(updated);
  };

  return (
    <View style={styles.container}>
      {entries.length === 0 ? (
        <Text style={styles.text}>No Entries Yet</Text>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TravelEntryItem entry={item} onRemove={() => handleRemove(item.id)} />
          )}
        />
      )}
      <Button title="Add Entry" onPress={() => navigation.navigate('TravelEntry' as never)} />
    </View>
  );
}
