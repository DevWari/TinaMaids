import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import { Colors } from 'src/theme';
import { navigate } from 'src/utils/navigation';
import Menu from 'src/components/Menu'
import EstimateHeader from 'src/components/EstimateHeader'
import RBSheet from "react-native-raw-bottom-sheet";
// import SlideComponent from './SlideComponent'
import {connect} from 'react-redux'
import {LoadCustomerEstimateDetailAction} from 'src/store/PersonalInfo/action'
import Spinner from 'react-native-loading-spinner-overlay';
import PaymentView from './PaymentView'

const serviceSize = [
  '',
  '600-900 sq',
  '900-1200 sq',
  '1200-1600 sq',
  '1600-2000 sq',
  '2000-2500 sq',
  '2500-2900 sq',
  '2900-3200 sq',
  '3200-3500 sq',
  '3500 sq or more'
]

const stateArray = {
  AK: "Alaska",
  AL: "Alabama",
  AR: "Arkansas",
  AZ: "Arizona",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DC: "District Of Columbia",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  IA: "Iowa",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  MA: "Massachusetts",
  MD: "Maryland",
  ME: "Maine",
  MI: "Michigan",
  MN: "Minnesota",
  MO: "Missouri",
  MS: "Mississippi",
  MT: "Montana",
  NC: "North Carolina",
  ND: "North Dakota",
  NE: "Nebraska",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NV: "Nevada",
  NY: "New York",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VA: "Virginia",
  VT: "Vermont",
  WA: "Washington",
  WI: "Wisconsin",
  WV: "West Virginia",
  WY: "Wyoming"
}
const PersonalInfo = (props) => {
  let slideView = null;

  useEffect(()=> {
    props.loadCustomerEstimateDetail(props.token,props.navigation.state.params.hashedId)
  }, [])

  return (
    <ScrollView>
      <Spinner 
        visible={props.isLoading}
        textContent={'Loading...'}
        textStyle={{color:'#FFF'}}
      />   
      <Container>    
        <Menu title="Estimate"/>
        <EstimateHeader />  
        <Footer />
        <Title>My Estimate # {props.data? props.data.id: ''} </Title>
        <Content textColor={Colors.textColor}>Your Information</Content>
        <Footer />
        <DetailContainer>
          <Detail>{props.data? props.data.customer_name: ''}</Detail>
        </DetailContainer>
        <DetailContainer>
          <Detail>{props.data? props.data.customer_email: ''}</Detail>
        </DetailContainer>
        <DetailContainer>
          <Detail>{props.data? props.data.customer_phone: ''}</Detail>
        </DetailContainer>
        <View style={{height: 20}} />
        <Content textColor={Colors.textColor}>About Your Job</Content>
        <Footer />
        <DetailContainer>
          <Detail>{props.serviceType? props.serviceType.name: ''}</Detail>
        </DetailContainer>
        <View style={{height: 20}} />
        <Content textColor={Colors.textColor}>About Your Home</Content>
        <Footer />
        <DetailContainer>
          <Detail>{props.data? props.data.bedrooms: ''} Bedrooms</Detail>
        </DetailContainer>
        <DetailContainer>
          <Detail>{props.data? props.data.bathrooms: ''} Bathrooms</Detail>
        </DetailContainer>
        <DetailContainer>
          <Detail>{props.data? serviceSize[props.data.service_size_id]: ''}</Detail>
        </DetailContainer>
        <DetailContainer>
          <Detail>{props.data && props.data.has_pets > 0 ? 'Pets': 'No Pets'}</Detail>
        </DetailContainer>
        <AddressContainer>
          <Detail>{props.data? props.data.address: ''} {'\n'}
                  {props.data? props.data.city_name: ''}  {props.data? stateArray.[props.data.state]: ''}  {props.data? props.data.zip: ''}
          </Detail>
        </AddressContainer>
        <View style={{height: 20}} />
        <Content textColor={Colors.textColor}>Price</Content>
        <View style={{height: 20}} />
        <AddressContainer>
          <Detail>The price for your service is: {'\n'} <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 10}}>${props.subTask? props.subTask.affiliate_price: ''}</Text>
          </Detail>
        </AddressContainer>
        {
            props.navigation.state.params.accept == 3 && 
            <SaveButton 
              bgColor = {Colors.textColor}
              onPress={() => navigate('MyAppointment', {hashed_id: props.data?.hashed_id})}
            >
              <ButtonTitle>View Appointments</ButtonTitle>
            </SaveButton>
        }
        {
            props.navigation.state.params.accept < 3 &&
            <SaveButton
              bgColor = {Colors.textColor}
              // onPress={()=>slideView.open()}
              onPress={()=>navigate('PaymentScreen',{hashed_id: props.data?.hashed_id})} 
            >
              <ButtonTitle>Accept Estimate</ButtonTitle>
            </SaveButton>
        }
        <Footer />
        {/* <RBSheet
          ref={ref => {
            slideView = ref;
          }}
          height={400}
          duration={250}
          customStyles={{
            container: {
              paddingTop: 10,
              borderRadius: 20,
              paddingHorizontal:20,
            }
          }}
        >
          <PaymentView 
            closePayment={()=>slideView.close() }
            hashedId = {props.navigation.state.params.hashedId}
          />
        </RBSheet> */}
      </Container>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.session.token,
    isLoading: state.personalInfo.isLoading,
    data: state.personalInfo.data,
    serviceType: state.personalInfo.serviceType,
    subTask: state.personalInfo.subTask,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadCustomerEstimateDetail: (token, hashedId) => dispatch(LoadCustomerEstimateDetailAction(token, hashedId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);

const Container = styled(View)`
  flex: 1;
  align-items: center;
`;
const Title = styled(Text)`
  font-size: 22px;
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
const DetailContainer = styled(View)`
  width: 90%;
  height: 50px;
  border-radius: 4px;
  border-bottom-width: 1px;
  border-color: gray;
  font-size: 20px;
  padding-left: 10px;
  margin-bottom: 20px;
`
const AddressContainer = styled(View)`
  width: 90%;
  height: 70px;
  border-radius: 4px;
  border-bottom-width: 1px;
  border-color: gray;
  font-size: 20px;
  padding-left: 10px;
  margin-bottom: 20px;
`
const Detail = styled(Text)`
  font-size: 20px;
  flex: 1;
  width: 90%
  padding-left: 30px;
  margin-bottom: 10px;
`
const Footer = styled (View)`
  height: 40px;
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