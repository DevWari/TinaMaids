import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { navigate } from 'src/utils/navigation';
import Theme from "../../theme/Theme";

class InboxHistory extends React.Component {
    onPressedItem () {

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
export default InboxHistory;

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