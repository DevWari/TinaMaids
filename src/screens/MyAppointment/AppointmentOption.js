import React, { version } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid
} from "react-native";

import { navigate } from 'src/utils/navigation';
import Menu from '../../components/Menu';
import Theme from '../../theme/Theme';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {
  getAppointmentDetailAction,
  cancelAppointmentAction
} from "../../store/Appointment/action";

import {connect} from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay';
import moment from "moment"

class AppointmentOption extends React.Component {
  state = {
    hashed_id: this.props.navigation.state?.params?.hashed_id,
    description: "",
    datetime: new Date(),
    date: new Date(),
    time: new Date(),
    show: false,
    showdate: false,
    showtime: false,
    modalOption: false,
    markers: [],
    initialPosition: 'unknown',
    lastPosition: 'unknown',
    initialRegion: "",
    data: null,
  };

  watchID = null;

  componentDidMount () {
    if (!this.props.token) {
      navigate('LoginScreen')
      return
    }
    else {
      this._getCurrentLocation();
      this.getAppointmentDetail();
    }
  }
  
  componentWillUnmount() {
    this.watchID != null && Geolocation.clearWatch(this.watchID);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.navigation.state?.params?.hashed_id != this.props.navigation.state?.params?.hashed_id)
      this.setState({ hashed_id: this.props.navigation.state?.params?.hashed_id })

    if (this.props.data?.data == undefined)
      return;

