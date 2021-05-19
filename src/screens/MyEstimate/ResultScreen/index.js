import React from 'react';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components/native';
import { Colors } from 'src/theme';
import Menu from 'src/components/Menu'
import TabBar from 'src/components/TabBar'

const ResultScreen = () => {
  return (
      <Container>    
        <Menu title="My Estimates"/>
        <TabBar 
          tap1="My Estimates"
          route1="MyEstimate"
          tap2="Request New"
          route2="InformationScreen"
        />
        <Footer />
        <TitleContainer textColor={Colors.textColor}>
          <Title textColor={Colors.textColor}>Thank you!</Title>
        </TitleContainer>
        <Footer />
        <Content textColor={Colors.textColor}>We have received your request. You should receive an e-mail with your estimated price within 60 minutes or less. Follow the link on your estimate to continue. </Content>
        <Image source={require('src/assets/img/result/result.png')}
          resizeMode="stretch"
          style={{width: '100%'}}
        />
      </Container>
  
  );
};
export default ResultScreen;

const Container = styled(View)`
  flex: 1;
  align-items: center;
`;
const Title = styled(Text)`
  font-size: 30px;
  flex: 1;
  text-align: center;
  color: ${props=>props.textColor}
`
const TitleContainer = styled(View)`
  width: 70%;
  height: 50px;
  padding-bottom: 10px;
  border-bottom-width: 2px;
  border-color: ${props=>props.textColor}
`
const Content = styled(Text)`
  font-size: 25px;
  flex: 1;
  width: 90%;
  color: ${props=>props.textColor}
  margin-bottom: 10px;
  text-align: center;
`

const Footer = styled (View)`
  height: 20px;
`

