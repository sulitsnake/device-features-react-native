import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  camera: {
    flex: 1,
  },

  preview: {
    width: '100%',
    height: 300, // or 250 if you want it smaller
    resizeMode: 'cover',
    marginBottom: 10,
  },

  text: {
    marginVertical: 4,
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  itemContainer: {
    marginVertical: 8,
  },
});
