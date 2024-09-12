import React, { useState,useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Button, TextInput, Linking } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import NavigationBar from './NavigationBar';
import Mapbox,{MapView,Camera,ShapeSource} from '@rnmapbox/maps';
import { useLogin } from '../context/LoginProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import Loading from './Loading/Loading';
import BackgroundService from 'react-native-background-actions';
Mapbox.setAccessToken('pk.eyJ1IjoiY29kZXNlZWtlcnMiLCJhIjoiY2x1ZmRidHkzMGtxMjJrcm84Nm93azFydyJ9.4PcFMmvYRH31QSZmtU1cXA');
import PushNotification from 'react-native-push-notification';

const Maps = ({navigation}) => {
  // background function for caretaker for Fall and bounddetect
  const {code} = useLogin();
  const [serviceRunning,setServiceRunning]=useState(false)
  const [imageSource,setImageSource] = useState(require('../assets/settingblack.png'))
  const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

  // Background task function
  const veryIntensiveTask = async (taskDataArguments) => {
    const { delay } = taskDataArguments;
    await new Promise(async (resolve) => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        if (i%15===0 && i>14) {
          try {
              const res = await firestore().collection('Users').doc(code).get();
              const fallDetectedStatus = res._data.fallDetected;
              const boundDetectedStatus = res._data.boundStatus;
              const userName = res._data.user.name;
              if (boundDetectedStatus) {
                showNotification(`${userName} is out of bound.`);
              }
              if (fallDetectedStatus) {
                try {
                  await firestore().collection('Users').doc(code).update({'fallDetected': false});
                  showNotification(`${userName} has fallen down`);
              } catch (error) {
                  console.log(error);
              }
              }
          } catch (error) {
              console.log(error);
          }
      }        
        await sleep(delay);
      }
    });
  };
  const showNotification = (mess) => {
    PushNotification.localNotification({
      channelId: "Caretaker-alert", // Channel ID
      title: 'Alert',
      message: mess,
      // actions: ['Take Medication'], // Button label
      // data:{screen:"CodeInfo"},
      // onPress:navigation.navigate("Codeinfo")
    });
  };

  // Options for background service
  const options = {
    taskName: 'BackgroundTimerTask',
    taskTitle: 'Background Timer',
    taskDesc: 'Running background timer',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
      delay: 1000,
    },
  };

  // Function to start background service
  const startBackgroundService = async () => {
    setImageSource(require('../assets/setting.png'))
    await BackgroundService.start(veryIntensiveTask, options);
    setServiceRunning(true);
  };

  // Function to stop background service
  const stopBackgroundService = async () => {
    setImageSource(require('../assets/settingblack.png'))
    await BackgroundService.stop(veryIntensiveTask, options);
    setServiceRunning(false);
  };

  const toggleService = () => {
    if (serviceRunning) {
      stopBackgroundService();
    } else {
      startBackgroundService();
    }
  };



  // Maps logic start here
  const [modalVisible, setModalVisible] = useState(false);
  const [centerCoordinates, setCenterCoordinates] = useState([73.98100068685548, 15.423282817707287]);
  const [coordinates, setCoordinates] = useState([]);
  const {userCurrentLocation,setUserCurrentLocation,radius,userHomeLocation,setRadius,setUserHomeLocation} = useLogin();
  const [locationToggle,setLocationToggle] = useState(false);
  const [locRadius,setLocRadius] = useState(0);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    setLoading(true);
    fetchUserCoodinates();
    setLocRadius(`${radius}`);
    drawCircumference();
    setLoading(false);
  },[]);

  const fetchUserCoodinates = async()=>{
    setInterval(async() => {
      const res = await firestore().collection('Users').doc(code).get();
      const tempCoordinates = res._data.userLocation;
      setUserCurrentLocation([tempCoordinates.longitude,tempCoordinates.latitude]);
      console.log(1);
    }, 15000);
  }
  useEffect(()=>{
    if (coordinates.length>0) {
      drawCircumference();
    }
  },[centerCoordinates,userHomeLocation,locRadius,radius]);
  const handleSubmit = async() => {
    console.log('Radius:', locRadius);
    try {
      await AsyncStorage.setItem('radius', locRadius);
      await AsyncStorage.setItem('userHomeLocation', JSON.stringify(centerCoordinates));
      drawCircumference();
      setRadius(locRadius);
      setUserHomeLocation(centerCoordinates);
      await firestore().collection('Users').doc(code).update({radius:locRadius,homeLocation:{latitude:centerCoordinates[1],longitude:centerCoordinates[0]}});
    } catch (error) {
      console.log(error);
    }
    setModalVisible(!modalVisible);
  };
  const handleMapPress = (event) => {
    setCenterCoordinates(event.geometry.coordinates);
  };

  const drawCircumference = () => {
    const numPoints = 360;
    const points = [];
  
    // Convert radius to meters
    const radiusMeters = parseFloat(radius)*1000;
  
    for (let i = 0; i < numPoints; i++) {
      const angle = (Math.PI / 180) * (i * (360 / numPoints));
      const latitude = centerCoordinates[1] + (radiusMeters / 111111) * Math.cos(angle);
      const longitude = centerCoordinates[0] + (radiusMeters / (111111 * Math.cos(centerCoordinates[1]))) * Math.sin(angle);
      points.push([longitude, latitude]);
    }
    // console.log('Circumference Points:', points);
    setCoordinates(points);
  };

  if(loading){
    return(
      <Loading/>
    );
  }
  
  const handleRightImagePress = () => {
    // Add functionality for right image press
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
        <View style={styles.topMenu}>
          <TouchableOpacity onPress={toggleService}>
            <Image
              source={imageSource}
              style={styles.menuImage}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRightImagePress}>
            <Image
              source={require('../assets/CAllButton.png')} 
              style={[styles.menuImage, {width: 160, bottom: 7, height: 52.4}]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.box}>
          <TouchableOpacity style={styles.modalButton1} disabled={locationToggle} onPress={() => setModalVisible(true)}>
            <Text style={styles.modalButtonText}>Set Radius</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton2} onPress={() => setLocationToggle((prev)=>!prev)}>
            <Text style={styles.modalButtonText}>{locationToggle?"Lock":"Set"} Center</Text>
          </TouchableOpacity>
          <View style={{ flex: 1,height:100,width:400}}>
      <MapView
        style={{ flex: 1, marginHorizontal:40,marginTop:20,marginBottom:20}}
        onPress={locationToggle && handleMapPress}
      >
        {centerCoordinates && (
          <Mapbox.PointAnnotation
            id="center"
            coordinate={centerCoordinates}
            />
            )}
        {userCurrentLocation[0]!==0 && userCurrentLocation[1]!==0 && 
        <Mapbox.PointAnnotation
            id="center"
            coordinate={userCurrentLocation}
          />}
        {coordinates.length > 0 && (
          <ShapeSource id="circumference" style={{zIndex:1}} shape={{ type: 'LineString', coordinates }}>
            <Mapbox.LineLayer
              id="circumferenceLayer"
              style={{ lineDasharray: [2, 2], lineWidth: 2, lineColor: '#ff0000'}}
            />
          </ShapeSource>
        )}
        <Camera
          zoomLevel={15}
          centerCoordinate={centerCoordinates}
        />
      </MapView>
    </View>
          <TouchableOpacity style={styles.navigationButton}>
            <Text onPress={()=>Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${userCurrentLocation[1]},${userCurrentLocation[0]}`)} style={styles.navigationButtonText}>Navigate</Text>
          
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Set Location (in kms)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter radius"
              placeholderTextColor="lightgray"
              keyboardType='number-pad'
              value={locRadius}
              onChangeText={setLocRadius}
            />
            <Button title="Submit" disabled={!centerCoordinates || !locRadius} onPress={() => handleSubmit()} />
          </View>
        </Modal>
      <NavigationBar navigation={navigation} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  },
  gradient: {
    flex: 1,
  },
  box: {
    height: '78%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    paddingBottom: 20,
    margin: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: -15,
  },
  image: {
    width: '100%',
    height: '88%',
    resizeMode: 'contain',
    alignContent: 'center',
    zIndex:-1,
  },
  modalButton1: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: '#2990e0',
    borderRadius: 5,
    zIndex:1
  },
  menuImage: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  topMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: -20,
  },
  modalButton2: {
    position: 'absolute',
    top: 90,
    right: 20,
    padding: 10,
    backgroundColor: '#2990e0',
    borderRadius: 5,
    zIndex:1
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  navigationButton: {
    backgroundColor: 'rgba(246,144,56,1)',
    paddingVertical: 18,
    paddingHorizontal: 15,
    borderRadius: 10,
    width: '80%',
    marginTop: 0,
    marginHorizontal: 50,
    marginBottom: 22,
  },
  navigationButtonText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
  modalView: {
    marginTop: 'auto',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    fontSize: 18,
    color: 'black',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'gray',
  },
  navbarContainer: {
    alignItems: 'center',
  },
  navbar: {
    alignSelf: 'flex-end',
  },
});

export default Maps;