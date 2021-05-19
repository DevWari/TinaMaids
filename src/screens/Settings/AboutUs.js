import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Text
} from "react-native";
import Menu from 'src/components/Menu';
import Theme from '../../theme/Theme';
import { connect, useSelector } from "react-redux";

class AboutUs extends React.Component {
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
        <Menu title="About Us" message={false}/>
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
            About Us
          </Text>

          <Text style={styles.textdescription}>
            We offer a variety of customized cleaning services, and our trained staff pay 
            close attention to detail to ensure excellent customer satisfaction and superior cleaning. 
            All of our employees undergo extensive background checks.
          </Text>

          <Text style={styles.textdescription}>
            we are confident in the work that we do and our goal is to build loyal, long-term relationships 
            with our clientele.
          </Text>

          <Text style={styles.textdescription}>
            We are bonded and insured. All our of employees are legally authorized to work in the United States 
            and go through background checks and extensive trainging.
          </Text>

          <View style = {{
            flex: 1,
            flexDirection: "column-reverse"
          }}>
            <View style={{
              paddingTop: 20,
              alignSelf: "center",
              justifyContent: "flex-end",
              resizeMode: "contain",
              height: "100%",
              maxHeight: 200,
            }}
              >
              <Image
                source={Theme.aboutus_man}
                style={{ resizeMode: "contain", height: "100%"}}
              >
              </Image>
            </View>
          </View>
      </View>
    );
  }
}
export default AboutUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1e9c7',
  },
  texttitle: {
    paddingHorizontal: 30,
    fontSize: 28,
    color: '#228432',
    textAlign: "center",
    fontWeight: "bold",
  },
  textdescription: {
    marginTop: 5,
    paddingHorizontal: 14,
    fontSize: 15,
    textAlign: "center",
  }
});
