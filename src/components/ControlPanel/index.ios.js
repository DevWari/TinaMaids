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
    id: "item2",
    title: "Account",
    routeName: "MyAccount",
    source: require('src/assets/img/menu/menu2.png')
  },
  {
    id: "item3",
    title: "My Invoices",
    routeName: "NotPaidInvoiceScreen",
    source: require('src/assets/img/menu/menu3.png')
  },
  {
    id: "item4",
    routeName: "EstimateThree",
    title: "My Estimates",
    routeName: "MyEstimate",
    source: require('src/assets/img/menu/menu4.png')
  },
  {
    id: "item5",
    title: "My Appointments",
    routeName: "MyAppointment",
    source: require('src/assets/img/menu/menu5.png')
  },
  {
    id: "item6",
    title: "Speak To Us",
    routeName: "SpeakScreen",
    source: require('src/assets/img/menu/menu6.png')
  },
  {
    id: "item7",
    title: "Messages",
    routeName: "MyMessageScreen",
    source: require('src/assets/img/menu/menu7.png')
  },
  {
    id: "item8",
    title: "Notifications",
    routeName: "MyNotificationScreen",
    source: require('src/assets/img/menu/menu8.png')
  },
  {
    id: "item9",
    title: "Settings",
    routeName: "SettingScreen",
    source: require('src/assets/img/menu/menu9.png')
  },
  {
    id: "item10",
    title: "Franchise Opportunity",
    routeName: "FranchiseOpportunity",
    source: null
  },
  {
    id: "item11",
    title: "Tina Maids Franchise, LLC.",
    source: null
  }
];

const Item =({ item, index, separators }) => {
   return ( 
    item.id == "item11" ? 
      <View style = {{flexDirection: 'row', flex: 1, alignItems: 'center', height: 60,}}>
        <Text style={{fontSize: 15, marginLeft: 20}}>{item.title}</Text>
      </View>:
     <TouchableOpacity
        key={item.id}
        onPress={() => {navigate(item.routeName, {hashed_id: null}); drawer.current.close()}}
      >  
        <View style = {{flexDirection: 'row', flex: 1, alignItems: 'center', height: 60, borderColor: 'gray',  borderBottomWidth: 1}}>
          <Image source={item.source} style={{marginLeft: 10}} />
          <Text style={{fontSize: 15, marginLeft: 10}}>{item.title}</Text>
        </View>
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
    />
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
  background-color: #15892E;
`
const HeaderTitle = styled (Text)`
  font-size: 20px;
  height: 25px;
  color: white;
`