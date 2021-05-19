import React from 'react';
import { 
  View, 
  ScrollView, 
} from 'react-native';
import styled from 'styled-components/native';
import { navigate } from 'src/utils/navigation';
import OneSignal from 'react-native-onesignal';
import { connect } from "react-redux";
import { addNotification } from "src/store/Notification/action";
import Menu from 'src/components/Menu';
import Header from './Header'
import Content from './Content'
import AsyncStorage from '@react-native-community/async-storage'
import {SetTokenAction} from 'src/store/Auth/action'

let _this = null;
class Dashboard extends React.Component {
  constructor (props) {
    super(props);
    
    _this = this;
    this._bootstrapAsync();
    this._setOneSignal();
   
    this.state = {
      isNotify: false,
      token: null
    }
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const user = await AsyncStorage.getItem('user');
    if (!userToken) navigate ('LoginScreen')
    else this.props.setToken(userToken, user)
  };

  _setOneSignal = async () => {
    OneSignal.setLogLevel(6, 0);
    OneSignal.init("2084fe55-dee1-4e62-a03c-4694f96e6f17", {kOSSettingsKeyAutoPrompt : false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption:2});
    OneSignal.inFocusDisplaying(2);
    
    OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    //OneSignal.addEventListener('inAppMessageClicked', this.onInAppMessageClicked);

    const user_type = await AsyncStorage.getItem('user_type');
    const user_hash = await AsyncStorage.getItem('user_hash');
    OneSignal.sendTags({'myid': user_hash, "type": user_type == 3 ? "customer" : "tinamaids"});
  }
  
  componentDidMount () {
    if (this.props.isReadNotify == false)
      this.setState({isNotify: true})
    else
      this.setState({isNotify: false})
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isReadNotify != this.props.isReadNotify) {
      if (this.props.isReadNotify == false)
        this.setState({isNotify: true})
      else
        this.setState({isNotify: false})
    }
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
    OneSignal.removeEventListener('inAppMessageClicked', this.onInAppMessageClicked);
  }

  onReceived(notification) {
    const bigPicture = notification.payload.bigPicture;
    const body = notification.payload.body;
    const launchURL = notification.payload.launchURL;
    const title =  notification.payload.title;

    const notifyData = {
      id: new Date().getTime(),
      title,
      message: body,
      bigPicture,
      launchURL,
      type: "message",
      date: new Date(),
      check: false,
    }

    _this.props.addNotification(notifyData);
  }

  onOpened(openResult) {
       
    let launchURL = openResult.notification.payload.launchURL.split('?')[0]
    let routeName = launchURL.split('/')[2];
    let hashed_id = launchURL.split('/')[3];
    
    if (routeName.toUpperCase() == "INVOICE")
      navigate('Invoice', {paid: false, hashedId: hashed_id});
    else if (routeName.toUpperCase() == "ESTIMATE")
      navigate('PersonalInfo', {accept: 1, hashedId: hashed_id});
    else if (routeName.toUpperCase() == "JOB")
      navigate('MyEstimate');
    else if (routeName.toUpperCase() == "ANNOUNCEMENTS")
      navigate("AppointmentOption", {hashed_id: hashed_id});
    else if (routeName.toUpperCase() == "CHATS")
      navigate('MessageList', {hashed_id: hashed_id});
      //navigate('MessageDetail', {hashed_id: hashed_id});
    else
      navigate('MyNotificationScreen');
  }
  
  onIds(device) {
    console.log('Device info: ', device);
  }

  onInAppMessageClicked = (actionResult) => {
    
    let launchURL = actionResult.click_url;
    if (launchURL != undefined) {
      let routeName = launchURL.split('/')[2];
      let hashed_id = launchURL.split('/')[3];
      
      if (routeName.toUpperCase() == "INVOICE")
        navigate('Invoice', {paid: false, hashedId: hashed_id});
      else if (routeName.toUpperCase() == "ESTIMATE")
        navigate('PersonalInfo', {accept: 1, hashedId: hashed_id});
      else if (routeName.toUpperCase() == "JOB")
        navigate('MyEstimate');
      else if (routeName.toUpperCase() == "ANNOUNCEMENTS")
        navigate("AppointmentOption", {hashed_id: hashed_id});
      else if (routeName.toUpperCase() == "CHATS")
        navigate('MessageList', {hashed_id: hashed_id});
        //navigate('MessageDetail', {hashed_id: hashed_id});
      else
        navigate('MyNotificationScreen');
    }
    
  }

  render() {
    const { isNotify } = this.state;

    return (
      <ScrollView>
        <Container>      
          <Menu message={isNotify}/>
          <Header />
          <Content />
        </Container>
      </ScrollView>
    );
  }
};

function myiOSPromptCallback(permission){
  
}

const mapStateToProps = (state) => {
  const { notifyData, isReadNotify } = state.notification;
  return {
    notifyData,
    isReadNotify,
    token: state.session.token,
    user: state.session.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNotification: (data) => dispatch(addNotification(data)),
    setToken: (token, user) => dispatch(SetTokenAction(token, user)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);


const Container = styled(View)`
  width: 100%;
  height: 100%;
  align-items: center;
`;
