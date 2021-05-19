import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from "react-native";

import { navigate } from 'src/utils/navigation';
import Menu from '../../components/Menu';
import Theme from '../../theme/Theme';
import DatePicker from 'react-native-date-picker';
import {connect} from 'react-redux';
import {
  getExtraServicesAction,
  addAppointmentAction
} from "../../store/Appointment/action";
import moment from "moment"

class AppointmentOne extends React.Component {
  state = {
    hashed_id: this.props.navigation.state?.params?.hashed_id,
    description: "",
    datetime: new Date(),
    date: moment(new Date()).format('YYYY-MM-DD'),
    time: moment(new Date()).format('hh:mm:ss'),
    extra_services: [],
  };

  componentDidMount () {
    if (!this.props.token) {
      navigate('LoginScreen')
      return
    }
    else this.getExtraServices();
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.navigation.state?.params?.hashed_id != this.props.navigation.state?.params?.hashed_id)
      this.setState({ hashed_id: this.props.navigation.state?.params?.hashed_id })

    if (this.props.data?.data == undefined)
      return;

    if (prevProps.data?.data != this.props.data?.data) {
      
      let newData = [];
      this.props.data?.data.forEach(item => {
        // let temp = {
        //   id: item.id,
        //   name: item.name,
        //   price: item.price,
        //   active: item.active,
        // }
        newData.push(item.id);
      });
      // this.setState({ extra_services: this.props.data?.data });
      this.setState({ extra_services: newData });
    }
  }

  getExtraServices () {
    const { hashed_id } = this.state;
    if (hashed_id == null) {
      alert("estimate's hashed_id is not exist!")
      return;
    }
    let data = {
      hashed_id, // "6c4b761a28b734fe93831e3fb400ce87" // estimate's hashed_id
    }
    this.props.getExtraServices(data, this.props.token)
  }
  

  onChangeDescription = (text) => {
    this.setState({description: text});
  }

  onChangeDateTime = (event, selectedDate) => {
    let date = moment(event).format('YYYY-MM-DD');
    let time = moment(event).format('hh:mm:ss');
    
    this.setState ( {
      datetime: event,
      date,
      time,
    })
  }

  onPressRequest () {
    const { hashed_id, description } = this.state;

    if (hashed_id == null) {
      alert("estimate's hashed_id is not exist!")
      return;
    }
    if (description == "") return;

    let data = {
      hashed_id, //: "6c4b761a28b734fe93831e3fb400ce87", // estimate's hashed_id
      service_date: this.state.date,
      service_time: this.state.time,
      // extra_service_task_id: this.state.extra_services,
      textarea: description,
    }
    this.props.addAppointment(data, this.props.token)
  }


  render() {

    return (
    <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>
          <Menu title="My Appointments" message={false}/>

          <View style={styles.toptitle}>
            <Text style={styles.texttitle}>
              New Appointment Request
            </Text>
          </View>

            <View style={{marginTop: 30, alignItems: "center"}}>
              <Text style={styles.texttitle}>
                Step 1 of 1
              </Text>
              <Text style={styles.text2}>
                Pick a date and time
              </Text>
            </View>

            <View style={{marginTop: 30, alignItems: "center"}}>
              <DatePicker
                mode="datetime"
                date={this.state.datetime}
                onDateChange={this.onChangeDateTime}
              />
            </View>

            <View style={styles.body}>
              <View style={styles.itemGroup}>
                <Text style={styles.title}>Description</Text>
                <TextInput
                    style={styles.areatext}
                    multiline={true}
                    numberOfLines={10}
                    placeholder={"Please describe your job here"}
                    textAlignVertical = "top"
                    paddingHorizontal={12}
                    onChangeText={(text) => this.onChangeDescription(text)}
                    value={this.state.description}
                />
                </View>
              
            </View>

            <View  style={styles.btnWrapper}>
              <TouchableOpacity onPress={() =>this.onPressRequest()}>
                <Text style={styles.btn}>
                  Send Request
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{marginBottom: 20}}></View>
        </ScrollView>
       </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.session.token,
    isLoading: state.appointment.isLoading,
    status: state.appointment.status,
    data: state.appointment.extraServices,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getExtraServices: (data, token) => dispatch(getExtraServicesAction(data, token)),
    addAppointment: (data, token) => dispatch(addAppointmentAction(data, token)),
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentOne);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  body: {
    paddingHorizontal: 20,
  },
  itemGroup: {

  },
  title: {
    paddingLeft: 20,
    marginTop: 15,
    marginBottom: 10,
    color: Theme.black,
    fontSize: Theme.fontTitle,
  },
  areatext: {
    paddingLeft: 20,
    borderColor: "#c7c7c7",
    borderWidth: 1,
    borderRadius: 8,
    height: 200,
    fontSize: Theme.fontTitle
  },
  btnWrapper: {
    marginTop: 50,
    alignSelf: "center",
    width: "70%",
    borderRadius: 8,
    borderWidth: 3,
    borderColor: Theme.black,
    backgroundColor: Theme.primaryDark,
  },
  btn: {
    color: Theme.white,
    fontSize: Theme.fontSubTitle,
    paddingHorizontal: 12,
    paddingVertical: 12,
    textAlign: "center"
  },
  toptitle: {
    height: 50,
    backgroundColor: 'lightgrey',
    borderBottomWidth: 0.6,
    justifyContent: "center"
  },
  texttitle: {
    marginLeft: 20,
    color: Theme.black,
    fontSize: Theme.fontTitle,
  },
  text2: {
    marginLeft: 20,
    color: Theme.primary,
    fontSize: 28,
  }
});
