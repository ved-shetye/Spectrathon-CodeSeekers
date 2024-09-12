import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const FallAlert = () => {


  const circleScales = [
    new Animated.Value(2), // Scale for the outermost circle
    new Animated.Value(2), // Scale for the second outer circle
    new Animated.Value(2), // Scale for the third outer circle
    new Animated.Value(2), // Scale for the innermost circle
  ];

  const delays = [1500, 1000, 500, 0]; // Delays for each circle animation

  useEffect(() => {
    const animateCircles = () => {
      circleScales.forEach((circleScale, index) => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(circleScale, {
              toValue: 3.5,
              duration: 2000,
              delay: delays[index],
              useNativeDriver: true,
            }),
            Animated.timing(circleScale, {
              toValue: 2,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
        ).start();
      });
    };

    animateCircles();

    return () => {
      circleScales.forEach(circleScale => circleScale.removeAllListeners());
    };
  }, []);

  return (
    <LinearGradient
      colors={['rgba(242,111,96,1)', 'rgba(246,144,56,1)']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0.3535, 0.9548]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        {/* Animated circles */}
        {circleScales.map((circleScale, index) => (
          <Animated.View
            key={index}
            style={[
              styles.circle,
              { transform: [{ scale: circleScale }] },
              index === 0 ? styles.circleOne : null,
              index === 1 ? styles.circleTwo : null,
              index === 2 ? styles.circleThree : null,
              index === 3 ? styles.circleFour : null,
            ]}
          />
        ))}

        <Text style={[styles.alertText]}>Fall Detected!</Text>
        {/* <SvgXml xml={CircleEffectSvg} width={400} height={400} style={styles.icon} /> */}
        <Image source={require('../assets/man.png')} style={styles.image} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Cancel button pressed')}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
    position: 'relative', // Added for positioning the circles
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: '5%',
  },
  image: {
    width: 150,
    height: 150,
    zIndex: 100,
    position: 'absolute',
    top: '65%',
  },
  alertText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    zIndex: 100,
    position: 'absolute',
    top: '20%',
  },
  button: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 50,
    marginTop: 50,
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'rgba(242,111,97,1)',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    top: '70%',
    backgroundColor: 'white',
    opacity: 0.4,
    boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)',
    zIndex: -1,
  },
  circleOne: {
    // left: '40%',
  },
  circleTwo: {
    // left: '30%',
  },
  circleThree: {
    // left: '20%',
  },
  circleFour: {
    // left: '10%',
  },
});

export default FallAlert;
