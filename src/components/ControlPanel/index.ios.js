import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList,
  Image,
} from 'react-native';
import styled from 'styled-components/native';
import { Colors } from 'src/theme';
import { navigate } from 'src/utils/navigation';
import {drawer} from 'src/App';

const DATA = [
  {
    id: "item1",
    title: "Dashboard",
    routeName:"Dashboard",
    source: require('src/assets/img/menu/menu1.png')
  },
  
  {
    id: "item8",
    title: "Notifications",
    routeName: "MyNotificationScreen",
    source: require('src/assets/img/menu/menu8.png')
  },  
];

const Item =({ item, index, separators }) => {
   return ( 
    <TouchableOpacity
       key={item.id}
       onPress={() => {navigate(item.routeName, {hashed_id: null}); drawer.current.close()}}
       style = {{flexDirection: 'row', width: '100%', alignItems: 'center', height: 50, borderColor: 'gray',  borderBottomWidth: 1}}
     >      
      <Image source={item.source} style={{marginLeft: 21}} />
      <Text style={{fontSize: 15, marginLeft: 15}}>{item.title}</Text>      
    </TouchableOpacity>
   )
}

const ControlPanel = () => {
  return (
    <Container>  
      <Header>
        <HeaderTitle>Menu</HeaderTitle>
      </Header>
      <FlatList
          
          data={DATA}
          renderItem={({ item, index, separators }) => 
              <Item item={item} separators={separators} index={index} />
          }   
          style={{width: '100%'}}
      />
      <Text style={{fontSize: 14, fontWeight: '400'}}>Copyright © 2021 Clean Jeff, LLC.</Text>
      <Text style={{fontSize: 14, marginTop: 10, fontWeight: '400'}}>Powered by</Text>
      <Image source={require('src/assets/img/menu/logo.png')} style={{marginBottom: 26, marginTop: 7}} />     
    </Container>
  );
};
export default ControlPanel;

const Container = styled(View)`
  flex: 1;
  background-color: white;
`;
const Header = styled (View)`
  width: 100%;
  height: 100px;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 20px;
  background-color: #99C3EE;
`
const HeaderTitle = styled (Text)`
  font-size: 15px;
  height: 25px;
  color: black;
`