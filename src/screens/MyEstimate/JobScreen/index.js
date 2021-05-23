import React, {useState, useEffect} from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Alert,
} from 'react-native';

import styled from 'styled-components/native';
import { Colors } from 'src/theme';
import { navigate } from 'src/utils/navigation';
import Menu from 'src/components/Menu'
import TabBar from 'src/components/TabBar'
import { Dropdown } from 'react-native-material-dropdown-v2';
import {connect} from 'react-redux';
import {CreateNewJobAction} from 'src/store/NewEstimate/action';
import Spinner from 'react-native-loading-spinner-overlay';

const JobScreen = (props) => {

  const [jobType, setJobType]  = useState(null)
  const [serviceType, setServiceType] = useState(null)
  const [frequency, setFrequency] = useState(null)

  const [serviceTypeArray, setServiceTypeArray] = useState([])
  const [frequencyArray, setFrequencyArray] = useState([])


  function createNewJob () {
    if (!serviceType) {
      Alert.alert("Please select service type!")
      return
    }
    else if (!jobType) {
      Alert.alert('Please select job type!')
      return
    }
    else if (!frequency) {
      Alert.alert('Please select frequency!')
      return
    }
    else {
      const data = {
        serviceType: serviceType,
        jobType: jobType,
        frequency: frequency
      }
      props.createNewJob (data)
      navigate('HomeScreen')
    }
  }

  function getServiceType () {
    let serviceType = new Array()
    if (props.initialData) {
      props.initialData.serviceTypes.map ((item) => {
        serviceType.push({
          label: item.name,
          value: item.id,
        })
      })
      
      setServiceTypeArray(serviceType)
    }
    else setServiceTypeArray([])
  }

  function getFrequency () {
    let frequency = new Array()
    if (props.initialData) {
      props.initialData.serviceIntervals.map ((item) => {
        frequency.push({
          label: item.name,
          value: item.id,
        })
      })
      setFrequencyArray(frequency)
    }
    else setFrequencyArray([])
  }

  useEffect (()=>{
    getServiceType ()
    getFrequency()
  }, [props.initialData])
  
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
        <Title>Step 2 of 4</Title>
        <Content textColor={"black"}>About Your Job</Content>
        <Footer />
        <InputTitle>Service Type:</InputTitle>        
          <Dropdown
            data = {serviceTypeArray}  
            value={'Choose one'}
            containerStyle = {{width: '90%', marginBottom: 20 }}
            onChangeText = {(value, index, data) => setServiceType(value)}
          />
        <InputTitle>Job Type:</InputTitle>
        <Dropdown
          data={[
            {label: 'Home', value: 1},
            {label: 'Business', value: 2},
          ]}     
          value={'Choose one'}
          containerStyle = {{width: '90%', marginBottom: 20}}
          onChangeText = {(value, index, data) => setJobType(value)}
        />
        <InputTitle>Frequency:</InputTitle>
        <Dropdown
          data ={frequencyArray}
          value={'Choose one'}
          onChangeText = {(value, index, data) => setFrequency(value)}
          containerStyle = {{width: '90%', marginBottom: 20}}
        />
        <ButtonGroup>
          <SaveButton 
            bgColor = {"white"}
            onPress={()=>props.navigation.pop()}
          >
            <ButtonTitle>Back</ButtonTitle>
          </SaveButton>
          <SaveButton 
            bgColor = {Colors.textColor}
            onPress={createNewJob}
          >
            <ButtonTitle>Next</ButtonTitle>
          </SaveButton>
        </ButtonGroup>        
        <Footer />
      </Container>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.newEstimate.isLoading,
    status: state.newEstimate.status,
    initialData: state.newEstimate.initialData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewJob: (data) => dispatch(CreateNewJobAction(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(JobScreen);

const Container = styled(View)`
  flex: 1;
  align-items: center;
`;
const Title = styled(Text)`
  font-size: 18px;
  flex: 1;
  width: 90%;
  margin-bottom: 5px;
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
  height: 50px;
  border-radius: 4px;
  border-width: 1px;
  font-size: 20px;
  padding-left: 10px;
  margin-bottom: 20px;
`
const InputTitle = styled(Text)`
  font-size: 18px;
  flex: 1;
  width: 90%
  padding-left: 10px;
`
const Footer = styled (View)`
  height: 20px;
`
const SaveButton = styled (TouchableOpacity)`
  width: 40%;
  height: 60px;
  border-radius: 30px;  
  background-color: ${props=>props.bgColor};
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-left: 17px;

  shadow-color: #000;
  shadow-opacity: 0.8;
  shadow-radius: 3.87px;
  shadow-offset: 0 2px;
  elevation: 5;
`
const ButtonGroup = styled (View)`
  flex-direction: row;
  justify-content: space-between;  
`
const ButtonTitle = styled (Text)`
  font-size: 20px;
  color: black;  
`