    if (prevProps.data?.data != this.props.data.data) {
      let item = this.props.data?.data;
      let datetime = item.service_date + " " + item.service_time;

      this.setState({
        data: item,
        datetime: new Date(datetime),
        date: new Date(item.service_date),
        time: new Date(item.service_time),
        show: false,
        showdate: false,
        showtime: false,
        modalOption: false,
      })
    }
  }

  getAppointmentDetail() {
    const { hashed_id } = this.state;
    if ( hashed_id == undefined)
      return;

    let data = {
      hashed_id, // "f7e0b956540676a129760a3eae309294" // appointment's hashed_id
    }
    this.props.getAppointmentDetail(data, this.props.token)
  }

  _getCurrentLocation = () => {
    var that = this;
      this.setState({loading: true})
      if(Platform.OS === 'ios'){
        this.callLocation(that);
      }else{
        async function requestLocationPermission() {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                'title': 'Location Access Required',
                'message': 'This App needs to Access your location'
              }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              //To Check, If Permission is granted
              that.callLocation(that);
            } else {
              console.log("Permission Denied");
            }
          } catch (err) {
            console.warn(err)
            that.setState({loading: false})
          }
        }
        requestLocationPermission();
      }   
  }

  callLocation(that) {
    let markers = [];
     Geolocation.getCurrentPosition(
        (position) => {
           const currentLongitude = Number(JSON.stringify(position.coords.longitude)).toFixed(10);
           const currentLatitude = Number(JSON.stringify(position.coords.latitude)).toFixed(10);
           
          let location = {
            latitude: parseFloat(currentLatitude),
            longitude: parseFloat(currentLongitude),
          }
          
          let newMarker = {
            latlng: location,
            title: "my location",
            description: "current position",
          }
          markers.push(newMarker);

          let initialRegion={
            latitude: parseFloat(currentLatitude),
            longitude: parseFloat(currentLongitude),
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421,
          }

          that.setState({ initialRegion, markers });
        },

        (error) => {
          that.setState({loading: false})
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
     );
  }


  onRegionChange(region, lastLat, lastLong) {

  }

  onPressZoomIn() {

  }

  onPressZoomOut() {

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

  onChangeDateTime = (event, selectedDate) => {
    this.setState({show: false})

    if(selectedDate == undefined) 
      return;

    this.setState ( {
      showtime: Platform.OS === 'ios',
      datetime: selectedDate,
    })
  }
  onChangeDate = (event, selectedDate) => {
    this.setState({showdate: false})

    if(selectedDate == undefined) 
      return;

    this.setState ( {
      showtime: Platform.OS === 'ios',
      date: selectedDate,
      showtime: true
    })
  }

  onChangeTime = (event, selectedDate) => {
    this.setState({showtime: false})

    if(selectedDate == undefined) 
      return;

    this.setState ( {
      showtime: Platform.OS === 'ios',
      time: selectedDate,
    })
  }
  
  onPressDateTime = () => {
    if ( Platform.OS === 'ios' )
      this.setState({show: true});
    else
      this.setState({showdate: true});
  }

  onPressedOptions () {
    const { modalOption } = this.state;
    this.setState({modalOption: !modalOption})
  }

  onPressSendMessage = () => {
    this.setState({modalOption: false});
    navigate("NewMessage");
  }

  onPressViewEstimate = () => {
    const { data } = this.state;
    const estimate = data?.estimate;
    
    this.setState({modalOption: false});
    navigate('PersonalInfo', {accept: true, hashedId: estimate?.hashed_id})
  }

  onPressCancel = () => {
    this.setState({modalOption: false});
    const { hashed_id } = this.state;
    if ( hashed_id == undefined)
      return;

    let data = {
      hashed_id, // "f7e0b956540676a129760a3eae309294" // appointment's hashed_id
    }

    this.props.cancelAppointment(data, this.props.token)
  }

  onPressedReuestNew () {
    const { data } = this.state;
    const estimate = data?.estimate;

    this.setState({modalOption: false});
    navigate('AppointmentOne', {hashed_id: estimate?.hashed_id});
  }

  render() {
    const { markers, data } = this.state;
    const estimate = data?.estimate;
    return (
      <View style={styles.container}>
        <ScrollView>
        <Spinner
          visible={this.props.isLoading}
          textContent={'Loading...'}
          textStyle={{color:'#FFF'}}
        />
        <Menu title="Appointment" message={false}/>

        <View style={styles.toptitleGroup}>
          <View style={styles.toptitle}>
            <TouchableOpacity onPress={()=> navigate("MyAppointment", {hashed_id: estimate?.hashed_id})}>
              <Text style={styles.texttitle}>
                My Appointments
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.toptitle}>
            {/* <TouchableOpacity onPress={()=> this.state.modalOption == true ? navigate('PersonalInfo', {accept: true}) : navigate('AppointmentOne', {hashed_id:estimate?.hashed_id})}> */}
            <TouchableOpacity onPress={()=>this.onPressedReuestNew()}>
              <Text style={styles.texttitle}>
                Request New
              </Text>
            </TouchableOpacity>
          </View>
        </View>

            <View style={{marginTop: 30, alignItems: "center"}}>
              <Text style={styles.texttitle}>
                Appointment #{data?.id}
              </Text>
              <Text style={styles.text2}>
                Your Information
              </Text>
            </View>

            <View style={styles.body}>
              <View style={styles.itemGroup}>
                <Text style={styles.title}>{estimate?.customer_name}</Text>
              </View>
              <View style={styles.itemGroup}>
                <Text style={styles.title}>{estimate?.customer_email}</Text>
              </View>
              <View style={styles.itemGroup}>
                <Text style={styles.title}>{estimate?.customer_phone}</Text>
              </View>
              <View style={styles.itemGroup}>
                <Text style={styles.title}>{estimate?.address}</Text>
              </View>
            </View>

            <View style={{marginTop: 30, alignItems: "center"}}>
              <Text style={styles.text2}>
              {/* {moment(data?.service_date ).format('MMM Do YYYY')} {"\n"}at { moment(this.state.datetime).format('h:mm A') } */}
              {moment(data?.service_date ).format('MMM Do YYYY')} {"\n"}at {data?.service_time}
              </Text>
            </View>

            <View style={styles.mapGroup}>
              {this.state.initialRegion != "" && markers.length > 0 &&
                <MapView
                  initialRegion={this.state.initialRegion}
                  provider={PROVIDER_GOOGLE}
                  tintColor={null}
                  mapType="standard" // standard, none, satellite, hybrid, terrain, mutedStandard(iOS 11.0+ only)
                  style={styles.map}
                  onRegionChange={this.onRegionChange}
                  >
                    { markers.map((marker) => (
                        <Marker
                          coordinate={marker.latlng}
                          title={marker.title}
                          description={marker.description}
                        ></Marker>
                      ))
                    }
                </MapView>
              }
            </View>

            {this.state.modalOption == true ? (
              <View style={{marginTop: -90, alignItems: 'center'}}>
                <View style={{width: "70%"}}>
                      <View style={styles.optionModal}>
                        <TouchableOpacity onPress={()=>this.onPressSendMessage()}>
                          <View style={{paddingTop: 18, paddingBottom: 6}} >
                            <Text style={styles.textmodal}>
                              Send message
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.onPressCancel()}>
                          <View style={{paddingVertical: 6}} >
                            <Text style={styles.textmodal}>
                              Cancel Appointment
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.onPressViewEstimate()}>
                          <View style={{paddingVertical: 6}} >
                            <Text style={styles.textmodal}>
                              View Estimate Details
                            </Text>
                          </View>
                        </TouchableOpacity>
                    </View>
                    
                  <View  style={styles.btnWrapper}>
                  <TouchableOpacity onPress={() =>this.onPressedOptions()}>
                    <Text style={styles.btn}>
                      Options
                    </Text>
                  </TouchableOpacity>
                </View>

                <View  style={styles.btnWrapper}>
                  <TouchableOpacity onPress={()=>this.onPressViewEstimate()}>
                    <Text style={styles.btn}>
                      View Estimate
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            ) : (
            <View style={{marginTop: 50, alignItems: 'center'}}>
                <View style={{width: "70%"}}>
                    
                  <View  style={styles.btnWrapper}>
                    <TouchableOpacity onPress={() => this.setState({modalOption: true})}>
                      <Text style={styles.btn}>
                        Options
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View  style={styles.btnWrapper}>
                    <TouchableOpacity onPress={()=>navigate('PersonalInfo', {accept: true, hashedId: estimate?.hashed_id})}>
                      <Text style={styles.btn}>
                        View Estimate
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
            </View>
            )
          }
        </ScrollView>

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.session.token,
    isLoading: state.appointment.isLoading,
    status: state.appointment.status,
    data: state.appointment.appointment
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAppointmentDetail: (data, token) => dispatch(getAppointmentDetailAction(data,token)),
    cancelAppointment: (data, token) => dispatch(cancelAppointmentAction(data,token)),
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentOption);

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
    borderBottomColor: Theme.black,
    opacity: 1.0,
    borderBottomWidth: 0.6,
  },
  title: {
    paddingLeft: 40,
    paddingVertical: 10,
    marginTop: 15,
    marginBottom: 10,
    color: Theme.black,
    fontSize: Theme.fontSubTitle,
  },
  btnWrapper: {
    position: "relative",
    marginBottom: 30,
    marginTop: -10,
    alignSelf: "center",
    width: "100%",
    borderRadius: 8,
    borderWidth: 3,
    borderColor: Theme.black,
    backgroundColor: Theme.primaryDark,
  },
  optionModal: {
    zIndex: 1,
    height: 150,
    width: 220,
    alignSelf: "flex-end",
    borderRadius: 8,
    backgroundColor: Theme.primaryDark
  },
  btn: {
    color: Theme.white,
    fontSize: Theme.fontSubTitle,
    paddingHorizontal: 12,
    paddingVertical: 12,
    textAlign: "center"
  },
  toptitleGroup: {
    height: 50,
    flexDirection: "row",
    backgroundColor: 'lightgrey',
  },
  toptitle: {
    flex: 1,
    height: 50,
    backgroundColor: 'lightgrey',
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.6,
  },
  texttitle: {
    marginLeft: 20,
    color: Theme.black,
    fontSize: Theme.fontSubTitle,
  },
  text2: {
    marginLeft: 20,
    color: Theme.primary,
    fontSize: 28,
    textAlign: "center",
  },
  mapGroup: {
    marginTop: 20,
    height: 300,
    backgroundColor: 'lightgrey',
    justifyContent: "center",
    alignItems: "center",
  },
  textmodal: {
    textAlign: "center",
    color: Theme.white,
    fontSize: Theme.fontText,
  },
  map: {
    width: "100%",
    height: "100%"
  },
});
