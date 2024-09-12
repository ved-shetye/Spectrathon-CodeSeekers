import React, { useState ,useEffect} from 'react';
import { View, Text, Button } from 'react-native';
import BackgroundService from 'react-native-background-actions';
import { accelerometer, gyroscope, setUpdateIntervalForType, SensorTypes } from "react-native-sensors";
import { map, filter } from "rxjs/operators";
import PushNotification from 'react-native-push-notification';
import firestore from '@react-native-firebase/firestore';
import { useLogin } from '../../context/LoginProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import UserPage from '../UserPage';

export default function Allbackgroundservices() {

    const [accelSubscription, setAccelSubscription] = useState(null);
    const [gyroSubscription, setGyroSubscription] = useState(null);
    const [latestAcceleration, setLatestAcceleration] = useState({ x: 0, y: 0, z: 0 });
    const [latestGyroscope, setLatestGyroscope] = useState({ x: 0, y: 0, z: 0 });
    const [temp,setTemp] = useState(true);
    const {code} = useLogin();
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState(''); 
    
    const handleCancel = async()=>{
      await AsyncStorage.removeItem('detectedKey');
      navigation.navigate("UserHome");
    }
    // Fall detection alert task in background
    const startBackgroundService = async () => {
      const veryIntensiveTask = async (taskDataArguments) => {
        const { delay } = taskDataArguments;
        setUpdateIntervalForType(SensorTypes.accelerometer, 400); // defaults to 100ms
        setUpdateIntervalForType(SensorTypes.gyroscope, 400); // defaults to 100ms
  
        const accelSub = accelerometer
          .pipe(
            map(({ x, y, z }) => ({ x, y, z })),
            filter(({ x, y, z }) => Math.sqrt(x * x + y * y + z * z) > 0.1)
          )
          .subscribe(
            acceleration => {
              if (detectFall(acceleration, latestGyroscope)) {
                console.log('Fall detected 1');
                AsyncStorage.setItem('detectedKey', "1")
                setTimeout(async() => {
                  if (await AsyncStorage.getItem('detectedKey')) {
                    try {
                      if(temp){
                        const res = await firestore().collection('Users').doc(code).update({'fallDetected': true})
                        console.log('Fall send');
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  }
                  else {
                    console.log("Fall Cancelled");
                  }
                }, 20000);
                showNotification();
              }
              console.log(`______`);
              // console.log(`Accelerometer data: x=${acceleration.x}, y=${acceleration.y}, z=${acceleration.z}`);
              setLatestAcceleration(acceleration);
            },
            error => {
              console.log("Error reading accelerometer data:", error);
            }
          );
  
        const gyroSub = gyroscope
          .pipe(
            map(({ x, y, z }) => ({ x, y, z }))
          )
          .subscribe(
            gyro => {
              // console.log(`Gyroscope data: x=${gyro.x}, y=${gyro.y}, z=${gyro.z}`);
              console.log(`______`);
              setLatestGyroscope(gyro);
            },
            error => {
              console.log("Error reading gyroscope data:", error);
            }
          );
  
        setAccelSubscription(accelSub);
        setGyroSubscription(gyroSub);
  
        await new Promise(async (resolve) => {
          for (let i = 0; BackgroundService.isRunning(); i++) {
            await sleep(delay);
          }
        });
  
        return () => {
          if (accelSub) {
            accelSub.unsubscribe();
            setAccelSubscription(null);
          }
          if (gyroSub) {
            gyroSub.unsubscribe();
            setGyroSubscription(null);
          }
        };
      };
  
      const detectFall = (acceleration, gyroscope) => {
        // Calculate the magnitude of acceleration
        const accelerationMagnitude = Math.sqrt(
          acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2
        );
      
        // Define threshold values for fall detection
        const accelerationThreshold = 30; // Adjust as needed
        const gyroThreshold = 20; // Adjust as needed
      
        // Check if the magnitude exceeds the acceleration threshold
        if (accelerationMagnitude > accelerationThreshold) {
          // Check gyroscope data to further refine fall detection
          const gyroMagnitude = Math.sqrt(
            gyroscope.x ** 2 + gyroscope.y ** 2 + gyroscope.z ** 2
          );
      
          // Check if gyroscope magnitude is below the threshold
          if (gyroMagnitude < gyroThreshold) {
            // Potential fall detected
            return true;
          }
        }
      
        // No fall detected
        return false;
      };
  
      const showNotification = () => {
        PushNotification.localNotification({
          channelId: "Caretaker-alert", // Channel ID
          title: 'Accidental Fall',
          message: 'If your phone has accidently fallen then click the notification',
          // data:{screen:"FallDetection"}
          // onPress:navigation.navigate("FallAlert")
        });
      };
  
      const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));
  
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
  
      await BackgroundService.start(veryIntensiveTask, options);
    };
  
    const stopBackgroundService = async () => {
      await BackgroundService.stop();
      if (accelSubscription) {
        accelSubscription.unsubscribe();
        setAccelSubscription(null);
      }
      if (gyroSubscription) {
        gyroSubscription.unsubscribe();
        setGyroSubscription(null);
      }
    };

      // Function to fetch current location
      const getCurrentLocation = () => {
          return new Promise((resolve, reject) => {
              Geolocation.getCurrentPosition(
                  position => {
                      const { latitude, longitude } = position.coords;
                      resolve({ latitude, longitude });
                  },
                  error => {
                      reject(error.message);
                  }
              );
          });
      };
  
      // Task to run in the background
      const veryIntensiveTask = async (taskDataArguments) => {
          const { delay } = taskDataArguments;
          try {
              for (let i = 0; BackgroundService.isRunning(); i++) {
                  const location = await getCurrentLocation();
  
                  if (i%15===0 && i>14) {
                      try {
                          await firestore().collection('Users').doc(code).update({userLocation:{latitude:location.latitude,longitude:location.longitude}});
                          const res = await firestore().collection('Users').doc(code).get();
                          const tempRadius = res._data.radius;
                          const centreLocation = [res._data.homeLocation.latitude,res._data.homeLocation.longitude];
                          console.log("Location Updated");
                          // console.log(centreLocation);
                          const distance = calculateDistance(location.latitude, location.longitude, centreLocation[0], centreLocation[1]);
                          if (distance>tempRadius) {
                            console.log("User out of bound");
                            await firestore().collection('Users').doc(code).update({boundStatus:true});
                            outofboundshowNotification();
                          }
                          else {
                            console.log("User inside bound");
                            await firestore().collection('Users').doc(code).update({boundStatus:false});
                          }

                      } catch (error) {
                          console.log(error);
                      }
                  }
                  console.log('Latitude:', location.latitude, 'Longitude:', location.longitude);
                  await BackgroundService.updateNotification({
                      taskDesc: `Latitude: ${location.latitude}, Longitude: ${location.longitude}`
                  });
                  await sleep(delay);
              }
          } catch (error) {
              console.error('Error fetching location:', error);
          }
      };
  
      const options = {
          taskName: 'BackgroundLocationTask',
          taskTitle: 'Background Location',
          taskDesc: 'Running background location updates',
          taskIcon: {
              name: 'ic_launcher',
              type: 'mipmap',
          },
          color: '#ff00ff',
          parameters: {
              delay: 1000, // 1 minute delay
          },
      };
  
      const outofboundshowNotification = () => {
        PushNotification.localNotification({
          channelId: "User-alert", // Channel ID
          title: 'you have gone out of the marked area to return',
          message: "If you're trying to find your way back home open the app",
          // data:{screen:"FallDetection"}
          // onPress:navigation.navigate("FallAlert")
        });
      };
      const startBackgroundService1 = async () => {
          await BackgroundService.start(veryIntensiveTask, options);
      };
  
      const stopBackgroundService1 = async () => {
          await BackgroundService.stop(veryIntensiveTask, options);
      };

      //Function for medication timer
  // Function to fetch data from Firestore
  const fetchUserData = async () => {
    try {
      const user = await firestore().collection('Users').doc(code).get();
      setMinutes(user._data.min);
      setHours(user._data.hours);
      
    } catch (error) {
      console.log(error);
    }
  };

 //function for outOfboundLogic
  const toRadians = (degrees) => {
    return degrees * Math.PI / 180;
  }

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    let earthRadiusKm = 6371; // Radius of the earth in kilometers
  
    let dLat = toRadians(lat2-lat1);  // Difference in latitude, convert from degrees to radians
    let dLon = toRadians(lon2-lon1);  // Difference in longitude, convert from degrees to radians
  
    lat1 = toRadians(lat1);
    lat2 = toRadians(lat2);
  
    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    let distance = earthRadiusKm * c; // Distance in km
  
    return distance;
  }

  // useEffect to trigger data fetch on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));
  let count=0;
  // Background task function
  const veryIntensiveTask1 = async (taskDataArguments) => {
    const { delay } = taskDataArguments;
    await new Promise(async (resolve) => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        if(i<1){
        await fetchUserData(); // Fetch user data in each iteration
        }
        
        const currentDate = new Date();
        const currentHours = currentDate.getHours();
        const currentMinutes = currentDate.getMinutes();
        console.log(`${hours}:${minutes}`);
        if (hours - currentHours === 0 && minutes - currentMinutes === 0 && count == 0) {
          showNotification(); // Show notification when hours and minutes become zero
          count++
        }
        await sleep(delay);
      }
    });
  };

  const showNotification = () => {
    PushNotification.localNotification({
      channelId: "medication-channel", // Channel ID
      title: 'Medication Reminder',
      message: 'Time to take your medication!',
      actions: ['Take Medication'], // Button label
    });
  };


  // Function to start background service
  const startBackgroundService2 = async () => {
    await BackgroundService.start(veryIntensiveTask1, options);
  };

  // Function to stop background service
  const stopBackgroundService2 = async () => {
    await BackgroundService.stop(veryIntensiveTask1, options);
  };


      // For running all the services
      const startAllBackgroundServices = async () => {
        await Promise.all([startBackgroundService(), startBackgroundService1(),startBackgroundService2()]);
      };
      
      const stopAllBackgroundServices = async () => {
        await Promise.all([stopBackgroundService(), stopBackgroundService1(),stopBackgroundService2()]);
      };
      
  return (
    <View>
       <Text>Allbackgroundservices</Text>
      <Button title="Start All Background Services" onPress={startAllBackgroundServices} />
      <Button title="Stop All Background Services" onPress={stopAllBackgroundServices} />
      <UserPage/>
    </View>
  )
}