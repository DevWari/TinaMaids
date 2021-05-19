import React, { Component } from 'react';
import {
  StyleSheet,   // CSS-like styles
  Text,         // Renders text
  View,          // Container component
  ImageBackground,
  Image,
} from 'react-native';
import {Colors} from 'src/theme';
import Swiper from './Swiper';

export default class Screens extends Component {
  render() {
    return (
      <Swiper>
        {/* First screen */}
        <ImageBackground source={require('src/assets/img/onboard/intro-bg.png')}  style={styles.slide}>
          <View style={{alignItems: 'center', marginTop: 60}}>
            <Image source={require('src/assets/img/onboard/icon1.png')} />
            <Text style={styles.header}>Describe your home</Text>
          </View>
          <Text style={styles.text}>Tell us more about your home and your cleaning. You will receive an estimate in minutes!</Text>
        </ImageBackground>
        {/* Second screen */}
        <ImageBackground source={require('src/assets/img/onboard/intro-bg.png')}  style={styles.slide}>
          <View style={{alignItems: 'center', marginTop: 60}}>
            <Image source={require('src/assets/img/onboard/icon2.png')} />
            <Text style={styles.header}>Schedule your cleaning</Text>
          </View>
          <Text style={styles.text}>Select from avaiable dates and times to have our maids clean your home</Text>
        </ImageBackground>
        {/* Third screen */}
        <ImageBackground source={require('src/assets/img/onboard/intro-bg.png')}  style={styles.slide}>
          <View style={{alignItems: 'center', marginTop: 60}}>
            <Image source={require('src/assets/img/onboard/icon3.png')} />
            <Text style={styles.header}>Clean your home!</Text>
          </View>
          <Text style={styles.text}>After your home is cleaned and you're 100% satisfied, your card is charged</Text>
        </ImageBackground>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  // Slide styles
  slide: {
    flex: 1,                    // Take up all screen
    alignItems: 'center',       // Center horizontally
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  // Header styles
  header: {
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    width: '100%'
  },
  // Text below header
  text: {
    color: Colors.textColor,
    fontSize: 25,
    marginHorizontal: 15,
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 170,
  },
});