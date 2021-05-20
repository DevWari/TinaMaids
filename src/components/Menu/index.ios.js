import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import { Colors } from 'src/theme';
import { navigate } from 'src/utils/navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import {drawer} from 'src/App'
import { useDispatch } from "react-redux";

const Header = (props) => {
  const dispatch = useDispatch();

  const onPressNotification = () => {
    navigate('MyNotificationScreen');
  }

  return (
    <Container> 
      {
        props.draw == true? <View />: 
        <TouchableOpacity
          onPress = {()=>drawer.current.open()}
        >
          <Icon name="menu" size={40} /> 
        </TouchableOpacity>    
      }
        
      { props.title && <Title>{props.title}</Title> }
      { props.message ?
        <TouchableOpacity onPress={()=>onPressNotification()}>
          <Image source={require('src/assets/img/dashboard/bell-alert.png')} />
            <Warning />
          </TouchableOpacity>:
        <View style={{width: 30}} />     
      }
    </Container>
  );
};
export default Header;

const Container = styled(View)`
  width: 100%;
  height: 100px;
  background-color:#99C3EE;
  justify-content: space-between;
  flex-direction: row;
  padding-horizontal: 20px;
  padding-bottom: 10px;
  align-items: flex-end;
`;
const Title = styled(Text)`
  color: black;
  font-size: 18px;
  font-weight: 400;
  text-align: center;  
`;
const Warning = styled (View)`
  width: 6px;
  height: 6px;
  background-color: red;
  border-radius: 3px;
  position: absolute;
  top: 0;
  right:-3px;
`