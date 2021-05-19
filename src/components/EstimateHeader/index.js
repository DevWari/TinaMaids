import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { navigate } from 'src/utils/navigation';

const EstimateHeader = (props) => {
  return (
    <Container> 
      <TouchableOpacity onPress={()=>navigate("MyEstimate")}>
        <TabTitle>My Estimates</TabTitle>
      </TouchableOpacity>
    </Container>
  );
};
export default EstimateHeader;

const Container = styled(View)`
  width: 100%;
  height: 50px;
  background-color: #D8D8D8;
  flex-direction: row;
  align-items: center;
`;
const TabTitle = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding-left: 20px;
`;
