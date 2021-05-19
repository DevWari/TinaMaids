import React, {useEffect} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Colors } from 'src/theme';
import { navigate } from 'src/utils/navigation';

const TabBar = (props) => {

  return (
    <Container> 
      <Tab1>
        <TouchableOpacity onPress={()=>navigate(props.route1, {paid_status: "not paid"})}>
          <TabTitle>{props.tap1}</TabTitle>
        </TouchableOpacity>
      </Tab1>
      <Tab2>
        <TouchableOpacity onPress={()=>navigate(props.route2,{paid_status: "paid"})}>
          <TabTitle>{props.tap2}</TabTitle>
        </TouchableOpacity>
      </Tab2>
    </Container>
  );
};
export default TabBar;

const Container = styled(View)`
  width: 100%;
  height: 50px;
  background-color: #D8D8D8;
  flex-direction: row;
  align-items: center;
`;
const Tab1 = styled(View)`
  flex: 1;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-right-width: 0.5px;
  border-color: gray;
`;
const Tab2 = styled(View)`
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;
const TabTitle = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;
const Title = styled(Text)`
  color: black;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
`;
