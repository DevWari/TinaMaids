import React from 'react'
import styled from 'styled-components/native'
import {View, Text, TouchableOpacity, Image} from 'react-native'

const SlideComponent = (props) => {
  return (
    <Container>
      <TitleContainer>
        <TouchableOpacity onPress={()=>props.closeSlide()}>
          <Text style={{color: '#549af2', fontSize: 20}}>Cancel</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Select Payment Method</Text>
       <View style={{width: 30}} />
      </TitleContainer>
      <View style={{height: 35}} />
      <PaymentContainer onPress={()=>props.closeSlide()}>
        <Image source={require('src/assets/img/estimate/stripe.png')} />
        <PaymentTitle>Stripe</PaymentTitle>
      </PaymentContainer>
      <PaymentContainer onPress={()=>props.closeSlide()}>
        <Image source={require('src/assets/img/estimate/debit.png')} />
        <PaymentTitle>Create or Debit Card</PaymentTitle>
      </PaymentContainer>
    </Container>
  )
}

export default SlideComponent

const Container = styled(View)`
  flex: 1;
`
const TitleContainer = styled(View)`
  flex-direction: row;
  height: 50px;
  border-bottom-width: 1px;
  border-color: gray;
  justify-content: space-between;
  align-items:center;
`
const PaymentContainer = styled(TouchableOpacity)`
  flex-direction: row;
  height: 50px;
  border-bottom-width: 1px;
  border-color: gray;
  align-items:center;
`
const PaymentTitle = styled(Text)`
  font-size: 20px;
  margin-left: 20px;
`