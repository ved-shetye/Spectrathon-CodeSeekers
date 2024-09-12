import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import { useLogin } from '../../context/LoginProvider';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserLogin = ({navigation}) => {
  const [enteredCode, setEnteredCode] = useState('');
  const {setIsLoggedIn,setRole,setCode}  = useLogin();
  
  const handleLogin = async() => {
    if (!enteredCode.trim()) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    try {
      const res = await firestore().collection('Users').doc(enteredCode).get();
      const response = res._data;
      if(!response){
        Alert.alert("Code doesn't exist!");
        return;
      }
      await AsyncStorage.setItem('code', enteredCode);
      await AsyncStorage.setItem('login',"true");
      await AsyncStorage.setItem('role',"user");
      setCode(enteredCode);
      setRole("user");
      setIsLoggedIn(true);
      navigation.navigate("UserHome")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LinearGradient
      colors={['rgba(242,111,97,1)','rgba(246,144,56,1)']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0.3535, 0.9548]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.header}>User Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Code"
            onChangeText={setEnteredCode}
            value={enteredCode}
            autoCapitalize="none"
            placeholderTextColor="#666" // Adjust placeholder text color
          />
            <Button
            title="Login"
            onPress={handleLogin}
            color="rgba(246,144,56,1)" // Orange color for the button
            />
            <Text style={{color:"black",paddingTop:30}} >
          Are you a Caretaker?
          <Text style={{color:"blue",paddingTop:30}} onPress={()=>navigation.navigate("CaretakerSignUp")}>Register</Text>
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: 'white', // White background for input container
    borderRadius: 10, // Rounded corners
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(242,111,97,1)', // Adjust header text color
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#333', // Adjust text color
  },
});

export default UserLogin;