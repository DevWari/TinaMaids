import React from 'react'
import {
  View,
  Text,
  Image,
  ImageBackground
} from 'react-native'
import styled from 'styled-components/native'
import {connect} from 'react-redux'

const Header = (props) => {
  return (
    <Container>
      <Image source={require('src/assets/img/dashboard/dash-top-logo.png')} style={{marginLeft: 4}} />
      {/* <ContentContainer>
        <Image source = {require('src/assets/img/dashboard/tree.png')} style={{marginLeft: 15}} />
        <UserContainer>
          <SunContainer>
            <Image source={require('src/assets/img/dashboard/sun.png')} />
          </SunContainer>
          <WelcomeContainer>
            <WelcomeTitle>{props.name? 'Welcome' : ''}</WelcomeTitle>
            <User>{props.name? props.name : ''}</User>
          </WelcomeContainer>
        </UserContainer>
      </ContentContainer>   */}
      <Name>Welcome, {'\n'}{props.name? props.name : ''}</Name>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    name: state.session.userName
  };
};
export default connect(mapStateToProps, null)(Header);

const Container = styled(View)`
  width: 100%;
  height: 51px;
  border-bottom-width: 2px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const Name = styled (Text)`
  font-size: 14px;  
  text-align: right;  
  margin-right: 8px;
  font-weight: 400;
`