/**
 * Button component
 * Renders a button and calls a function passed via onPress prop once tapped
 */

import React, { Component } from 'react';
import {
  StyleSheet,       // CSS-like styles
  Text,             // Renders text
  TouchableOpacity, // Pressable container
  View              // Container component
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import {Colors} from 'src/theme'
import {navigate} from 'src/utils/navigation'
export default class Button extends Component {
  render({ onPress } = this.props) {
    return (
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.button}
          onPress={()=>navigate('LoginScreen')} 
        >
           <Text style={styles.text}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={onPress}
        >
           <Text style={styles.text}>Next</Text>
           <Icon name='chevron-right'  size={30} style={{fontWeight: 'bold'}} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Button container
  button: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  // Button text
  text: {
    height: 35, 
    fontSize: 22, 
    marginRight: 2,     
  },
  container: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 3,
    borderColor: 'black',
    paddingHorizontal: 20,
  }
});