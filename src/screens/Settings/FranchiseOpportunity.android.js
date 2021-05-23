import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Platform,
  Linking,
  Alert,
} from "react-native";
import Menu from '../../components/Menu';
import Theme from '../../theme/Theme';
import { ScrollView } from "react-native-gesture-handler";
import VideoPlayer from 'react-native-video-player'
import { Colors } from "react-native/Libraries/NewAppScreen";



class FranchiseOpportunity extends React.Component {
  state = {
    currentPwd: "",
    newPwd: "",
    confirmPwd: "",
  };

  onChangeCurrentPassword = (text) => {
    this.setState({currentPwd: text});
  }

  onChangeNewPassword = (text) => {
    this.setState({newPwd: text});
  }

  onChangeConfirmPassword = (text) => {
    this.setState({confirmPwd: text});
  }
  openDialScreen = () => {
    let number = '';
      if (Platform.OS === 'ios') {
        number = 'telprompt:${3058506562}';
      }
      else {
        number = 'tel:${3058506562}'; 
      }
      Linking.openURL(number);
  }
  render() {

    return (
      <View style={styles.container}>
        <Menu title="Franchise Opportunity" message={false}/>
        <ScrollView>
          <ImageBackground
            source={Theme.logo_header}
            imageStyle={{
              resizeMode: 'contain',
            }}
            style={{
              height: 130,
            }}
          >
          </ImageBackground>
              
          <Text style={styles.texttitle}>
            House Cleaning Franchise Business
          </Text>

          <View style={styles.video}>
            <VideoPlayer
                autoplay={false}
                // onStart={() => { this.onPlayVideo(this) }}
                thumbnail={require('src/assets/img/thumbnail.png')}
                video={{ uri: 'https://app.tinamaids.com/tina_maids_franchise.mp4' }}  // Can be a URL or a local file.
                style={{ width: '100%', height: '100%', justifyContent: 'center', backgroundColor: 'black'}}
            />
          </View>

          <Text style={styles.textdescription}>
            Have you thought about owning your own business? 
            Buying into a Tina Maids Franchise may be an excellent choice for you! With our 
            headquarters located in Miami, Florida we are excited to reach new customers by way
            of our franchise expansion plan and we believe our Tina Maids 
            Franchise Model is one of the strongest in the cleaning industry. 
            We have plans to grow in several key regions and are already working with various individuals
            interested in majout markets.
          </Text>

          <Text style={styles.texttitle}>
            Why choose Tina Maids Franchise?
          </Text>

          <Text style={styles.textdescription}>
            With a low, affordable startup and overhead cost, The Tina Maids Franchise program gives 
            you the opportunity to become your own boss in a short period of time and start building 
            your own residential cleaning company.
          </Text>


           <View  style={styles.btnWrapper}>
             <TouchableOpacity onPress={this.openDialScreen}>
               <Text style={styles.btn}>
                 Call Us Now
               </Text>
             </TouchableOpacity>
           </View>
           <View style={{height: 20}}></View>
         </ScrollView>

      </View>
    );
  }
}
export default FranchiseOpportunity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1e9c7',
  },
  video: {
    height: 220,
    margin: 20,
    marginBottom: 0,
    justifyContent: "center",
  },
  btnWrapper: {
    marginTop: 20,
    alignSelf: "center",
    width: "85%",    
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
    fontSize: 20,
    paddingHorizontal: 12,
    paddingVertical: 12,
    textAlign: "center"
  },
  btnPlay: {
    alignSelf: "center",
  },
  texttitle: {
    marginTop: 10,
    paddingHorizontal: 30,
    fontSize: 28,
    color: '#228432',
    textAlign: "center",
    fontWeight: "bold",
  },
  textdescription: {
    marginTop: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    textAlign: "center",
  }
});
