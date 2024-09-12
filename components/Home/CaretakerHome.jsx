//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const CaretakerHome = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>CaretakerHome</Text>
            <Text></Text>
            <Text onPress={()=>navigation.navigate("Maps")} >Maps</Text>
            <Text></Text>
            <Text onPress={()=>navigation.navigate("Medication")} >Medication</Text>
            <Text></Text>
            <Text onPress={()=>navigation.navigate("MedicationContent")} >MedicationContent</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default CaretakerHome;
