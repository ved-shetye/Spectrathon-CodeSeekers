import React, { useState } from 'react';
import { View, TextInput,Alert, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useLogin } from '../../context/LoginProvider';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CaretakerLogin = ({navigation}) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const {setIsLoggedIn,setRole,setCode}  = useLogin();

  const handleLogin = async() => {
    if (!enteredCode.trim()||!enteredEmail.trim()||!enteredPassword.trim()) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    try {
        // const res = await auth().createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!');
        console.log("userCredentials");
        const userCredentials = await auth().signInWithEmailAndPassword(enteredEmail,enteredPassword);
        const res = await firestore().collection('Users').doc(enteredCode).get();
        const response = res._data;
        console.log(response);
      if(!response){
        Alert.alert("Code doesn't exist!");
        return;
      }
      await AsyncStorage.setItem('code', enteredCode);
      await AsyncStorage.setItem('login',"true");
      await AsyncStorage.setItem('role',"caretaker");
      setCode(enteredCode);
      setRole("caretaker");
      setIsLoggedIn(true);
      console.log("Logged");
      navigation.navigate("Allbackgroundservices");
    } catch (error) {
      if(error.code ==='auth/invalid-credential'){
        Alert.alert("Email not registered");
      }
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
          <Text style={styles.header}>SafeMinder</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEnteredEmail}
            value={enteredEmail}
            placeholderTextColor="#666"
            autoCapitalize='none'
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={setEnteredPassword}
            value={enteredPassword}
            secureTextEntry
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.input}
            placeholder="Code"
            onChangeText={setEnteredCode}
            value={enteredCode}
            placeholderTextColor="#666"
          />
          <Button
            title="Login"
            onPress={handleLogin}
            color="rgba(246,144,56,1)"
          />
          <TouchableOpacity>
            <Text onPress={()=>navigation.navigate("CaretakerSignUp")} style={styles.signupText}>Create a new account?
            <Text style={{color:"blue"}} > Sign up</Text>
            </Text>
          </TouchableOpacity>
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
  header: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'rgba(242,111,97,1)',
    marginBottom: 20,
    textAlign: 'center'
  },
  inputContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginBottom: 20,
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
  signupText: {
    color: 'black',
    marginTop: 10,
    textDecorationLine: 'underline',
    textAlign: 'center'
  },
});

export default CaretakerLogin;
