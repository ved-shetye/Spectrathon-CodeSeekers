import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import NavigationBar from './NavigationBar';
import firestore from '@react-native-firebase/firestore';
import { useLogin } from '../context/LoginProvider';

const ProfilePage = () => {

  const [user,setUser] = useState({name:"",age:"",number:"",email:""});
  const {code} = useLogin();

  useEffect(()=>{
    get();
  },[]);

  const get = async()=>{
    const user =await firestore().collection('Users').doc(code).get();
    const temp =await user._data;
    setUser({email:temp.caretakerEmail,name:temp.caretakerName,})
  }
  
  return (
    <LinearGradient
      colors={['rgba(242,111,97,1)','rgba(246,144,56,1)']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0.3535, 0.9548]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Image source={require('../assets/ProfilePage.png')} style={[styles.image]} />
      </View>
      <View style={styles.textContainer}>
        <View style={[styles.textArea, {left: 120, top: 345}]}>
          <Text style={[styles.textTitle]}>Sagar</Text>
        </View>
        <View style={[styles.textArea, {left: 120, top: 337}]}>
          <Text style={[styles.textTitle]}>20</Text>
        </View>
        <View style={[styles.textArea, {left: 120, top: 333}]}>
          <Text style={[styles.textTitle]}>8806575705</Text>
        </View>
        <View style={[styles.textArea, {left: 120, top: 328}]}>
          <Text style={[styles.textTitle]}>sagar_shirgoankar</Text>
        </View>
        <View style={[styles.textArea, {left: 120, top: 317}]}>
          <Text style={[styles.textTitle]}>sagar@gmail.com</Text>
        </View>
      </View>
      <NavigationBar/>
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
  image: {
    height:830,
    width: 400,
    left:-2,
    top: 195,
    resizeMode: 'contain',
    zIndex: -1,
  },
  textContainer: {
    position: 'absolute',
    flex:1,
    alignContent: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  textArea: {
    // color: 'black',
    flex:1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    // fontSize: 22,
    margin: 10,
    height: 60,
    width: 200,
  },
  textTitle: {
    color: 'black',
    fontSize: 16
  },
});

export default ProfilePage;
