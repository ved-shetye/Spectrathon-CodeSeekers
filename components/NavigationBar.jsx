import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

// Define your SVG strings
const HealthIconSvg = `
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   viewBox="0 0 266.66666 266.66666"
   height="300"
   width="300"
   xml:space="preserve"
   id="svg2"
   version="1.1"><metadata
     id="metadata8"><rdf:RDF><cc:Work
         rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" /></cc:Work></rdf:RDF></metadata><defs
     id="defs6"><linearGradient
       id="linearGradient30"
       spreadMethod="pad"
       gradientTransform="matrix(190,0,0,-190,5,100)"
       gradientUnits="userSpaceOnUse"
       y2="0"
       x2="1"
       y1="0"
       x1="0"><stop
         id="stop24"
         offset="0"
         style="stop-opacity:1;stop-color:#f26f61" /><stop
         id="stop26"
         offset="0.00302484"
         style="stop-opacity:1;stop-color:#f26f61" /><stop
         id="stop28"
         offset="1"
         style="stop-opacity:1;stop-color:#f58e58" /></linearGradient></defs><g
     transform="matrix(1.3333333,0,0,-1.3333333,0,266.66667)"
     id="g10"><g
       id="g12"><g
         id="g14"><g
           id="g20"><g
             id="g22"><path
               id="path32"
               style="fill:url(#linearGradient30);stroke:none"
               d="M 20.302,170.946 C 12.908,164.005 7.799,155.598 5.812,145.499 v 0 c -0.204,-1.039 -0.371,-2.087 -0.559,-3.13 v 0 c -0.005,-0.03 -0.073,-0.081 -0.082,-0.075 v 0 c -0.062,0.04 -0.115,0.092 -0.171,0.141 v 0 -12.825 c 0.515,0.184 0.404,-0.256 0.431,-0.474 v 0 c 1.105,-9.189 4.81,-17.461 8.988,-25.57 v 0 c 0.238,-0.464 0.523,-0.604 1.014,-0.601 v 0 c 9.975,0.058 19.95,0.111 29.924,0.136 v 0 c 0.665,0.002 0.878,0.374 1.121,0.842 v 0 c 3.244,6.237 6.476,12.481 9.748,18.705 v 0 c 3.124,5.944 6.28,11.872 9.443,17.796 v 0 c 1.828,3.424 5.376,5.027 9.317,4.262 v 0 c 3.924,-0.762 6.51,-3.46 6.916,-7.386 v 0 c 1.079,-10.426 2.106,-20.858 3.161,-31.287 v 0 c 0.541,-5.353 1.095,-10.704 1.656,-16.054 v 0 c 0.053,-0.498 0.201,-0.987 0.311,-1.514 v 0 c 0.499,0.073 0.524,0.487 0.676,0.766 v 0 c 1.47,2.708 2.896,5.44 4.404,8.126 v 0 c 1.43,2.549 3.356,4.561 6.447,4.879 v 0 c 1.965,0.201 3.952,0.247 5.929,0.248 v 0 c 4.531,0.003 9.063,-0.008 13.596,-0.018 v 0 c 7.222,-0.015 14.447,-0.032 21.67,0.004 v 0 c 6.016,0.03 12.028,-0.097 18.041,-0.179 v 0 c 2.373,-0.033 4.736,-0.061 6.771,-1.648 v 0 c 2.746,-2.14 3.68,-4.996 3.29,-8.294 v 0 c -0.402,-3.395 -2.367,-5.767 -5.535,-6.952 v 0 c -1.51,-0.564 -3.132,-0.525 -4.743,-0.486 v 0 c -0.462,0.011 -0.923,0.023 -1.38,0.02 v 0 c -16.501,-0.096 -33.001,-0.175 -49.504,-0.217 v 0 c -1.02,-0.003 -1.504,-0.335 -1.963,-1.232 v 0 C 99.572,73.388 94.533,63.231 89.042,53.31 v 0 C 87.713,50.909 86.1,48.946 83.236,48.313 v 0 C 77.732,47.096 73.195,50.187 72.44,55.75 v 0 c -1.026,7.569 -1.614,15.182 -2.375,22.777 v 0 c -0.871,8.697 -1.749,17.396 -2.629,26.093 v 0 c -0.006,0.06 -0.074,0.114 -0.162,0.242 v 0 c -0.512,-0.41 -0.743,-0.994 -1.033,-1.53 v 0 C 64.027,99.23 61.839,95.115 59.595,91.029 v 0 C 58.816,89.607 57.897,88.26 56.642,87.195 v 0 C 55.524,86.243 54.238,85.74 52.753,85.662 v 0 C 47.299,85.374 41.843,85.405 36.387,85.435 v 0 c -2.934,0.016 -5.867,0.033 -8.8,0 v 0 C 27.164,85.431 26.741,85.434 26.03,85.434 v 0 c 1.829,-2.374 3.46,-4.586 5.188,-6.721 v 0 C 45.941,60.525 62.27,43.965 80.95,29.8 v 0 c 5.176,-3.925 10.607,-7.444 16.569,-10.096 v 0 c 1.057,-0.469 1.914,-0.54 2.987,0 v 0 c 8.866,4.464 16.986,10.085 24.912,16.002 v 0 c 15.278,11.405 29.189,24.319 41.707,38.68 v 0 c 9.606,11.022 17.706,23.072 23.161,36.749 v 0 c 2.088,5.232 3.62,10.612 4.271,16.223 v 0 c 0.027,0.227 0.122,0.446 0.191,0.665 v 0 c 0.01,0.033 0.076,0.079 0.084,0.074 v 0 c 0.06,-0.044 0.113,-0.098 0.168,-0.149 v 0 12.112 c -0.673,-0.075 -0.411,0.488 -0.445,0.745 v 0 c -1.619,12.065 -7.131,22.127 -16.039,30.258 v 0 c -7.068,6.45 -15.642,9.214 -25.165,8.977 v 0 c -15.157,-0.378 -27.956,-6.555 -39.337,-16.151 v 0 c -4.924,-4.152 -9.298,-8.815 -13.064,-14.044 v 0 c -0.229,-0.319 -0.482,-0.62 -0.796,-1.023 v 0 c -1.167,1.287 -2.285,2.537 -3.42,3.772 v 0 c -6.101,6.637 -12.715,12.72 -20.3,17.61 v 0 c -7.345,4.735 -15.175,8.474 -23.93,9.862 v 0 c -2.535,0.401 -5.019,0.609 -7.447,0.609 v 0 c -9.193,0 -17.569,-2.983 -24.755,-9.729" /></g></g></g></g></g></svg>
`;

