import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert} from 'react-native';
import styled from 'styled-components/native';
import { Colors } from 'src/theme';
import { navigate } from 'src/utils/navigation';
import Menu from 'src/components/Menu';
import { connect } from 'react-redux';
import { SendContactAction, InitStatustAction } from 'src/store/Contact/action'
import Spinner from 'react-native-loading-spinner-overlay';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

const SpeakScreen = (props) => {
  
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [phone, setPhone] = useState(null)
  const [address, setAddress] = useState(null)
  const [state, setStates] = useState(null)
  const [zip, setZip] = useState(null)
  const [city, setCity] = useState(null)
  const [message, setMessage] = useState(null)
  
  useEffect (()=> {
    if (props.status == 1) {
      props.initStatus()
      Alert.alert("Saved successfully!")
    }
    else if (props.status && props.status == -1) {
      props.initStatus()
      Alert.alert("Save Error!")
    }
    else {console.log("saving.....")}

    if (!props.token) navigate('LoginScreen')

  }, [props.status, props.token])
  

  function validateEmail (email) {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
    return expression.test(String(email).toLowerCase())
  }
  function sendContact () {

    if (!name) {
      Alert.alert("Please input your name!")
      return
    }
    else if (!validateEmail(email)) {
      Alert.alert("Invalid email.Please input your email!")
      return
    }
    else if (!phone) {
      Alert.alert('Please input your phone!')
      return
    }
    else if (!address) {
      Alert.alert("Please input your address")
      return
    }
    else if (!state) {
      Alert.alert("Please input your state")
      return
    }
    else if (!zip) {
      Alert.alert("Please input your zip")
      return
    }
    else if (!city) {
      Alert.alert("Please input your city")
      return
    }
    else if (!message) {
      Alert.alert("Please input your message!")
      return
    }
    else {
      let data = {
        name: name, 
        email: email, 
        phone: phone, 
        address: address, 
        state: state, 
        zip: zip, 
        city: city,
        message: message,
        source: ''
      }
      console.log ("data....", data)
      props.sendContact (data)
    }
  }
  return (
    <KeyboardAwareScrollView>
      <Spinner 
        visible={props.isLoading}
        textContent={'Loading...'}
        textStyle={{color:'#FFF'}}
      />
      <Container>      
        <Menu title="Speak To Us"/>
        <Footer />
        <InputTitle>Name:</InputTitle>
        <Input 
          placeholder="Jonnas Doe"
          placeholderTextColor = "grey"
          onChangeText={text => setName(text)}
        />
        <InputTitle>Email:</InputTitle>
        <Input 
          placeholder="customer@test.com"
          placeholderTextColor = "grey"
          onChangeText={text => setEmail(text)}
        />
        <InputTitle>Phone:</InputTitle>
        <Input 
          placeholder="000-000-0000"
          placeholderTextColor = "grey"
          onChangeText={text => setPhone(text)}
        />
        <InputTitle>Address:</InputTitle>
        <Input 
          placeholder="Your address"
          placeholderTextColor = "grey"
          onChangeText={text => setAddress(text)}
        />
        <InputTitle>State:</InputTitle>
        <Input 
          placeholder="Florida"
          placeholderTextColor = "grey"
          onChangeText={text => setStates(text)}
        />
        <InputTitle>Branch Location:</InputTitle>
        <Input 
          placeholder="St Augustine"
          placeholderTextColor = "grey"
          onChangeText={text => setCity(text)}
        />
        <InputTitle>Zip:</InputTitle>
        <Input 
          placeholder="32084"
          placeholderTextColor = "grey"
          onChangeText={text => setZip(text)}
        />
        <InputTitle>Message</InputTitle>
        <MessageInput 
          placeholder="Type your message here"
          placeholderTextColor = "grey"
          multiline={true}
          onChangeText={text => setMessage(text)}
        />
        <Footer />
        <SaveButton 
          bgColor = {Colors.textColor}
          // onPress = {()=>navigate('ResultScreen')}
          onPress = {sendContact}
        >
          <ButtonTitle>Send</ButtonTitle>
        </SaveButton>
        <Footer />
      </Container>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.contact.isLoading,
    status: state.contact.status,
    token: state.session.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendContact: (data) => dispatch(SendContactAction(data)),
    initStatus: () => dispatch(InitStatustAction())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SpeakScreen);

const Container = styled(View)`
  flex: 1;
  align-items: center;
`;
const Input = styled(TextInput)`
  width: 90%;
  height: 50px;
  border-radius: 4px;
  border-width: 1px;
  font-size: 20px;
  padding-left: 10px;
  margin-bottom: 10px;
`
const MessageInput = styled(TextInput)`
  width: 90%;
  height: 170px;
  border-radius: 4px;
  border-width: 1px;
  font-size: 20px;
  padding-left: 10px;
  margin-bottom: 10px;
  text-align-vertical: top;
`
const InputTitle = styled(Text)`
  font-size: 20px;
  flex: 1;
  width: 90%
  margin-bottom: 10px;
`
const Footer = styled (View)`
  height: 20px;
`
const SaveButton = styled (TouchableOpacity)`
  width: 60%;
  height: 50px;
  border-radius: 6px;
  border-width: 3px;
  background-color: ${props=>props.bgColor};
  justify-content: center;
  align-items: center;
`
const ButtonTitle = styled (Text)`
  font-size: 20px;
  color: white;
  height: 25px;
  text-align: center;
`