import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  TravelEntry: undefined;
  EntryDetail: { entryId: string };
};

export type TravelEntry = {
  id: string;
  photoUri: string;
  address: string;
  date: string;
};

export type EntryDetailRouteProp = RouteProp<RootStackParamList, 'EntryDetail'>;