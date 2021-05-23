import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import { Colors } from 'src/theme';
import { navigate } from 'src/utils/navigation';
import Icon from 'react-native-vector-icons/FontAwesome5'
import {drawer} from 'src/App'
import { useDispatch } from "react-redux";

const Header = (props) => {
  const dispatch = useDispatch();

  const onPressNotification = () => {
    navigate('MyNotificationScreen');
  }

  return (
    <Container> 
      
        <TouchableOpacity
          onPress = {()=>navigate(props.routeName)}
        >
        <Icon name="arrow-left" size={20} /> 
      </TouchableOpacity>   
    
         
      { props.title && <Title>{props.title}</Title> }
      { props.message ? 
        <TouchableOpacity onPress={()=>onPressNotification()}>
          <Image 
            source={require('src/assets/img/dashboard/bell-alert.png')} 
            style={{width: 30, height: 30}} />
          </TouchableOpacity>:
        <View />       
      }
    </Container>
  );
};

export default Header;

const Container = styled(View)`
  width: 100%;
  height: 50px;
  background-color: #99C3EE;
  justify-content: space-between;
  flex-direction: row;
  padding-horizontal: 20px;
  align-items: center;
`;
const Title = styled(Text)`
  color: black;
  font-size: 18px;
  font-weight: 400;
  text-align: center;
`;
