import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import { navigate } from 'src/utils/navigation';
import Menu from '../../components/Menu';
import Theme from '../../theme/Theme';
import {connect} from 'react-redux'

class AppointmentThankyou extends React.Component {
  state = {
    description: "",
    datetime: new Date(),
    date: new Date(),
    time: new Date(),
    show: false,
    showdate: false,
    showtime: false,
  };

  componentDidMount () {
    if (!this.props.token) {
      navigate('LoginScreen')
    }
  }
  
  componentDidUpdate(prevProps, prevState) {

  }


  onPressNewRequest = () => {
    navigate('AppointmentOption');
  }

  onPressMyEstimates = () => {
    navigate('AppointmentOption');
  }

  render() {

    return (
      <View style={styles.container}>
        <Menu title="My Appointment" message={false}/>

        <View style={styles.toptitleGroup}>
          <View style={styles.toptitle}>
            <TouchableOpacity onPress={()=> navigate("MyAppointment")}>
              <Text style={styles.texttitle}>
                My Appointments
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.toptitle}>
            <TouchableOpacity onPress={()=> navigate("AppointmentOne")}>
              <Text style={styles.texttitle}>
                Request New
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.titleMsgGroup}>
            <Text style={styles.titleMsg}>
              Thank you!
            </Text>
        </View>

        <View style={styles.msgContent}>
            <Text style={styles.msg}>
              {/* We have received your request.{"\n"}You should receive an e-mail with your estimated price within 60 minutes or less.
              Follow the link on your estimate to continue. */}
              {this.props.message}
            </Text>
        </View>


        <View  style={styles.imgGroup}>
          <View style={styles.bottomImageView}>
            <Image
              source={Theme.tree_sun}
              style={{height: "80%", width: "100%", resizeMode: "contain"}}
            >

            </Image>

          </View>

        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.session.token,
    isLoading: state.appointment.isLoading,
    status: state.appointment.status,
    message: state.appointment.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentThankyou);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  imgGroup: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 20,
    alignSelf: "center",
    width: "100%",
  },
  toptitle: {
    flex: 1,
    height: 50,
    backgroundColor: 'lightgrey',
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.6,
  },
  toptitleGroup: {
    height: 50,
    flexDirection: "row",
    backgroundColor: 'lightgrey',
  },
  texttitle: {
    marginLeft: 20,
    color: Theme.black,
    fontSize: Theme.fontSubTitle,
  },
  titleMsg: {
    color: Theme.primary,
    fontSize: 32,
    borderBottomColor: Theme.primary,
    borderBottomWidth: 1,
    paddingHorizontal: 40,
    paddingBottom: 10,
  },
  titleMsgGroup: {
    marginTop: 20,
    alignItems: "center",
  },
  msgContent: {
    marginTop:20,
    marginHorizontal: 30,
  },
  msg: {
    color: Theme.primary,
    fontSize: 22,
    textAlign: "center",
    lineHeight: 28,
  },
  bottomImageView: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  }
});
