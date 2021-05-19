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
          <Text style={{marginBottom: 30, fontSize: 16, paddingLeft: 20, paddingRight: 20, textAlign: 'center'}}>If you forgot your password, please enter your email. A password reset link will be sent.</Text>
          <Input placeholder="E-mail" 
            placeholderTextColor = "#15892E"
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
          <View style={{height: 80}} />
          <CustomerTitle>Existing Customer?</CustomerTitle>
          <Button 
            onPress={()=>navigate('LoginScreen')} 
            bgColor='#F9CC34'
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
  color: white;
  font-size: 39px;
  font-weight: bold;
  padding-bottom: 10px;
  text-align: center;
`;
const TitleContainer = styled(View)`
  margin-top: 56px;
  margin-bottom: 20px;
  border-bottom-width: 5px;
  width: 70%;
`
const Input = styled(TextInput)`
  width: 80%;
  height: 80px;
  font-size: 20px;
  border-radius: 10px;
  padding-left: 14px;
  margin-bottom: 25px;
  background-color: white;
`;
const Button = styled(TouchableOpacity)`
  width: 80%;
  height: 80px;
  border-radius: 10px;
  background-color: #15892E;
  justify-content: center;
  align-items: center;
  border-width: 3px;
  background-color: ${(props) => props.bgColor};
`;
const ButtonTitle = styled(Text)`
  height: 40px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: ${(props) => props.textColor};
`;
const Introduction = styled(Text)`
  height: 40px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 25px;
  color: ${(props) => props.textColor};
`;

const CustomerTitle = styled(Text)`
  height: 40px;
  text-align: center;
  font-size: 30px;
  margin-bottom: 15px;
  font-weight: 700;
`;
