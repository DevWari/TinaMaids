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
import {LoginAction} from 'src/store/Auth/action';
import AsyncStorage from '@react-native-community/async-storage';
import {navigate} from 'src/utils/navigation';
import Spinner from 'react-native-loading-spinner-overlay';

const LoginScreen = (props) => {

  const [username, setUserName] = useState('geronco@gmail.com');
  const [password, setPassword] = useState('change543');
  // const [username, setUserName] = useState('');
  // const [password, setPassword] = useState('');

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
          <TitleContainer>
            <Title>Welcome!</Title>
          </TitleContainer>
          <Introduction textColor='black'>Existing Customers</Introduction>
          <Input placeholder="Username" 
            placeholderTextColor = "#15892E"
            onChangeText = {(text) => setUserName(text)}
            value = {username}
          />
          <Input placeholder="Password" 
            placeholderTextColor = "#15892E"
            onChangeText = {(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />
          <Button 
            onPress={onLogin}  
            bgColor={Colors.textColor}
          >
            <ButtonTitle textColor='white'>Login</ButtonTitle>
          </Button>
          <ForgotButton onPress = {()=>navigate('ForgotScreen')}>
            <ForgotTitle>Forgot your password?</ForgotTitle>
          </ForgotButton>
          
          <CustomerTitle>New Customer?</CustomerTitle>
          <Button 
            onPress={()=>navigate ('InformationScreen')} 
            bgColor='#F9CC34'
          >
            <ButtonTitle textColor='black'>Request An Estimate</ButtonTitle>
          </Button>
          <Text style={{marginTop: 30, fontSize: 16}}>First time here? Did you just receive an estimate? {'\n'}
          If so, you need to <Text style={{fontSize: 20, fontWeight: 'bold'}} onPress={()=>navigate("RegisterScreen")}>click here</Text> and register first.
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
  color: white;
  font-size: 39px;
  font-weight: bold;
  padding-bottom: 10px;
  text-align: center;
`;
const TitleContainer = styled(View)`
  margin-top: 46px;
  margin-bottom: 20px;
  border-bottom-width: 5px;
  width: 70%;
`
const Input = styled(TextInput)`
  width: 80%;
  height: 60px;
  font-size: 20px;
  border-radius: 10px;
  padding-left: 14px;
  margin-bottom: 25px;
  background-color: white;
`;
const Button = styled(TouchableOpacity)`
  width: 80%;
  height: 60px;
  border-radius: 10px;
  background-color: #15892E;
  justify-content: center;
  align-items: center;
  border-width: 3px;
  background-color: ${(props) => props.bgColor};
`;
const ButtonTitle = styled(Text)`
  height: 35px;
  text-align: center;
  font-size: 25px;
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

const ForgotButton = styled(TouchableOpacity)`
  margin-top: 10px;
`
const ForgotTitle = styled(Text)`
  height: 30px;
  text-align: center;
  font-size: 20px;
  margin-bottom: 25px;
  font-weight: 700;
`;
const CustomerTitle = styled(Text)`
  height: 40px;
  text-align: center;
  font-size: 30px;
  margin-bottom: 15px;
  font-weight: 700;
`;
