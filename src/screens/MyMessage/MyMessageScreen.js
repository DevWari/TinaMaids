import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { navigate } from 'src/utils/navigation';
import Menu from 'src/components/Menu';
import Colors from 'src/theme/Colors';
import Theme from 'src/theme/Theme';
import Inbox from 'src/components/MyMessage/Inbox'
import InboxHistory from 'src/components/MyMessage/InboxHistory'
import Icon from 'react-native-vector-icons/Ionicons'
import { getChatsAction, getChatsHistoryAction } from "../../store/Chat/action";
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from "moment"

const messageData = [
  {
    id: 1,
    sendername: "Jonnas Doe",
    message: "Questions about my past experience and project",
    date: "May 14 2020",
    time: "4: 30 PM",
  },
]

const historyData = [
  {
    id: 2,
    sendername: "Durkaie caie",
    message: "This is test data for history",
    date: "Sep 12 2020",
    time: "3: 22 PM",
  },
]

class MyMessageScreen extends React.Component {
  state = {
    selected: "Inbox",
    loading: false,
    messageSent: false,
    messageContent: false,
    chatsData: [],
    chatsHistory: [],
  };

  componentDidMount () {
    // if (!this.props.token) {
    //   navigate('LoginScreen')
    //   return
    // }
   
      this.getChats();
      //this.getChatshisory();
    
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (this.props.status == 200) {
      this.getChats();
      //this.getChatshisory();
    }

    if(prevProps.navigation.state.params?.selected != this.props.navigation.state.params?.selected)
    {
      this.setState({selected: this.props.navigation?.state?.params?.selected != undefined ? 
        this.props.navigation?.state?.params?.selected : "Inbox"})
    }

    if(prevProps.navigation.state.params?.messageSent != this.props.navigation.state.params?.messageSent)
    {
      this.setState({messageSent: this.props.navigation?.state?.params?.messageSent != undefined ? 
        this.props.navigation?.state?.params?.messageSent : false,
        messageContent: this.props.navigation.state.params?.message})
    }

    if (this.props.chatsData?.data?.chats != undefined && prevProps.chatsData?.data?.chats != this.props.chatsData?.data?.chats) {
      let newData = [];
      this.props.chatsData?.data?.chats.forEach(item => {
        let temp = {
          id: item.id,
          hashed_id: item.hashed_id,
          sendername: item.name1,
          user_id1: item.user_id1,
          user_id2: item.user_id2,
          receivername: item.name2,
          message: item.title,
          date: moment(item.updated_at).format("MMM DD YYYY"),
          time: moment(item.updated_at).format("h : mm A"),
        }
        newData.push(temp);
      });
      this.setState({ chatsData: newData });
    }

    if (this.props.chatsHistory?.data?.chats != undefined && prevProps.chatsHistory?.data?.chats != this.props.chatsHistory?.data?.chats) {
      let newData = [];
      this.props.chatsHistory?.data?.chats.forEach(item => {
        let temp = {
          id: item.id,
          hashed_id: item.hashed_id,
          sendername: item.name1,
          user_id1: item.user_id1,
          user_id2: item.user_id2,
          receivername: item.name2,
          message: item.title,
          date: moment(item.updated_at).format("MMM DD YYYY"),
          time: moment(item.updated_at).format("h : mm A"),
        }
        newData.push(temp);
      });
      this.setState({ chatsHistory: newData });
    }

  }

  getChats() {
    this.props.getChats([], this.props.token)
  }

  getChatshisory () {
    this.props.getChatshisory([], this.props.token)
  }

  onPressHistory = () => {
    const {
      selected,
    } = this.state;

    this.setState({selected: "History"})
  };

  onPressInbox = () => {
    const {
      selected,
    } = this.state;

    this.setState({selected: "Inbox"})
  };

  onPressMessageClose = () => {
    this.setState({messageSent: false});
    this.props.navigation.setParams({messageSent: false})
  }
  render() {
    const { selected, messageSent, messageContent, chatsData, chatsHistory } = this.state;

    return (
      <View style={styles.container}>
        <Menu title="My Messages" message={false}/>
        {/* { this.props.isLoading && 
          <ActivityIndicator style={styles.spinnerStyle} animating={this.props.isLoading} size="large" color={'lightgreen'} />
        } */}
        <Spinner 
          visible={this.props.isLoading}
          textContent={'Loading...'}
          textStyle={{color:'#FFF'}}
        />
        <View style={{flexDirection: "row-reverse"}}>
          <TouchableOpacity style={styles.newMessageContainer} onPress={() => navigate('NewMessage')}>
            <Text style={styles.newMessage}>
              New Message
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity style={[styles.btnTabContainer,{marginRight: 2}]} onPress={this.onPressInbox}>
            <Text style={ [styles.btnTab, selected == "Inbox" ? {backgroundColor: Theme.primaryDark} : {backgroundColor: Theme.primary}]}>
              Inbox
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnTabContainer,{marginLeft: 2}]} onPress={this.onPressHistory}>
            <Text style={ [styles.btnTab, selected == "History" ? {backgroundColor: Theme.primaryDark} : {backgroundColor: Theme.primary}]}>
              History
            </Text>
          </TouchableOpacity>
        </View>

        { selected == "Inbox" ? 
          <FlatList
              data={chatsData}
              renderItem={({ item }) =>
                  <Inbox
                      item={item}
                      // navigation={this.props.navigation}
                  />}

              keyExtractor={item => item.hashed_id}
              ListFooterComponent={<View style={{height: 55}}></View>}
          />
          :
          <FlatList
            data={chatsHistory}
            renderItem={({ item }) =>
                <InboxHistory
                    item={item}
                    // navigation={this.props.navigation}
                />}

            keyExtractor={item => item.hashed_id}
            ListFooterComponent={<View style={{height: 55}}></View>}
          />
        }

      { messageSent == true && 
        <View style={styles.modal}>
          <View style={{position: "absolute", top: 5, right: 5}}>
            <TouchableOpacity onPress={()=>this.onPressMessageClose()}>
              <Icon name="close" size={40} color={Theme.white}/> 
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center', justifyContent: "center", alignSelf: "center"}}>
            <Text style={styles.textMessage}>
              {messageContent}
            </Text>
            {/* <Text style={styles.textMessage}>
              Successfully
            </Text> */}
          </View>
        </View>
      }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.session.token,
    isLoading: state.chats.isLoading,
    status: state.chats.status,
    chatsData: state.chats.chats,
    chatsHistory: state.chats.chatsHistory
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getChats: (data, token) => dispatch(getChatsAction(data,token)),
    getChatshisory: (data, token) => dispatch(getChatsHistoryAction(data,token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyMessageScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  newMessageContainer: {
    margin: 8,
    borderRadius: 8,
    backgroundColor: Theme.primaryDark
  },
  newMessage: {
    color: Theme.white,
    fontSize: Theme.fontSubTitle,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  btnTabContainer: {
    flex: 1,

  },
  btnTab: {
    color: Theme.white,
    fontSize: Theme.fontSubTitle,
    paddingVertical: 8,
    paddingHorizontal: 12,
    textAlign: "center",
  },
  spinnerStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
    justifyContent: "center",
  },
  modal: {
    position: 'absolute',
    top: 200,
    justifyContent: "center",
    alignSelf: "center",
    width: "60%",
    height: 160,
    borderRadius: 8,
    backgroundColor: Theme.primaryDark
  },
  textMessage: {
    color: Theme.white,
    fontSize: Theme.fontSubTitle,
    paddingVertical: 2,
  }
});
