import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert} from 'react-native';
import styled from 'styled-components/native';
import { Colors } from 'src/theme';
import { navigate } from 'src/utils/navigation';
import Menu from 'src/components/Menu'
import TabBar from 'src/components/TabBar'
import Checkbox from 'react-native-custom-checkbox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Dropdown } from 'react-native-material-dropdown-v2';
import {connect} from 'react-redux';
import {CreateNewHomeAction} from 'src/store/NewEstimate/action';
import Spinner from 'react-native-loading-spinner-overlay';

const HomeScreen = (props) => {
  const [bedrooms, setBedrooms] = useState(null)
  const [bathrooms, setBathrooms] = useState(null)
  const [footage, setFootage] = useState(null)
  const [pets, setPets] = useState(null)
  const [address, setAddress] = useState(null)
  const [city, setCity] = useState(null)
  const [zip, setZip] = useState(null)
  const [extraService1, setExtraService1] = useState(false)
  const [extraService2, setExtraService2] = useState(false)
  const [extraService3, setExtraService3] = useState(false)
  const [extraService4, setExtraService4] = useState(false)
  const [stateName, setStateName] = useState(null)

  const [footageArray, setFootageArray] = useState([])
  const [stateArray, setStateArray] = useState([])

  function createNewHome () {
    if (!bedrooms) {
      Alert.alert('Please select bedrooms!')
      return
    }
    else if (!bathrooms) {
      Alert.alert('Please select bathrooms!')
      return
    }
    else if (!footage) {
      Alert.alert('Please select square of footage!')
      return
    }
    else if (pets == null) {
      Alert.alert('Please select pets!')
      return
    }
    else if (!address) {
      Alert.alert('Please select address!')
      return
    }
    else if (!city) {
      Alert.alert('Please select city!')
      return
    }
    else if (!zip) {
      Alert.alert('Please select zip!')
      return
    }
    else if (!stateName) {
      Alert.alert("Please select state")
      return
    }
    else {

      let serviceArray = new Array()
      if (extraService1) serviceArray.push(props.initialData.extraServices[0].id)
      if (extraService2) serviceArray.push(props.initialData.extraServices[1].id)
      if (extraService3) serviceArray.push(props.initialData.extraServices[2].id)
      if (extraService4) serviceArray.push(props.initialData.extraServices[3].id)

      const data = {
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        footage: footage,
        pets: pets,
        address: address,
        extraService: serviceArray,
        city: city,
        zip: zip,
        stateName: stateName
      }
      props.createNewHome (data)
      navigate('RequestScreen')
    }
  }
  
  function getFootage() {
    let footages = new Array()
    if (props.initialData) {
      props.initialData.serviceSizes.map ((item) => {
        footages.push({
          label: item.name,
          value: item.id,
        })
      })
      setFootageArray(footages)
    }
    else setFootageArray([])
  }
 
  function getStates () {
    let stateNames = new Array()
    if (props.initialData) {
      Object.keys(props.initialData.states).map ((item) => {
        stateNames.push({
          label: props.initialData.states.[item],
          value: item,
        })
      })
      setStateArray(stateNames)
    }
    else setStateArray([])
  }

  useEffect (()=>{
    
    getStates ()
    getFootage ()
  },[props.initialData])

  return (
    <KeyboardAwareScrollView>     
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
        <Title>Step 3 of 4</Title>
        <Content textColor={Colors.textColor}>About Your Home</Content>
        <Footer />
        <InputTitle>Number of bedrooms:</InputTitle>
        <Dropdown
          data={[
            {label: '1', value: 1},
            {label: '2', value: 2},
            {label: '3', value: 3},
            {label: '4', value: 4},
            {label: '5', value: 5},
            {label: '6 or more', value: 6},
          ]}    
          value={'Choose one'}
          containerStyle = {{width: '90%', marginBottom: 20 }}
          onChangeText = {(value, index, data) => setBedrooms(value)}
        />
        <InputTitle>Number of bathrooms:</InputTitle>
        <Dropdown
          data={[
            {label: '1', value: 1},
            {label: '2', value: 2},
            {label: '3', value: 3},
            {label: '4', value: 4},
            {label: '5', value: 5},
            {label: '6 or more', value: 6},
          ]}    
          value={'Choose one'}
          containerStyle = {{width: '90%', marginBottom: 20 }}
          onChangeText = {(value, index, data) => setBathrooms(value)}
        />
        <InputTitle>Square of footage:</InputTitle>
        <Dropdown
          data={footageArray}    
          value={'Choose one'}
          containerStyle = {{width: '90%', marginBottom: 20 }}
          onChangeText = {(value, index, data) => setFootage(value)}
        />
        <InputTitle>Pets?:</InputTitle>
        <Dropdown
          data={[
            {label: 'Yes', value: 1},
            {label: 'No', value: 0},
          ]}    
          value={'Choose one'}
          containerStyle = {{width: '90%', marginBottom: 20 }}
          onChangeText = {(value, index, data) => setPets(value)}
        />
        <InputTitle>Extra Services:</InputTitle>
        <Text style={{fontSize: 14, paddingHorizontal: 20, marginTop: 5}}>* All extra services included in deep cleaning/move in-move - out cleaning/Post construction cleaning</Text>
        
        {
          props.initialData.extraServices &&
          <ExtraServiceContainer>
            <Checkbox
                name='checkbox1'
                checked={extraService1}
                onChange={(name, checked) => setExtraService1(checked)}                
                />
            <ExtraServiceTitle>{props.initialData.extraServices[0].name} - ${props.initialData.extraServices[0].price}</ExtraServiceTitle>
          </ExtraServiceContainer>   
        }
        {
          props.initialData.extraServices && props.initialData.extraServices.length > 1 &&
          <ExtraServiceContainer>
            <Checkbox
              name='checkbox2'
              checked={extraService2}
              onChange={(name, checked) => setExtraService2(checked)}
            />
            <ExtraServiceTitle>{props.initialData.extraServices[1].name} - ${props.initialData.extraServices[1].price}</ExtraServiceTitle>
          </ExtraServiceContainer>   
        }
        {
          props.initialData.extraServices &&  props.initialData.extraServices.length > 2 &&
          <ExtraServiceContainer>
            <Checkbox
              name='checkbox3'
              checked={extraService3}
              onChange={(name, checked) => setExtraService3(checked)}
            />
            <ExtraServiceTitle>{props.initialData.extraServices[2].name} - ${props.initialData.extraServices[2].price}</ExtraServiceTitle>
          </ExtraServiceContainer>   
        }
        {
          props.initialData.extraServices &&  props.initialData.extraServices.length > 3 &&
          <ExtraServiceContainer>
            <Checkbox
              name='checkbox4'
              checked={extraService4}
              onChange={(name, checked) => setExtraService4(checked)}
            />
            <ExtraServiceTitle>{props.initialData.extraServices[3].name} - ${props.initialData.extraServices[3].price}</ExtraServiceTitle>
          </ExtraServiceContainer>   
        }
        <View style={{height: 20}} />
        <InputTitle>Address:</InputTitle>
        <View style={{height: 20}} />
        <Input 
          placeholder="Address where you want cleaned"
          placeholderTextColor = "grey"
          onChangeText={text => setAddress(text)}
        />
        <InputTitle>City:</InputTitle>
        <View style={{height: 20}} />
        <Input 
          placeholder="City"
          placeholderTextColor = "grey"
          onChangeText={text => setCity(text)}
        />
        <InputTitle>State:</InputTitle>
        <Dropdown
          data={stateArray}    
          value={'Choose one'}
          containerStyle = {{width: '90%', marginBottom: 20 }}
          onChangeText = {(value, index, data) => setStateName(value)}
        />
        <InputTitle>Zip:</InputTitle>
        <View style={{height: 20}} />
        <Input 
          placeholder="Zip"
          placeholderTextColor = "grey"
          onChangeText={text => setZip(text)}
        />
        <SaveButton 
          bgColor = {Colors.textColor}
          onPress={createNewHome}
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
    initialData: state.newEstimate.initialData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewHome: (data) => dispatch(CreateNewHomeAction(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

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
const InputTitle = styled(Text)`
  font-size: 20px;
  flex: 1;
  width: 90%
  padding-left: 10px;
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
const ExtraServiceTitle = styled (Text)`
  font-size: 20px;
  padding-left: 10px;
  margin-left: 10px;  
  margin-top: -2px;
`
const ExtraServiceContainer= styled(View)`
  flex-direction: row;
  margin-top: 20px;
  width: 90%;
  margin-horizontal: 10;
`