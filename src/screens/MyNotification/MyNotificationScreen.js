import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Menu from 'src/components/Menu';
import Theme from 'src/theme/Theme';
import Notification from 'src/components/Notification/Notification'
import { connect } from "react-redux";
import {navigate} from 'src/utils/navigation'

class MyNotificationScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: false,
    }
  }
  componentDidMount () {
    // if (!this.props.token) {
    //   navigate('LoginScreen')
    // }
  }
  render() {
    const { loading } = this.state;

    return (
      <View style={styles.container}>
        <Menu title="My Notifications" message={false}/>
        { loading && 
          <ActivityIndicator style={styles.spinnerStyle} animating={loading} size="large" color={'lightgreen'} />
        }
        
        <FlatList
            data={this.props.notifyData}
            renderItem={({ item }) =>
                <Notification
                    item={item}
                    // navigation={this.props.navigation}
                />}

            keyExtractor={item => item.id}
            ListFooterComponent={<View style={{height: 55}}></View>}
        />

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { notifyData } = state.notification;
  return {
    notifyData,
    token: state.session.token
  };
};

export default connect(
  mapStateToProps,
  {},
)(MyNotificationScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  spinnerStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
    justifyContent: "center",
  },
});
