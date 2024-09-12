import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../../context/LoginProvider';

const CaretakerSignup = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const {setCaretaker,setRole,setIsLoggedIn} = useLogin();

  const handleLogin = async() => {
    if (!email.trim() || !password.trim() || !confirmPassword.trim()|| !age.trim() || !name.trim() || !gender.trim() || !number.trim() ) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      setConfirmPassword('');
      setPassword('');
      return;
    }
    try {
      await auth().createUserWithEmailAndPassword(email,password);
      await AsyncStorage.setItem('role', "caretaker");
      await AsyncStorage.setItem('login', "true");

      console.log(details);
      const details = {name,email,age,gender,number};
      await AsyncStorage.setItem('caretakerDetails', JSON.stringify(details));
      setRole("caretaker");
      setIsLoggedIn(true);
      setCaretaker(details)
      console.log('User account created & signed in!');
      navigation.navigate("UserSignUp");
  } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
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
          <Text style={styles.header}>Caretaker Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={setName}
            value={name}
            autoCapitalize="words"
            placeholderTextColor="#666" 
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#666" 
          />
          <TextInput
            style={styles.input}
            placeholder="Age"
            onChangeText={setAge}
            value={age}
            placeholderTextColor="#666" 
          />
          <TextInput
            style={styles.input}
            placeholder="Gender"
            onChangeText={setGender}
            value={gender}
            placeholderTextColor="#666" 
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            onChangeText={setNumber}
            value={number}
            placeholderTextColor="#666" 
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            placeholderTextColor="#666" 
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            secureTextEntry
            placeholderTextColor="#666" 
          />
            <Button
            title="Register"
            onPress={handleLogin}
            color="rgba(246,144,56,1)" 
            />
        <Text style={{color:"black",paddingTop:30}} >
           Caretaker already registered?
          <Text style={{color:"blue",paddingTop:30}} onPress={()=>navigation.navigate("CaretakerLogin")}>Login</Text>
          </Text>
        <Text style={{color:"black",paddingTop:5}} >
          Are you a User?
          <Text style={{color:"blue",paddingTop:30}} onPress={()=>navigation.navigate("UserLogin")}>Login</Text>
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
    backgroundColor: 'white', 
    borderRadius: 10, 
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(242,111,97,1)', 
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
    color: '#333', 
  },
});

export default CaretakerSignup;