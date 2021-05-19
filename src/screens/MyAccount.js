import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import { Colors } from 'src/theme';
import { navigate } from 'src/utils/navigation';
import Menu from 'src/components/Menu'
import {connect} from 'react-redux'
import {LoadProfileAction, UpdateProfileAction} from 'src/store/MyAccount/action'
import Spinner from 'react-native-loading-spinner-overlay';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

const MyAccount = (props) => {
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [state, setStates] = useState('')
  const [zip, setZip] = useState('')
  const [city, setCity] = useState('')

  let STATES = null;
  
  useEffect(()=> {
    if (!props.token) {
      navigate('LoginScreen') 
      return
    }
    else props.loadProfile (props.token)
  }, [])
  
  useEffect(()=> {
    if (props.data && props.data.user) {
      setName(props.data.user.user.name)
      setEmail(props.data.user.user.email)
      setPhone(props.data.user.customer.phone)
      setAddress(props.data.user.customer.address)
      // setStates(props.data.user.states.[props.data.user.customer.state])
      setStates(props.data.user.customer.state)
      setZip(props.data.user.customer.zip)
      setCity(props.data.user.customer.city)
    }
  }, [props.data])

  function updateProfile () {
    let data = {
      name: name, 
      email: email, 
      phone: phone, 
      address: address, 
      state: state, 
      zip: zip, 
      city: city
    }
    props.updateProfile (data, props.token)
  }

  return (
    <KeyboardAwareScrollView>
      <Spinner 
        visible={props.isLoading}
        textContent={'Loading...'}
        textStyle={{color:'#FFF'}}
      />   
      <Container>      
        <Menu title="My Account"/>
        <Footer />
        <InputTitle>Name:</InputTitle>
        <Input 
          placeholder="Jonnas Doe"
          placeholderTextColor = "grey"
          value = {name}
          onChangeText={text => setName(text)}
        />
        <InputTitle>Email:</InputTitle>
        <Input 
          placeholder="customer@test.com"
          placeholderTextColor = "grey"
          value = {email}
          onChangeText={text => setEmail(text)}
        />
        <InputTitle>Phone:</InputTitle>
        <Input 
          placeholder="978-880-2324"
          placeholderTextColor = "grey"
          value = {phone}
          onChangeText={text => setPhone(text)}
        />
        <InputTitle>Address:</InputTitle>
        <Input 
          placeholder="128 TimberWood Drive"
          placeholderTextColor = "grey"
          value = {address}
          onChangeText={text => setAddress(text)}
        />
        <InputTitle>State:</InputTitle>
        <Input 
          placeholder="Florida"
          placeholderTextColor = "grey"
          value = {state}
          onChangeText={text => setStates(text)}
        />
        {/* <DropDownPicker
          items={[]}
          defaultIndex={0}          
          // onChangeItem={item => this.setState({roomID: item.value})}
          containerStyle={{width: '90%', borderRadius: 30, height: 70, marginTop: 30,  backgroundColor: '#fafafa'}}
          style={{borderWidth: 1, borderRadius: 10}}   
          placeholder="How soon can you guys come and clean my house?"      
        /> */}
        <InputTitle>Branch Location:</InputTitle>
        <Input 
          placeholder="St Augustine"
          placeholderTextColor = "grey"
          value = {city}
          onChangeText={text => setCity(text)}
        />
        <InputTitle>Zip:</InputTitle>
        <Input 
          placeholder="32084"
          placeholderTextColor = "grey"
          value = {zip}
          onChangeText={text => setZip(text)}
        />
        <Footer />
        <SaveButton 
          onPress = {updateProfile}
          bgColor = {Colors.textColor}
        >
          <ButtonTitle>Save</ButtonTitle>
        </SaveButton>
        <Footer />
      </Container>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.session.token,
    isLoading: state.account.isLoading,
    status: state.account.status,
    update_status: state.account.update_status,
    data: state.account.data
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadProfile: (token) => dispatch(LoadProfileAction(token)),
    updateProfile: (data,token) => dispatch(UpdateProfileAction(data,token))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);

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