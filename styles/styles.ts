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
    height: 300,
    resizeMode: 'cover',
    marginBottom: 10,
  },

  text: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  
  image: {
    width: 250,
    height: 250,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },

  itemContainer: {
    marginVertical: 8,
  },
  
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },

  Addbutton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 80,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  entryItem: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  
  entryImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  
  entryDetails: {
    marginBottom: 10,
  },
  
  removeButton: {
    backgroundColor: '#b0203a',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

    noEntriesContainer: {
      flex: 1,
      justifyContent: 'center', 
      alignItems: 'center', 
    },
  
});
