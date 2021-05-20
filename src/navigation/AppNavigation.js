import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createSwitchNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import LoginScreen from 'src/screens/LoginScreen';
import RegisterScreen from 'src/screens/RegisterScreen';
import OnboardScreen from '../screens/OnboardScreen';
import MyMessageScreen from '../screens/MyMessage/MyMessageScreen';
import NewMessage from '../screens/MyMessage/NewMessage';
import MessageList from '../screens/MyMessage/MessageList';
import MessageDetail from '../screens/MyMessage/MessageDetail';
import MessageReply from '../screens/MyMessage/MessageReply';
import MyNotificationScreen from '../screens/MyNotification/MyNotificationScreen';
import SettingScreen from '../screens/Settings/SettingScreen';
import ChangePassword from '../screens/Settings/ChangePassword';
import AboutUs from '../screens/Settings/AboutUs';
import FranchiseOpportunity from '../screens/Settings/FranchiseOpportunity';
import MyAppointment from '../screens/MyAppointment/MyAppointment';
import AppointmentOption from '../screens/MyAppointment/AppointmentOption';
import AppointmentThankyou from '../screens/MyAppointment/AppointmentThankyou';
import AppointmentOne from '../screens/MyAppointment/AppointmentOne';
import Dashboard from 'src/screens/Dashboard';
import MyAccount from 'src/screens/MyAccount';
import Blog from 'src/screens/Blog';
import Support from 'src/screens/Support';
import AuthLoadingScreen from 'src/screens/AuthLoadingScreen';
import MyEstimate from 'src/screens/MyEstimate';
import SpeakScreen from 'src/screens/SpeakScreen';
import PaidInvoiceScreen from 'src/screens/MyInvoice/PaidInvoiceScreen';
import NotPaidInvoiceScreen from 'src/screens/MyInvoice/NotPaidInvoiceScreen';
import Invoice from 'src/screens/MyInvoice/Invoice';
import InformationScreen from 'src/screens/MyEstimate/InformationScreen';
import JobScreen from 'src/screens/MyEstimate/JobScreen';
import HomeScreen from 'src/screens/MyEstimate/HomeScreen';
import RequestScreen from 'src/screens/MyEstimate/RequestScreen';
import ResultScreen from 'src/screens/MyEstimate/ResultScreen';
import PersonalInfo from 'src/screens/MyEstimate/PersonalInfo';
import PaymentScreen from 'src/screens/PaymentScreen'
import InvoicePaymentScreen from 'src/screens/InvoicePaymentScreen'
import ForgotScreen from 'src/screens/ForgotScreen'
import TermsView from 'src/screens/TermsView'

import {
  View,
  Image,
} from 'react-native'
import React from 'react'
const AuthStack = createStackNavigator(
  {
    LoginScreen,
    RegisterScreen,
    ForgotScreen,
    OnboardScreen,
    TermsView
  },
  {
    initialRouteName: 'OnboardScreen',
    headerMode: 'none',
    mode: 'modal'
  }
);
const AppStack = createStackNavigator(
  {
    MyMessageScreen,
    NewMessage,
    MessageList,
    MessageDetail,
    MessageReply,
    MyNotificationScreen,
    SettingScreen,
    ChangePassword,
    AboutUs,
    FranchiseOpportunity,
    MyAppointment,
    MyEstimate,
    InformationScreen,
    JobScreen,
    HomeScreen,
    RequestScreen,
    ResultScreen,
    PersonalInfo,
    SpeakScreen,
    PaidInvoiceScreen,
    NotPaidInvoiceScreen,
    Invoice,
    Blog,
    AppointmentOption,
    AppointmentThankyou,
    AppointmentOne,
    PaymentScreen,
    InvoicePaymentScreen,
    
  },
  {
    initialRouteName: 'MyNotificationScreen',
    headerMode: 'none',
    //mode: 'modal'
  }
);
const MainTab = createBottomTabNavigator (
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {                    
          tabBarIcon: ({tintColor}) => {
              return (
                  <View>
                      <Image source={require('src/assets/img/dock/dock1.png')} />
                  </View>
              )                                      
          }
      }
    },
    MyAccount: {
      screen: MyAccount,
      navigationOptions: {                     
          tabBarIcon: ({tintColor}) => {
              return (
                <View>
                  <Image source={require('src/assets/img/dock/dock2.png')} />
                </View>
              )                    
          }
        }
    },
    Support: {
      screen: Support,
      navigationOptions: {                  
          tabBarIcon: () => {
              return (
                <View>
                  <Image source={require('src/assets/img/dock/dock3.png')} />
                </View>
              )                    
          }
        }
    },
    AppStack: {
      screen: AppStack,
      navigationOptions: {
        tabBarButton: () => null,
        tabBarButtonComponent: () => null,
        tabBarLabel: () => null,
      },
    },
    
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      style:{
        height:41.5,
        backgroundColor: 'white',
        padding: 10
      },
      showLabel : false
  
    }, 
  },  
)


export const RootNavigator = createAppContainer(
	createSwitchNavigator(
		{
      AuthLoadingScreen: AuthLoadingScreen,
      App: MainTab,
			Auth: AuthStack,
		},
		{
			initialRouteName: 'AuthLoadingScreen',
		},
	),
);