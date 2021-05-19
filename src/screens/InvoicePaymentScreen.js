import React from 'react';
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
import { Dropdown } from 'react-native-material-dropdown-v2';
import {connect} from 'react-redux';
import {InvoicePaymentAction} from 'src/store/Payment/action';
import Spinner from 'react-native-loading-spinner-overlay';

class InvoicePaymentScreen extends React.Component {
  
  state = {
    existingCardChoice: 1,
    cardID: null,
    name: '',
    cardNumber: '',
    cvcNumber: '',
    expiration: '',
    hashedId: this.props.navigation.state?.params?.hashed_id,
    cardData: null,
    publishKey: null,
    selectedCardID: null,
  }
   
  onPay = async() => {
    
    const {
        existingCardChoice, 
        hashedId, 
        cardData, 
        expiration, 
        cardNumber, 
        cvcNumber, 
        selectedCardID,
        publishKey,
        name, 
    } = this.state
    
    let data = null;
    if (existingCardChoice == 2) {
        data = {
            hashed_id: hashedId,
            card_choice: existingCardChoice,
            existing_card_choice: existingCardChoice,
            stripe_token: selectedCardID
        }
    }
    else {
        
        var stripe = require ('stripe-client')(publishKey)
        let exp = expiration.split('/')
        if (exp == '' || exp.length < 2) {
            Alert.alert("Invalid Expiration!")
            return
        }
        var information = {
            card: {
                number: cardNumber.replace(/\s/g, "") ,
                exp_month: exp[0],
                exp_year: "20"+exp[1],
                cvc: cvcNumber,
                // name: name
            }
        }
        var card = await stripe.createToken(information);
        var stripeToken = card.id;
        if ( stripeToken ){
          data = {
            hashed_id: hashedId,
            card_choice: existingCardChoice,
            existing_card_choice: existingCardChoice,
            stripe_token: stripeToken
          }
        }else{
            Alert.alert("Card Error!")
        }
    }
    this.props.invoicePayment (data, this.props.token)
  }
  componentDidMount () {
    if (!this.props.token) {
        navigate('LoginScreen')
        return
    }
    const { navigation } = this.props
    this.focusListener = navigation.addListener("didFocus", () => {
      this.setState ({hashedId: navigation.state.params.hashedId })
    })
  }
  
  static getDerivedStateFromProps(nextProps, prevState){

    if(nextProps.data!==prevState.data && nextProps.data){
      let cardArray = new Array()
      
      nextProps.data.cards.map ((item) => {
          cardArray.push({
          label: "************" + item.last4,
          value: item.id,
        })
      })
      return { cardData: cardArray, publishKey: nextProps.data.stripe_public, selectedCardID: cardArray.length > 0? cardArray[0].value: null};      
    }
    else return null;
  }
 
   render () {
    return (
        <ScrollView>
          <Spinner 
            visible={this.props.isLoading}
            textContent={'Loading...'}
            textStyle={{color:'#FFF'}}
          />   
          <Container>    
            <Menu title="Payment"/>
            <Footer />
            <Title>Change payment card for this estimate</Title>
            <Footer />
            <InputTitle>Choose card:</InputTitle>
            {
                this.state.cardData && this.state.cardData.length > 0 ?
                <Dropdown
                  data = {[
                    {label: 'New card', value: 1},
                    {label: 'Existing card', value: 2},
                  ]}  
                  value={'New card'}
                  containerStyle = {{width: '90%', marginBottom: 20 }}
                  onChangeText = {(value, index, data) => this.setState({existingCardChoice: value})}
                />:
                <Dropdown
                  data = {[
                    {label: 'New card', value: 1},                   
                  ]}  
                  value={'New card'}
                  containerStyle = {{width: '90%', marginBottom: 20 }}
                  onChangeText = {(value, index, data) => this.setState({existingCardChoice: value})}
                />
            }
            {
              this.state.existingCardChoice == 1 &&
              <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 0}}>
                <InputTitle>Name on Card</InputTitle>
                <Footer />
                <Input 
                placeholderTextColor = "grey"
                placeholder="William"
                onChangeText={name => this.setState({name})}
                value={this.state.name}
                />
                <InputTitle>Credit Card Number</InputTitle>
                <Footer />
                <Input 
                placeholder="4242424242424242"
                placeholderTextColor = "grey"
                onChangeText={cardNumber => this.setState({cardNumber})}
                value={this.state.cardNumber}
                />
                <InputTitle>CVC Number</InputTitle>
                <Footer />
                <Input 
                placeholder="123"
                placeholderTextColor = "grey"
                onChangeText={cvcNumber => this.setState({cvcNumber})}
                value={this.state.cvcNumber}
                />
                <InputTitle>Expiration</InputTitle>
                <Footer />
                <Input 
                placeholder="10/20"
                placeholderTextColor = "grey"
                onChangeText={expiration => this.setState({expiration})}
                value={this.state.expiration}
                />
             </View>
            }
            {
              this.state.existingCardChoice == 2 && this.state.cardData && this.state.cardData.length > 0 &&
              <View style={{width: '100%', alignItems: 'center'}}>
                <InputTitle>Choose existing card</InputTitle>
                <Dropdown
                    data={this.state.cardData}     
                    value={this.state.cardData[0].label}
                    containerStyle = {{width: '90%', marginBottom: 20}}
                    onChangeText = {(value, index, data) => this.setState({selectedCardID: value})}
                />
              </View>  
            }  
            <SaveButton 
              bgColor = {Colors.textColor}
              onPress={this.onPay}
            >
              <ButtonTitle>Continue</ButtonTitle>
            </SaveButton>
            <Footer />
          </Container>
        </ScrollView>
      );
  }
}


const mapStateToProps = (state) => {
  return {
    isLoading: state.payment.isLoading,
    status: state.payment.status,
    data: state.payment.data,
    token: state.session.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
    invoicePayment: (data, token) => dispatch(InvoicePaymentAction(data, token))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(InvoicePaymentScreen);

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
