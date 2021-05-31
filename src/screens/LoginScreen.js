import React, {useState, useEffect} from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ImageBackground, 
  ScrollView,
  Alert,
  Image
} from 'react-native';
import styled from 'styled-components/native';
import { Colors } from 'src/theme';
import {connect} from 'react-redux';
import {LoginAction} from 'src/store/Auth/action';
import AsyncStorage from '@react-native-community/async-storage';
import {navigate} from 'src/utils/navigation';
import Spinner from 'react-native-loading-spinner-overlay';

const LoginScreen = (props) => {

  // const [username, setUserName] = useState('geronco@gmail.com');
  // const [password, setPassword] = useState('change543');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  useEffect (()=> {
    async function setStorage() {
      try {
        if (props.status == 1 && props.token && props.user) {
          await AsyncStorage.setItem("userToken", props.token)
          await AsyncStorage.setItem("user", props.user.user.name)
          await AsyncStorage.setItem("user_type", props.user.user?.user_type.toString())
          await AsyncStorage.setItem("user_hash", props.user.user_hash)
          navigate('App')
        }
        else if (props.status == -1) {
          Alert.alert("warning", "Your email or password is not correct!")
        }
        else {
          console.log ("return error...")
        }
      } catch (e) {
        console.log ("storage error")
      }
    }
    setStorage()
  },[props.status, props.token, props.user])

  function onLogin () {
    props.login(username, password)
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
          <Image source={require('src/assets/img/login/logo.png')} style={{marginTop: 40, width: 179, height: 59}} resizeMode="contain" />
          <TitleContainer>
            <Title>Welcome!</Title>
          </TitleContainer>          
          <Input placeholder="Username" 
            placeholderTextColor = "black"
            onChangeText = {(text) => setUserName(text)}
            value = {username}
          />
          <Input placeholder="Password" 
            placeholderTextColor = "black"
            onChangeText = {(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />
          <Button 
            onPress={onLogin}  
            bgColor={"#99C3EE"}
            style={{marginTop: 18}}
          >
            <ButtonTitle>Login</ButtonTitle>
          </Button>
          <ForgotButton onPress = {()=>navigate('ForgotScreen')}>
            <ForgotTitle>Forgot your password?</ForgotTitle>
          </ForgotButton>
          
          <CustomerTitle>First Time Here?</CustomerTitle>
          <Button 
            onPress={()=>navigate ('InformationScreen')} 
            bgColor='white'
          >
            <ButtonTitle textColor='black'>Request An Estimate</ButtonTitle>
          </Button>
          <Text style={{marginTop: 21, fontSize: 16, alignSelf: 'center'}}>Did you just receive an estimate?</Text>
          <Text>If so, you need to <Text style={{fontSize: 16, fontWeight: 'bold'}} onPress={()=>navigate("RegisterScreen")}>click here</Text> and register first.
          </Text>
          <View style={{height: 30}} />
        </Container>
      </ScrollView>
    </BackgroundContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.session.token,
    user: state.session.user,
    isLoading: state.session.isLoading,
    status: state.session.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch(LoginAction(username, password))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const BackgroundContainer = styled(ImageBackground)`
  flex: 1;
`;
const Container = styled(View)`
  flex: 1;
  align-items: center;
`;
const Title = styled(Text)`
  color: black;
  font-size: 30px;
  font-weight: 400;
  padding-bottom: 10px;
  text-align: center;
`;
const TitleContainer = styled(View)`
  margin-top: 36px;   
  width: 70%;
`
const Input = styled(TextInput)`
  width: 80%;
  height: 60px;
  font-size: 20px;
  border-radius: 10px;
  padding-left: 14px;
  margin-bottom: 10px;
  background-color: white;
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
  height: 35px;
  text-align: center;
  font-size: 22px;
  font-weight: 600;  
`;
const Introduction = styled(Text)`
  height: 40px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 25px;
  color: ${(props) => props.textColor};
`;

const ForgotButton = styled(TouchableOpacity)`
  margin-top: 10px;
`
const ForgotTitle = styled(Text)`
  height: 30px;
  text-align: center;
  font-size: 12px;
  margin-bottom: 25px;
  font-weight: 400;  
`;
const CustomerTitle = styled(Text)`
  height: 40px;
  text-align: center;
  font-size: 20px;
  margin-bottom: 15px;
  font-weight: 400;
`;
