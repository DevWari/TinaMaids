import AsyncStorage from '@react-native-community/async-storage';
import OneSignal from 'react-native-onesignal';

export async function removeStorage () {
    console.log ("remove storage....")
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('user_type');
      await AsyncStorage.removeItem('user_hash');
      OneSignal.sendTags({'myid': "", "type": ""});
    }
    catch(exception) {
        console.log ("error storage")
    }    
    return
}

export async function replaceToken (token) {
    console.log("replace token...", token)
    try {
        await AsyncStorage.setItem("userToken", token)
    }
    catch(exception) {
        console.log ("error storage")
    }  
    return;
}
