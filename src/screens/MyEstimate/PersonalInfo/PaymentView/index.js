import React from 'react'
import styled from 'styled-components/native'
import {View, Text, TouchableOpacity, Alert} from 'react-native'
import { CreditCardInput } from "react-native-credit-card-input";
import {connect} from 'react-redux';
import {PaymentEstimateAction} from 'src/store/PersonalInfo/action'
import Spinner from 'react-native-loading-spinner-overlay';

var stripe = require ('stripe-client')('pk_test_Zuk2i2MI7Beker5AoKqB8gDE')

const CardView = (props) => {
  var formDate 
  
  const onChange = (formData) => {
    // setShowButton(formData.valid)
    formDate = formData
  }
  const payment = async () => {
    let { values } = formDate
    let exp = values.expiry.split('/')
    var information = {
        card: {
            number: values.number.replace(/\s/g, "") ,
            exp_month: exp[0],
            exp_year: "20"+exp[1],
            cvc: values.cvc,
            // name: values.name
        }
    }
    var card = await stripe.createToken(information);
    var stripeToken = card.id;
    if ( stripeToken ){
      props.paymentEstimate(props.token, props.hashedId, stripeToken)
    }else{
        Alert.alert("Card Error!")
    }
}

  return (
    <Container>
      {/* <Spinner 
        visible={this.props.isLoading}
        textContent={'Loading...'}
        textStyle={{color:'#FFF'}}
      />    */}
      <CreditCardInput
        autoFocus
        // requiresName
        requiresCVC
        // labelStyle={styles.label}
        // inputStyle={styles.input}
        // inputContainerStyle={{backgroundColor:'rgb(200,255,200)'}}
        validColor={"black"}
        invalidColor={"red"}
        placeholderColor={"darkgray"}
        onFocus={()=>{}}
        onChange={onChange.bind(this)} 
      />
      <ButtonContainer>
        <StyledButton onPress={payment}>
            <ButtonTitle>Pay</ButtonTitle>
        </StyledButton>
        <StyledButton
          onPress = {props.closePayment}
        >
            <ButtonTitle>Cancel</ButtonTitle>
        </StyledButton>
      </ButtonContainer>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.session.token,
    isLoading: state.personalInfo.isLoading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
      paymentEstimate: (token, hashedId, stripeToken) => dispatch(PaymentEstimateAction(token, hashedId, stripeToken))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CardView);

const Container = styled(View)`
  width: 100%;
  height: 500px;
`
const ButtonContainer = styled (View)`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
`
const StyledButton = styled(TouchableOpacity)`
  width: 30%;
  height: 50px;
  justify-content: center;
  align-items: center;
`
const ButtonTitle = styled(Text)`
  font-size: 20px;
  color: green;
`

