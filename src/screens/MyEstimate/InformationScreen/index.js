import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert} from 'react-native';
import styled from 'styled-components/native';
import { Colors } from 'src/theme';
import { navigate } from 'src/utils/navigation';
import Menu from 'src/components/Menu'
import EstimateHeader from 'src/components/EstimateHeader';
import {connect} from 'react-redux';
import {CreateNewInfoAction} from 'src/store/NewEstimate/action';
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const InformationScreen = (props) => {

  const [name, setName] = useState('')
  const [email, setEmail]  = useState('')
  const [phone, setPhone] = useState('')

  function validateEmail (email) {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
    return expression.test(String(email).toLowerCase())
  }
  useEffect (()=>console.log ("Information sacreen"), [])
  function createNewInfo () {
     
     if (name == '') {
       Alert.alert ('Please input your name!')
       return
      }
     else if (!validateEmail(email)) {
       Alert.alert ('Invalid Email, Please input your email again!')
       return
     }
     else if ( phone == '') {
       Alert.alert ('Please input your phone!')
     }
     else {
      const data = {
        name: name,
        email: email,
        phone: phone,
      }
      props.createNewInfo (data)
      navigate('JobScreen')
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
        <Menu title="My Estimates"/>
        <EstimateHeader />  
        <Footer />
        <Title>Step 1 of 4</Title>
        <Content textColor={Colors.textColor}>Your Information</Content>
        <Footer />
        
        <Input 
          placeholderTextColor = "grey"
          placeholder="Full Name"
          onChangeText={text => setName(text)}  
          value={name}
        />
        <Input 
          placeholder="E-Mail"
          placeholderTextColor = "grey"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <Input 
          placeholder="Telephone(Cell)"
          placeholderTextColor = "grey"
          onChangeText={text => setPhone(text)}
          value={phone}
        />
        <SaveButton 
          bgColor = {Colors.textColor}
          onPress={createNewInfo}
        >
          <ButtonTitle>Next</ButtonTitle>
        </SaveButton>
        <Footer />
      </Container>
    </KeyboardAwareScrollView>
  );
};


const mapStateToProps = (state) => {
  return {
    isLoading: state.newEstimate.isLoading,
    status: state.newEstimate.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewInfo: (data) => dispatch(CreateNewInfoAction(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(InformationScreen);

const Container = styled(View)`
  flex: 1;
  align-items: center;
`;
const Title = styled(Text)`
  font-size: 25px;
  flex: 1;
  width: 90%;
  margin-bottom: 10px;
  text-align: center;
`
const Content = styled(Text)`
  font-size: 30px;
  flex: 1;
  width: 90%;
  color: ${props=>props.textColor}
  margin-bottom: 10px;
  text-align: center;
`
const Input = styled(TextInput)`
  width: 90%;
  height: 50px;
  border-radius: 4px;
  border-width: 1px;
  font-size: 20px;
  padding-left: 10px;
  margin-bottom: 20px;
`
const Footer = styled (View)`
  height: 20px;
`
const SaveButton = styled (TouchableOpacity)`
  width: 80%;
  height: 60px;
  border-radius: 6px;
  border-width: 3px;
  background-color: ${props=>props.bgColor};
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`
const ButtonTitle = styled (Text)`
  font-size: 25px;
  color: white;
  height: 30px;
  text-align: center;
`