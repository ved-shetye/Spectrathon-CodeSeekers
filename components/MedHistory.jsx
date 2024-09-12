import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import {useLogin} from '../context/LoginProvider';

import bgImage from "../assets/medhistoryBG.png"

const MedHistory = () => {
  const [medications, setMedications] = useState([]);
  const {code} = useLogin();

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    const res = await firestore().collection('Users').doc(code).get();
    const tempMedications = await res._data.medication;
    setMedications(tempMedications);
  };

  const handleRightPress = () => {
    // Add functionality for right image press
  };
  const handleLeftPress = () => {
    // Add functionality for right image press
  };
  const handleCloseButton = () => {
    // Add functionality for right image press
  };

  return (
    <LinearGradient
      colors={['rgba(242,111,97,1)', 'rgba(246,144,56,1)']}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}
      locations={[0.3535, 0.9548]}
      style={styles.gradient}>
      <View style={styles.container}>
        <Image
          source={bgImage}
          style={[styles.image]}
        />
        <TouchableOpacity onPress={handleLeftPress}>
          <Image
            source={require('../assets/left.png')}
            style={[styles.smallimage, {right: 170, bottom: 440}]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRightPress}>
          <Image
            source={require('../assets/right.png')}
            style={[styles.smallimage, {left: 168, bottom: 505}]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCloseButton}>
          <Image
            source={require('../assets/CloseButton.png')}
            style={[styles.button, {left: 0, bottom: 150}]}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          {medications &&
            medications.map((i) => {
              return (
                <View key={i.minutes} style={[styles.textArea, {top: 130}]}>
                  <Text style={[styles.textTitle]}>{i.title}</Text>
                  <Text style={[styles.textTime]}>{i.hours}:{i.minutes}</Text>
                  {/* <Text style={[styles.textStartDate]}>3</Text>
                <Text style={[styles.textEndDate]}>4</Text> */}
                </View>
              );
            })}
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
  image: {
    height: 830,
    width: 418,
    left: -2,
    top: 125,
    resizeMode: 'contain',
    zIndex: -1,
  },
  smallimage: {
    // height: 50,
    width: 30,
    resizeMode: 'contain',
    bottom: 200,
    zIndex: 100,
  },
  button: {
    width: 360,
    resizeMode: 'contain',
  },
  textContainer: {
    position: 'absolute',
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  textArea: {
    // color: 'black',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    fontSize: 18,
    margin: 10,
    height: 60,
    width: 280,
  },
  textTitle: {
    color: 'black',
  },
  textTime: {
    color: 'black',
  },
  textStartDate: {
    color: 'black',
  },
  textEndDate: {
    color: 'black',
  },
});

export default MedHistory;
