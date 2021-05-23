import React, {useState, useEffect} from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
} from 'react-native';
import Checkbox from 'react-native-custom-checkbox';
import styled from 'styled-components/native';
import { Colors } from 'src/theme';
import { navigate } from 'src/utils/navigation';
import Menu from 'src/components/TermsMenu';
import { connect } from 'react-redux';
import { RegisterAction } from 'src/store/Auth/action'
import Spinner from 'react-native-loading-spinner-overlay';

const RegisterScreen = (props) => {
  
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [rePassword, setRepassword] = useState(null)
  const [isSelected, setIsSelected] = useState(false)
  
  useEffect (()=> {
    
    if (props.token) navigate("App")
  }, [props.token])
  function register () {
    let data = {
      name: name, 
      email: email, 
      password: password,
    }
    if (!name) {
      Alert.alert("Please Input your name!")
      return
    }
    else if (!email) {
      Alert.alert("Please Input your email!")
      return
    }
    else if (!password || password != rePassword) {
      Alert.alert("Confirm your password again!")
      return
    }
    else if (!isSelected) {
      Alert.alert("You should accept the terms service")
      return
    }
    else props.register (data)
  }
  return (
    <ScrollView>
      <Spinner 
        visible={props.isLoading}
        textContent={'Loading...'}
        textStyle={{color:'#FFF'}}
      />
      <Container>      
        <Menu title="Register" routeName="LoginScreen"/>
        <Footer />
        <InputTitle>Full Name:</InputTitle>
        <Input 
          placeholder="Jonnas Doe"
          placeholderTextColor = "grey"
          onChangeText={text => setName(text)}
          value={name}
        />
        <InputTitle>Email:</InputTitle>
        <Input 
          placeholder="customer@test.com"
          placeholderTextColor = "grey"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <InputTitle>Password:</InputTitle>
        <Input 
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
          value={password}
        />
        <InputTitle>Re-enter password:</InputTitle>
        <Input 
          onChangeText={text => setRepassword(text)}
          secureTextEntry={true}
          value={rePassword}
        />
        
        <Footer />
        <View style={{flexDirection: 'row'}}>
          <Checkbox
              checked={isSelected}
              onChange={(name, checked) => setIsSelected(checked)}
          />
          <Text style={{fontSize: 20, marginLeft: 10, marginTop: -3}}>I agree to the <Text onPress={()=>navigate('TermsView')} style={{color: Colors.textColor, fontSize: 20}}>terms</Text></Text>
        </View>
        <Footer />
        <SaveButton 
          bgColor = {Colors.textColor}
          onPress = {register}
        >
          <ButtonTitle>Register</ButtonTitle>
        </SaveButton>
        <Footer />
      </Container>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.session.isLoading,
    status: state.session.status,
    token: state.session.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (data) => dispatch(RegisterAction(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

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
  height: 60px;
  border-radius: 30px;  
  background-color: ${props=>props.bgColor};
  justify-content: center;
  align-items: center;

  shadow-color: #000;
  shadow-opacity: 0.8;
  shadow-radius: 3.87px;
  shadow-offset: 0 2px;
  elevation: 5;
`
const ButtonTitle = styled (Text)`
  font-size: 20px;
  color: black;
  height: 25px;
  text-align: center;
`