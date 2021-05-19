import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { navigate } from 'src/utils/navigation';
import Theme from "../../theme/Theme";
import moment from "moment"
import { connect } from "react-redux";
import { updateNotification } from "src/store/Notification/action";

class Notification extends React.Component {
    onPressItem = () => {
      const {item} = this.props;
      let newItem = {
        ...item,
        check: true,
      }

    this.props.updateNotification(newItem);

    if(item.launchURL == undefined || item.launchURL == null)
      return;

    let launchURL = item.launchURL.split('?')[0]
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

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={() =>this.onPressItem()}>
              <View style={styles.contentContainer}>
                <View style={{flex: 10}}>
                  <View style={{ flexDirection: 'row'}}>
                        <Text numberOfLines={1} style={{ color: Theme.black, fontSize: Theme.fontSubTitle }}>{this.props.item.title}</Text>
                        {/* <View style={{flex: 1}}>
                          <Text numberOfLines={1} style={{ color: Theme.black, fontSize: Theme.fontText }}>{this.props.item.message}</Text>
                        </View> */}
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 3 }}>
                        <Text numberOfLines={1} style={{ color: Theme.black, fontSize: Theme.fontText }}>{moment(this.props.item.date).format('MMM DD YYYY')} - </Text>
                        <Text numberOfLines={1} style={{ color: Theme.black, fontSize: Theme.fontText }}>{moment(this.props.item.date).format('h:mm A')}</Text>
                  </View>
                </View>

                <View style={{flex: 1}}>
                  {!this.props.item.check && <View style={styles.circle}/>}
                </View>
              </View>

              <View style={styles.line}></View>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateNotification: (data) => dispatch(updateNotification(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  contentContainer: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  line: {
      borderColor: Theme.black,
      opacity: 0.5,
      borderWidth: 0.5
  },
  circle: {
    alignSelf: "flex-end",
    width: 1,
    borderRadius: 5,
    borderWidth:5,
    borderColor: Theme.primary,
  }
});