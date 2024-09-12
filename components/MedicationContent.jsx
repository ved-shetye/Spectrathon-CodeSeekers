import React from 'react';
import { View, Image, TextInput, StyleSheet } from 'react-native';

const MedicationContent = () => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search medication details..." 
        style={styles.input} 
        placeholderTextColor="#666" 
      />
      <Image source={require('../assets/medication_image.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: '100%', // Set the width to 100% to take up the entire width of the container
    height: 260,   // You can adjust the height as needed
    marginBottom: 10,
    marginTop:-40,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f2f2f2', 
    opacity: 0.6,
    color: '#000',
    zIndex: 1,
  },
});

export default MedicationContent;
