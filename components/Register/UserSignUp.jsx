import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useLogin} from '../../context/LoginProvider';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const UserSignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [number, setNumber] = useState('');
  const {caretaker,code,setCode} = useLogin();

  useEffect(()=>{
    if (code) {
      navigation.navigate("CaretakerHome");
    }
  },);

  const handleLogin = async () => {
    if (
      !email.trim() ||
      !age.trim() ||
      !name.trim() ||
      !gender.trim() ||
      !number.trim()
    ) {
      // Check if any field is empty
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    try {
      let code = uuid.v4();
      code = code.slice(0, 6);
      console.log(caretaker.name);
      const data = {
        caretakerName:caretaker.name,
        caretakerEmail:caretaker.email,
        caretakerNo:caretaker.number,
        userNo:number,
        medication:[],
        hours,
        mins,
        fallDetected:false,
        boundStatus:false,
        homeLocation:{latitude:15.16,longitude:74.012},
        userLocation:{latitude:23.241,longitude:78.39},
        radius:0,
        user: {name, caretakerName:caretaker.name,caretakerEmail:caretaker.email, code, email, age},
        code,
      };
      // console.log(data);
      const res = await firestore().collection('Users').doc(code).set(data);
      await AsyncStorage.setItem('code', code);
      setCode(code);
      console.log('Code generated!');
      navigation.navigate("CaretakerHome");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LinearGradient
      colors={['rgba(242,111,97,1)', 'rgba(246,144,56,1)']}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}
      locations={[0.3535, 0.9548]}
      style={styles.gradient}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.header}>User Registration</Text>
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
          <Button
            title="Register"
            onPress={handleLogin}
            color="rgba(246,144,56,1)" 
          />
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
    textAlign: 'center',
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

export default UserSignUp;
