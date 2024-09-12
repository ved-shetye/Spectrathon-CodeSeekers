import React,{useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './navigation/AppNavigation';
import LoginProvider from './context/LoginProvider';
import {LogBox} from 'react-native';
import NavigationBar from "./components/NavigationBar"
import PushNotification from 'react-native-push-notification';
LogBox.ignoreLogs(['new NativeEventEmitter']);

const App = () => {
  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: 'medication-channel', // Channel ID
        channelName: 'Medication Channel', // Channel Name
        channelDescription: 'Channel for medication reminders', // Channel Description
        playSound: true,
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      created => console.log(`createChannel returned '${created}'`), // callback function
    );
    PushNotification.createChannel(
      {
        channelId: 'Caretaker-alert', // Channel ID
        channelName: 'Caretaker-alert', // Channel Name
        channelDescription: 'Channel for fall/out of bound alerts', // Channel Description
        playSound: true,
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      created => console.log(`createChannel returned '${created}'`), // callback function
    );
    PushNotification.createChannel(
      {
        channelId: 'User-alert', // Channel ID
        channelName: 'User-alert', // Channel Name
        channelDescription: 'You have have been notified', // Channel Description
        playSound: true,
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      created => console.log(`createChannel returned '${created}'`), // callback function
    );

    
  }, []);
  return (
    <LoginProvider>
    <NavigationContainer>
      <AppNavigation/>
    </NavigationContainer>
    </LoginProvider>
  );
};

export default App;
