import React, {useState, useEffect} from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ImageBackground, 
  ScrollView,
  Alert
} from 'react-native';
import styled from 'styled-components/native';
import { Colors } from 'src/theme';
import {connect} from 'react-redux';
import {ForgotPasswordAction} from 'src/store/Auth/action';
import {navigate} from 'src/utils/navigation';
import Spinner from 'react-native-loading-spinner-overlay';

const ForgotScreen = (props) => {

  const [email, setEmail] = useState('')
  
  function onContinue () {
    props.forgotPassword(email)
    navigate ("LoginScreen")
  }

  return (
    <BackgroundContainer source={require('src/assets/img/login/bg.png')}>  
      <Spinner 
        visible={props.isLoading}
        textContent={'Loading...'}
        textStyle={{color:'#FFF'}}
      />   
      <ScrollView>
        <Container>
          <TitleContainer>
            <Title>Welcome!</Title>
          </TitleContainer>
          <Introduction textColor='black'>Forgot Password</Introduction>
          <Text style={{marginBottom: 30, fontSize: 14, paddingLeft: 30, paddingRight: 30, textAlign: 'center'}}>If you forgot your password, please enter your {'\n'} email. A password reset link will be sent.</Text>
          <Input placeholder="E-mail" 
            placeholderTextColor = "black"
            onChangeText = {(text) => setEmail(text)}
            value = {email}
          />
          <View style={{height: 60}} />
          <Button 
            onPress={onContinue}  
            bgColor={Colors.textColor}
          >
            <ButtonTitle textColor='white'>Continue</ButtonTitle>
          </Button>  
          <View style={{height: 77}} />
          <CustomerTitle>Existing Customer?</CustomerTitle>
          <Button 
            onPress={()=>navigate('LoginScreen')} 
            bgColor='white'
          >
            <ButtonTitle textColor='black'>Login Here</ButtonTitle>
          </Button>
        </Container>
      </ScrollView>
    </BackgroundContainer>
  );
}


const mapStateToProps = (state) => {
  return {
    token: state.session.token,
    isLoading: state.session.isLoading,
    status: state.session.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPassword: (email) => dispatch(ForgotPasswordAction(email))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ForgotScreen);

const BackgroundContainer = styled(ImageBackground)`
  flex: 1;
`;
const Container = styled(View)`
  flex: 1;
  align-items: center;
`;
const Title = styled(Text)`
  color: black;
  font-size: 31px;
  font-weight: 400;
  padding-bottom: 10px;
  text-align: center;
`;
const TitleContainer = styled(View)`
  margin-top: 28px;
  margin-bottom: 19px;
  border-bottom-width: 2px;
  width: 70%;
`
const Input = styled(TextInput)`
  width: 80%;
  height: 60px;
  font-size: 20px;
  border-radius: 10px;
  padding-left: 14px;
  margin-bottom: 58px;
  background-color: white;
  border-width: 1px;
  border-color: #979797;
`;
const Button = styled(TouchableOpacity)`
  width: 80%;
  height: 60px;
  border-radius: 30px;
  background-color: #15892E;
  justify-content: center;
  align-items: center;  
  background-color: ${(props) => props.bgColor};

  shadow-color: #000;
  shadow-opacity: 0.8;
  shadow-radius: 3.87px;
  shadow-offset: 0 2px;
  elevation: 5;
`;
const ButtonTitle = styled(Text)`
  
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  color: black;
`;
const Introduction = styled(Text)`
  height: 40px;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 20.5px;
  color: ${(props) => props.textColor};
`;

const CustomerTitle = styled(Text)`  
  text-align: center;
  font-size: 20px;
  margin-bottom: 18px;
  font-weight: 400;
`;
