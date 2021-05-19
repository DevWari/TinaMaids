import React, { version } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Image
} from "react-native";

import { navigate } from 'src/utils/navigation';
import Menu from 'src/components/Menu';
import Colors from 'src/theme/Colors';
import Theme from 'src/theme/Theme';
import { connect, useSelector } from "react-redux";
import DropDownPicker from 'react-native-dropdown-picker';
import { getMessageDetailAction } from "../../store/Chat/action";
import Spinner from 'react-native-loading-spinner-overlay';

class MessageDetail extends React.Component {
  state = {
    selected: "Inbox",
    loading: false,
    title: "",
    hashed_id: this.props.navigation.state?.params?.hashed_id,
    messageDetail: this.props.messageDetail?.data,
  };

  componentDidMount () {
    if (!this.props.token) {
      navigate('LoginScreen')
      return
    }
    else this.getMessageDetail(this.props.navigation.state?.params?.hashed_id);
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.navigation.state?.params?.hashed_id != this.props.navigation.state?.params?.hashed_id)
    {
      this.getChatMessages(this.props.navigation.state?.params?.hashed_id);
      this.setState({hashed_id: this.props.navigation.state?.params?.hashed_id});
    }
    if(this.props.messageDetail != undefined && prevProps.messageDetail?.data != this.props.messageDetail?.data)
    {
      this.setState({messageDetail: this.props.messageDetail?.data})
    }
  }

  getMessageDetail (hashed_id) {
    const data = {
      id: hashed_id
    }
    this.props.getMessageDetail(data, this.props.token)
  }
  
  onPressHistory = () => {
    const {
      selected,
    } = this.state;

    this.setState({selected: "History"})
    navigate('MyMessageScreen', {selected: 'History'});
  };

  onPressInbox = () => {
    const {
      selected,
    } = this.state;

    this.setState({selected: "Inbox"})
    navigate('MyMessageScreen', {selected: 'Inbox'});
  };

  onChangeTitle = (text) => {
    this.setState({
        title: text,
    })
  }

  onChangeMessage = (text) => {
      this.setState({
          message: text,
      })
  }

  render() {
    const { loading, selected, messageDetail } = this.state;

    return (
      <View style={styles.container}>
        <Menu title="My Messages" message={false}/>
        {/* { loading && 
          <ActivityIndicator style={styles.spinnerStyle} animating={loading} size="large" color={'lightgreen'} />
        } */}
        <Spinner 
          visible={this.props.isLoading}
          textContent={'Loading...'}
          textStyle={{color:'#FFF'}}
        />
        <View style={{height: 2}}></View>
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity style={[styles.btnTabContainer,{marginRight: 2}]} onPress={()=>this.onPressInbox()}>
            <Text style={ [styles.btnTab, selected == "Inbox" ? {backgroundColor: Theme.primaryDark} : {backgroundColor: Theme.primary}]}>
              Inbox
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnTabContainer,{marginLeft: 2}]} onPress={()=>this.onPressHistory()}>
            <Text style={ [styles.btnTab, selected == "History" ? {backgroundColor: Theme.primaryDark} : {backgroundColor: Theme.primary}]}>
              History
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          <Text style={styles.title}>Detailed Message</Text>
          <View style={{flexDirection: "row", marginTop: 20, alignItems: "center"}}>
            <View style={{ height: 80, width: 80, borderRadius: 100, borderWidth: 1, overflow: "hidden", borderColor: "lightgray"}}>
              {messageDetail?.creator?.user_type == 3 &&
                  <Image
                    source={Theme.user_assest}
                    style={{ height: 80, width: 80, resizeMode: "stretch"}}
                  />
              }
              { messageDetail?.creator?.user_type != undefined &&
                <Image
                  source={Theme.user_tinamaids}
                  style={{ height: 80, width: 80, resizeMode: "stretch"}}
                  />
                }
            </View>
          
            <View>
              <Text style={styles.message}>
                {messageDetail?.creator.name}
              </Text>
              <Text style={styles.message}>
                {messageDetail?.creator.email}
              </Text>
            </View>
          </View>

          <View style={{height: 15}}></View>
          <View style={styles.line}></View>
          <View style={{height: 15}}></View>

          <Text style={styles.message}>
            { messageDetail?.message }
          </Text>
          <View style={{height: 15}}></View>
          <View style={styles.line}></View>
          <View style={{height: 15}}></View>

          <View style={{flexDirection: "row", justifyContent: "center"}}>
            <TouchableOpacity style={styles.btnSendWrapper} onPress={() => navigate('MessageReply', {messageSent: true, hashed_id: messageDetail?.chat?.hashed_id })}>
                <Text style={styles.btnSend}>
                  Reply
                </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.session.token,
    isLoading: state.chats.isLoading,
    status: state.chats.status,
    messageDetail: state.chats.messageDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMessageDetail: (data, token) => dispatch(getMessageDetailAction(data,token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white
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
  body: {
    marginTop: 20,
    paddingHorizontal: 20
  },
  title: {
    marginVertical: 10,
    color: Theme.black,
    fontSize: Theme.fontTitle,
    fontWeight: "bold"
  },
  message: {
    paddingLeft: 10,
    marginVertical: 10,
    color: Theme.black,
    fontSize: Theme.fontSubTitle,
  },
  btnSendWrapper: {
    marginTop: 35,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#c7c7c7",
    backgroundColor: Theme.primaryDark,
  },
  btnSend: {
    color: Theme.white,
    fontSize: Theme.fontSubTitle,
    paddingHorizontal: 60,
    paddingVertical: 4,
    textAlign: "center"
  },
  line: {
    borderColor: Theme.black,
    opacity: 0.5,
    borderWidth: 0.5
  }
});
