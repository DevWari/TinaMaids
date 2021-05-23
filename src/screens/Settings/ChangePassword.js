import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { navigate } from 'src/utils/navigation';
import Menu from '../../components/Menu';
import Theme from '../../theme/Theme';
import { connect, useSelector } from "react-redux";
import { Colors } from "react-native/Libraries/NewAppScreen";

class ChangePassword extends React.Component {
  state = {
    currentPwd: "",
    newPwd: "",
    confirmPwd: "",
  };

  componentDidMount () {

  }
  
  componentDidUpdate(prevProps, prevState) {

  }

  onChangeCurrentPassword = (text) => {
    this.setState({currentPwd: text});
  }
  onChangeNewPassword = (text) => {
    this.setState({newPwd: text});
  }
  onChangeConfirmPassword = (text) => {
    this.setState({confirmPwd: text});
  }

  

  render() {

    return (
      <View style={styles.container}>
        <Menu title="Change Password" message={false}/>
        
        <View style={styles.body}>
          <View style={styles.itemGroup}>
            <Text style={styles.title}>Current Password</Text>
            <TextInput
              style={styles.input}
              placeholder={""}
              placeholderTextColor = "grey"
              onChangeText={(text) => this.onChangeCurrentPassword(text)}
              value={this.state.currentPwd}
            />
          </View>
          <View style={styles.itemGroup}>
            <Text style={styles.title}>New Password</Text>
            <TextInput
              style={styles.input}
              placeholder={""}
              placeholderTextColor = "grey"
              onChangeText={(text) => this.onChangeNewPassword(text)}
              value={this.state.newPwd}
            />
          </View>
          <View style={styles.itemGroup}>
            <Text style={styles.title}>Re-type New Password</Text>
            <TextInput
              style={styles.input}
              placeholder={""}
              placeholderTextColor = "grey"
              onChangeText={(text) => this.onChangeConfirmPassword(text)}
              value={this.state.confirmPwd}
            />
          </View>
          
        </View>

        <View  style={styles.btnWrapper}>
          <TouchableOpacity onPress={() => navigate('SettingScreen', {messageSent: true})}>
            <Text style={styles.btn}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  body: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  itemGroup: {

  },
  title: {
    marginTop: 15,
    marginBottom: 10,
    color: Theme.black,
    fontSize: Theme.fontSubTitle,
  },
  input: {
    paddingBottom: 8,
    height: 45,
    width: "100%",
    fontSize: 15,
    paddingHorizontal: 15,
    borderColor: "#c7c7c7",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: Theme.fontText
  }, 
  btnWrapper: {
    position: "absolute",
    alignSelf: "center",
    bottom: 100,
    width: "70%",
    borderRadius: 8,   
    backgroundColor: '#99C3EE',
    height: 60,
    borderRadius: 30,

    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 3.87,
    shadowOffset: {width: 0, height: 2},
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center'

  },
  btn: {
    color: 'black',
    fontSize: Theme.fontSubTitle,
    paddingHorizontal: 12,
    paddingVertical: 12,
    textAlign: "center"
  },
});