const LocateIconSvg = `
  <svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   viewBox="0 0 266.66666 266.66666"
   height="266.66666"
   width="266.66666"
   xml:space="preserve"
   id="svg2"
   version="1.1"><metadata
     id="metadata8"><rdf:RDF><cc:Work
         rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" /></cc:Work></rdf:RDF></metadata><defs
     id="defs6"><linearGradient
       id="linearGradient30"
       spreadMethod="pad"
       gradientTransform="matrix(135.912,0,0,-135.912,32.043995,100)"
       gradientUnits="userSpaceOnUse"
       y2="0"
       x2="1"
       y1="0"
       x1="0"><stop
         id="stop24"
         offset="0"
         style="stop-opacity:1;stop-color:#f26f61" /><stop
         id="stop26"
         offset="0.00302484"
         style="stop-opacity:1;stop-color:#f26f61" /><stop
         id="stop28"
         offset="1"
         style="stop-opacity:1;stop-color:#f58e58" /></linearGradient></defs><g
     transform="matrix(1.3333333,0,0,-1.3333333,0,266.66667)"
     id="g10"><g
       id="g12"><g
         id="g14"><g
           id="g20"><g
             id="g22"><path
               id="path32"
               style="fill:url(#linearGradient30);stroke:none"
               d="M 39.392,96.47 74.263,21.421 c 10.18,-21.911 41.309,-21.879 51.473,0 v 0 l 34.873,75.051 C 183.319,141.323 150.657,195 100,195 v 0 C 49.332,195 16.682,141.311 39.392,96.47 m 39.375,30.633 c 0,11.707 9.526,21.231 21.233,21.231 v 0 c 11.708,0 21.233,-9.524 21.233,-21.231 v 0 c 0,-11.708 -9.525,-21.231 -21.233,-21.231 v 0 c -11.707,0 -21.233,9.523 -21.233,21.231" /></g></g></g></g></g></svg>
`;

