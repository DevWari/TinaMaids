import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert} from 'react-native';
import styled from 'styled-components/native';
import { Colors } from 'src/theme';
import { navigate } from 'src/utils/navigation';
import Menu from 'src/components/Menu'
import TabBar from 'src/components/TabBar'
import DatePicker from 'react-native-date-picker'
import {connect} from 'react-redux';
import {CreateNewEstimateAction} from 'src/store/NewEstimate/action';
import Spinner from 'react-native-loading-spinner-overlay';

const RequestScreen = (props) => {

  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date())


  function createNewEstimate () {
    if (description == '') {
      Alert.alert('Please input description!')
      return
    }
    const service_date = date.toLocaleString().split(',')[0]
    const service_time = date.toLocaleString().split(',')[1]
    const data = {
      service_date: service_date, 
      service_time: service_time, 
      special_request: description, 
      extra_service_task_id: props.extraService, 
      service_type_id: props.serviceType, 
      customer_email: props.email, 
      customer_name: props.name, 
      customer_phone: props.phone, 
      address: props.address, 
      job_type: props.jobType, 
      has_pets: props.pets, 
      bedrooms: props.bedrooms, 
      bathrooms: props.bathrooms, 
      service_size_id: props.footage, 
      service_interval_id: props.frequency,
      city_name: props.city,
      zip: props.zip,
      state: props.stateName,
    }

    props.createNewEstimate (data, props.token)
    navigate('ResultScreen') 
  }
  return (
    <ScrollView>
      <Spinner 
        visible={props.isLoading}
        textContent={'Loading...'}
        textStyle={{color:'#FFF'}}
      />   
      <Container>    
        <Menu title="My Estimates"/>
        <TabBar 
          tap1="My Estimates"
          route1="MyEstimate"
          tap2="Request New"
          route2="InformationScreen"
        />
        <Footer />
        <Title>Step 4 of 4</Title>
        <Content textColor={"black"}>Pick a date and time</Content>
        <Footer />
        <DatePicker
          date={date}
          onDateChange={setDate}
          mode="datetime"

        />
        <Footer />
        <InputTitle>Description:</InputTitle>
        <Input 
          placeholder="Please describe job here"
          multiline={true}
          onChangeText={text => setDescription(text)}
          value = {description}
        />
        <SaveButton 
          bgColor = {Colors.textColor}
          onPress={createNewEstimate}
        >
          <ButtonTitle>Send Request</ButtonTitle>
        </SaveButton>
        <Footer />
      </Container>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.newEstimate.isLoading,
    token: state.session.token,
    name: state.newEstimate.name,
    email: state.newEstimate.email,
    phone: state.newEstimate.phone,
    serviceType: state.newEstimate.serviceType,
    jobType: state.newEstimate.jobType,
    frequency: state.newEstimate.frequency,
    bedrooms: state.newEstimate.bedrooms,
    bathrooms: state.newEstimate.bathrooms,
    footage: state.newEstimate.footage,
    pets: state.newEstimate.pets,
    address: state.newEstimate.address,
    extraService: state.newEstimate.extraService,
    city: state.newEstimate.city,
    zip: state.newEstimate.zip,
    stateName: state.newEstimate.stateName
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewEstimate: (data, token) => dispatch(CreateNewEstimateAction(data, token))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RequestScreen);

const Container = styled(View)`
  flex: 1;
  align-items: center;
`;
const Title = styled(Text)`
  font-size: 18px;
  flex: 1;
  width: 90%;  
  text-align: center;
`
const Content = styled(Text)`
  font-size: 24px;
  flex: 1;
  width: 90%;
  color: ${props=>props.textColor}
  margin-bottom: 10px;
  text-align: center;
`
const Input = styled(TextInput)`
  width: 90%;
  height: 250px;
  border-radius: 4px;
  border-width: 1px;
  font-size: 18px;
  padding-left: 10px;
  margin-bottom: 20px;
  text-align-vertical: top;
`
const InputTitle = styled(Text)`
  font-size: 18px;
  flex: 1;
  width: 90%
  margin-bottom: 10px;
  padding-left: 20px;
`
const Footer = styled (View)`
  height: 20px;
`
const SaveButton = styled (TouchableOpacity)`
  width: 80%;
  height: 60px;
  border-radius: 30px;  
  background-color: ${props=>props.bgColor};
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  shadow-color: #000;
  shadow-opacity: 0.8;
  shadow-radius: 3.87px;
  shadow-offset: 0 2px;
  elevation: 5;
`
const ButtonTitle = styled (Text)`
  font-size: 20px;
  color: black;  
`