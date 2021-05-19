import React from 'react'
import {
  View,
  ActivityIndicator,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
class AuthLoadingScreen extends React.Component {
    constructor() {
      super();
      this._bootstrapAsync();
    }
    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };
  
    // Render any loading content that you like here
    render() {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }
  }
  export default AuthLoadingScreen