const ProfileIconSvg = `
  <svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   viewBox="0 0 266.66666 266.66666"
   height="266.66666"
   width="266.66666"
   xml:space="preserve"
   id="svg2"
   version="1.1"><metadata
     id="metadata8"><rdf:RDF><cc:Work
         rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" /></cc:Work></rdf:RDF></metadata><defs
     id="defs6"><linearGradient
       id="linearGradient30"
       spreadMethod="pad"
       gradientTransform="matrix(91.525871,0,0,-91.525871,53.038387,149.23851)"
       gradientUnits="userSpaceOnUse"
       y2="0"
       x2="1"
       y1="0"
       x1="0"><stop
         id="stop24"
         offset="0"
         style="stop-opacity:1;stop-color:#f26f61" /><stop
         id="stop26"
         offset="0.00302484"
         style="stop-opacity:1;stop-color:#f26f61" /><stop
         id="stop28"
         offset="1"
         style="stop-opacity:1;stop-color:#f58e58" /></linearGradient><linearGradient
       id="linearGradient52"
       spreadMethod="pad"
       gradientTransform="matrix(158.51521,0,0,-158.51521,20.742395,54.111534)"
       gradientUnits="userSpaceOnUse"
       y2="0"
       x2="1"
       y1="0"
       x1="0"><stop
         id="stop46"
         offset="0"
         style="stop-opacity:1;stop-color:#f26f61" /><stop
         id="stop48"
         offset="0.00302484"
         style="stop-opacity:1;stop-color:#f26f61" /><stop
         id="stop50"
         offset="1"
         style="stop-opacity:1;stop-color:#f58e58" /></linearGradient></defs><g
     transform="matrix(1.3333333,0,0,-1.3333333,0,266.66667)"
     id="g10"><g
       id="g12"><g
         id="g14"><g
           id="g20"><g
             id="g22"><path
               id="path32"
               style="fill:url(#linearGradient30);stroke:none"
               d="M 66.446,181.594 C 57.549,172.698 53.039,161.812 53.039,149.24 v 0 c 0,-12.574 4.51,-23.461 13.408,-32.357 v 0 c 8.897,-8.894 19.785,-13.406 32.354,-13.406 v 0 c 12.573,0 23.461,4.51 32.357,13.407 v 0 c 8.895,8.896 13.406,19.782 13.406,32.356 v 0 c 0,12.57 -4.511,23.457 -13.407,32.355 v 0 C 122.26,190.491 111.373,195 98.801,195 v 0 c -12.574,0 -23.459,-4.509 -32.355,-13.406" /></g></g></g></g><g
       id="g34"><g
         id="g36"><g
           id="g42"><g
             id="g44"><path
               id="path54"
               style="fill:url(#linearGradient52);stroke:none"
               d="M 48.803,100.737 C 44.626,99.083 41.009,96.811 38.054,93.983 v 0 c -2.822,-2.701 -5.341,-5.981 -7.48,-9.748 v 0 c -2.062,-3.632 -3.732,-7.418 -4.961,-11.26 v 0 C 24.425,69.263 23.433,65.202 22.66,60.907 v 0 C 21.898,56.648 21.378,52.608 21.121,48.896 v 0 C 20.87,45.262 20.742,41.488 20.742,37.676 v 0 c 0,-9.917 3.152,-17.946 9.369,-23.867 v 0 C 36.252,7.965 44.378,5 54.257,5 v 0 h 91.485 c 9.88,0 18.002,2.963 24.146,8.809 v 0 c 6.218,5.916 9.369,13.947 9.369,23.869 v 0 c 0,3.829 -0.13,7.606 -0.383,11.224 v 0 c -0.256,3.701 -0.777,7.739 -1.539,12.005 v 0 c -0.772,4.295 -1.765,8.357 -2.953,12.07 v 0 c -1.227,3.837 -2.899,7.626 -4.962,11.258 v 0 c -2.141,3.768 -4.66,7.049 -7.482,9.749 v 0 c -2.954,2.826 -6.568,5.098 -10.75,6.755 v 0 c -4.166,1.649 -8.782,2.483 -13.721,2.483 v 0 c -1.94,0 -3.815,-0.796 -7.438,-3.154 v 0 c -2.229,-1.454 -4.836,-3.135 -7.748,-4.995 v 0 c -2.488,-1.585 -5.861,-3.072 -10.024,-4.417 v 0 c -4.064,-1.315 -8.19,-1.983 -12.262,-1.983 v 0 c -4.071,0 -8.196,0.668 -12.263,1.983 v 0 C 83.573,92 80.2,93.486 77.714,95.072 v 0 c -2.883,1.841 -5.493,3.524 -7.755,4.998 v 0 c -3.617,2.358 -5.496,3.153 -7.434,3.153 v 0 c -4.941,0 -9.556,-0.835 -13.722,-2.486" /></g></g></g></g></g></svg>
`;


const NavigationBar = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Medication')} >
          <SvgXml xml={HealthIconSvg} width="24" height="24" style={styles.icon} />
          <Text style={styles.text}>Health</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Maps')} >
          <SvgXml xml={LocateIconSvg} width="24" height="24" style={styles.icon} />
          <Text style={styles.text}>Locate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} >
          <SvgXml xml={ProfileIconSvg} width="24" height="24" style={styles.icon} />
          <Text style={styles.text}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
    // borderTopLeftRadius:10,
    // borderTopRightRadius:10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: '#FFA500',
    fontSize: 14, // Adjust text size
  },
  icon: {
    marginBottom: 8, // Add margin to create space between icon and text
  },
});

export default NavigationBar;
