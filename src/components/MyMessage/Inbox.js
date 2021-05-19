import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { navigate } from 'src/utils/navigation';
import Theme from "../../theme/Theme";
import { moveChatToHistoryAction } from "../../store/Chat/action";
import { connect } from "react-redux";

class Inbox extends React.Component {
    onPressedItem () {
      if( this.props.item.user_id1 == this.props.user?.id ) { // Only chats those are created by current user can be moved to history. User_id1 is field that respresents who created chat
        let data = {
          id: this.props.item.hashed_id
        }
        this.props.moveChatToHistory(data, this.props.token);
      }
      navigate('MessageList', {hashed_id: this.props.item?.hashed_id});
    }
    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.onPressedItem()}>
              <View style={styles.contentContainer}>
                <View style={{ flexDirection: 'row'}}>
                      <Text numberOfLines={1} style={{ color: Theme.black, fontSize: Theme.fontSubTitle }}>{this.props.item.sendername} - </Text>
                      <View style={{flex: 1}}>
                        <Text numberOfLines={1} style={{ color: Theme.black, fontSize: Theme.fontSubTitle }}>{this.props.item.message}</Text>
                      </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 3 }}>
                      <Text numberOfLines={1} style={{ color: Theme.black, fontSize: Theme.fontText }}>{this.props.item.date} - </Text>
                      <Text numberOfLines={1} style={{ color: Theme.black, fontSize: Theme.fontText }}>{this.props.item.time}</Text>
                </View>
              </View>

              <View style={styles.line}></View>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    token: state.session.token,
    user: state.session?.user?.user,
    isLoading: state.chats.isLoading,
    status: state.chats.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    moveChatToHistory: (data, token) => dispatch(moveChatToHistoryAction(data,token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  line: {
      borderColor: Theme.black,
      opacity: 0.5,
      borderWidth: 0.5
  }
});