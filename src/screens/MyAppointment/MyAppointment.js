import React, { version } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { navigate } from 'src/utils/navigation';
import Menu from '../../components/Menu';
import Theme from '../../theme/Theme';
import DatePicker from 'react-native-date-picker'
import { getEstimateAppointmentsAction, getAllAppointmentsAction } from "../../store/Appointment/action";
import {connect} from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay';

const DATA = [
  {
    id: 1,
    view_no: 341,
    year: "2020",
    date: "March 27 2020(Wed)",
    time: "7:00 PM",
    desc: "Regular Cleaning",
  },
]

class MyAppointment extends React.Component {
  state = {
    hashed_id: this.props.navigation.state?.params?.hashed_id,  // estimate's hashed id
    description: "",
    datetime: new Date(),
    data: [],
  };

  componentDidMount () {
    if (!this.props.token) {
      navigate('LoginScreen')
      return
    }
    else this.getEstimateAppointments(this.props.navigation.state?.params?.hashed_id);
  }

  componentDidUpdate(prevProps, prevState) {
    if ( prevProps.navigation.state?.params?.hashed_id != this.props.navigation.state?.params?.hashed_id ||
        this.props.status == 200 ) {
       this.setState({hashed_id: this.props.navigation.state?.params?.hashed_id})
       this.getEstimateAppointments(this.props.navigation.state?.params?.hashed_id);
    }

    if (prevProps.data != this.props.data) {
      let newData = [];
      this.props.data?.forEach(item => {
        let temp = {
          id: item.id,
          hashed_id: item.hashed_id,
          view_no: item.id,
          service_status_id: item.service_status_id,
          date: item.service_date,
          time: item.service_time,
          desc: item.service_status?.name_customer ? item.service_status?.name_customer: item.st_name,
          service_status: item.service_status
        }
        newData.push(temp);
      });
      this.setState({ data: newData });
    }
  }

  getEstimateAppointments(hashed_id) {
    let data = {
      hashed_id, //: "6c4b761a28b734fe93831e3fb400ce87" // estimate's hashed_id
    }

    if( hashed_id == undefined || hashed_id == null )
      this.props.getAllAppointments([], this.props.token)
    else
      this.props.getEstimateAppointments(data, this.props.token)
  }

  onChangeDescription = (text) => {
    this.setState({description: text});
  }

  onChangeDateTime = (event, selectedDate) => {
      
    this.setState ( {
      datetime: event
    })
  }

  onPressedItem (item) {
    navigate("AppointmentOption", {hashed_id: item.hashed_id});
  }

  onPressRequresNew () {
    const { hashed_id } = this.state;
    if ( hashed_id == undefined || hashed_id == null )
      navigate('MyEstimate')
    else
      navigate('AppointmentOne', {hashed_id: hashed_id})
  }


  renerItem = (item, index) => {
    return (
      <View style={[styles.itemGroup, index % 2 != 0 ? { backgroundColor: 'white' } : {backgroundColor: '#f9f9f9'} ]}>
        <TouchableOpacity style={styles.itemOne} onPress={()=>this.onPressedItem(item)}>
          <Text style={[styles.textOne, {color: Theme.primary}]}>
            View Details({item.view_no})
          </Text>
        </TouchableOpacity>
        <View style={styles.itemOne}>
          <Text style={styles.textOne}>
            {item.date}
          </Text>
        </View>
        <View style={styles.itemOne}>
          <Text style={styles.textOne}>
            {item.time}
          </Text>
        </View>
        <View style={styles.itemOne}>
          <Text style={styles.textOne}>
            {item.desc}
          </Text>
        </View>
      </View>
    )
  }

  render() {

    const { data, hashed_id } = this.state;
    return (
      <View style={styles.container}>
        <Spinner 
          visible={this.props.isLoading}
          textContent={'Loading...'}
          textStyle={{color:'#FFF'}}
        />

        <Menu title="Appointments" message={false}/>

        <View style={styles.toptitleGroup}>
          <View style={styles.toptitle}>
            <TouchableOpacity onPress={()=> navigate("MyAppointment", {hashed_id: hashed_id})}>
              <Text style={styles.texttitle}>
                My Appointments
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.toptitle}>
            <TouchableOpacity onPress={()=>this.onPressRequresNew()}>
              <Text style={styles.texttitle}>
                Request New
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
              data={data}
              ListHeaderComponent={<View style={{height: 20}}></View>}
              renderItem={({item, index}) => this.renerItem(item, index)}
              keyExtractor={item => item.id}
              ListFooterComponent={<View style={{height: 20}}></View>}
          />

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.session.token,
    isLoading: state.appointment.isLoading,
    status: state.appointment.status,
    data: state.appointment.appointments
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEstimateAppointments: (data, token) => dispatch(getEstimateAppointmentsAction(data,token)),
    getAllAppointments: (data, token) => dispatch(getAllAppointmentsAction(data,token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAppointment);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  body: {
    paddingHorizontal: 20,
  },
  itemGroup: {
    flexDirection: "row",
    height: 120,
    justifyContent: "space-between",
  },
  itemOne: {
    flex: 1,
    borderLeftWidth: 0.3,
    borderBottomWidth: 0.3,
  },
  textOne: {
    padding: 5,
    color: Theme.black,
    fontSize: Theme.fontText,
  },
  title: {
    paddingLeft: 20,
    marginTop: 15,
    marginBottom: 10,
    color: Theme.black,
    fontSize: Theme.fontSubTitle,
  },
  areatext: {
    paddingLeft: 20,
    borderColor: "#c7c7c7",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: Theme.fontText
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
  text2: {
    marginLeft: 20,
    color: Theme.primary,
    fontSize: 24,
  }
});
