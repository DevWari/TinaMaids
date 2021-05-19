import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity
} from "react-native";

import { navigate } from 'src/utils/navigation';
import Menu from 'src/components/Menu';
import Colors from 'src/theme/Colors';
import Theme from 'src/theme/Theme';
import { replyMessageAction } from "../../store/Chat/action";
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-picker';

const dropData = [
  // {label: 'Receiption 1', value: '1', icon: () => <Icon name="flag" size={18} color="#900" />},
  {label: 'Receiption 1', value: '1'},
  {label: 'Receiption 2', value: '2'},
  {label: 'Receiption 3', value: '3'},
]

class MessageReply extends React.Component {
  state = {
    hashed_id: this.props.navigation.state?.params?.hashed_id,
    recipientMethod: "1",
    selected: "Inbox",
    loading: false,
    title: "",
    message: "",
    singleFile: null,
    fileData: null,
    fileType: null,
    fileUri: null,
    fileName: null,
    fileSize: null,
  };

  componentDidMount () {
    if (!this.props.token) {
       navigate('LoginScreen')
    }
  }
  
  componentDidUpdate(prevProps, prevState) {

  }

  onPressHistory = () => {
    const {
      selected,
    } = this.state;

    this.setState({selected: "History"})
    navigate('MyMessageScreen', {selected: 'History'});
  };

  onPressInbox = () => {
    const {
      selected,
    } = this.state;

    this.setState({selected: "Inbox"})
    navigate('MyMessageScreen', {selected: 'Inbox'});
  };

  onChangeTitle = (text) => {
    this.setState({
        title: text,
    })
  }

  onChangeMessage = (text) => {
      this.setState({
          message: text,
      })
  }

  onPressedSend () {
    const { hashed_id, message, singleFile, fileData, fileName, fileSize, fileUri, fileType } = this.state; // id of chat
    if (hashed_id == undefined || hashed_id == null) return;
    if (message == "") return;
    let file = null;
    // if (singleFile != null) {
    //   //If file selected then create FormData
    //   const fileToUpload = singleFile;
    //   file = new FormData();
    //   file.append('name', singleFile.name);
    //   file.append('type', singleFile.type);
    //   file.append('uri', singleFile.uri);
    //   file.append('size', singleFile.size);
    //   file.append('file', JSON.stringify(singleFile));
    // }
    if (fileUri != null) {
      //If file selected then create FormData
      file = new FormData();
      file.append('name', fileName);
      file.append('type', fileType);
      file.append('uri', fileUri);
      file.append('size', fileSize);
      file.append('file', fileData);
    }

    const data = {
      id: hashed_id,
      message: message,
      file: file,
    }
    
    this.props.replyMessage(data, this.props.token)
  }

  async selectFile () {
   
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);
      //Setting the state to show single file attributes
      this.setState({ singleFile: res });
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        console.log('Canceled from single doc picker');
      } else {
        //For Unknown Error
        console.log('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  onPressedPhoto () {
    const options = {
        maxWidth: 2000,
        maxHeight: 2000,
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
      };
    ImagePicker.showImagePicker(options, response => {
    if (response.didCancel) {
        console.log('User cancelled image picker');
    } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
    } else {
        let uri = response.uri;
        let uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        let fileNames = uri.split("/");
        let fileName = fileNames[fileNames.length - 1];

        this.setState({
          fileName: fileName,
          fileSize: response.fileSize,
          fileData: response.data,
          fileType: response.type,
          fileUri: uploadUri  //response.uri
         });
         
        }

    });
  }

  render() {
    const { loading, selected, recipientMethod, fileName } = this.state;

    return (
      <View style={styles.container}>
        <Menu title="My Messages" message={false}/>
        { loading && 
          <ActivityIndicator style={styles.spinnerStyle} animating={loading} size="large" color={'lightgreen'} />
        }
        
        <View style={{height: 2}}></View>
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity style={[styles.btnTabContainer,{marginRight: 2}]} onPress={()=>this.onPressInbox()}>
            <Text style={ [styles.btnTab, selected == "Inbox" ? {backgroundColor: Theme.primaryDark} : {backgroundColor: Theme.primary}]}>
              Inbox
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnTabContainer,{marginLeft: 2}]} onPress={()=>this.onPressHistory()}>
            <Text style={ [styles.btnTab, selected == "History" ? {backgroundColor: Theme.primaryDark} : {backgroundColor: Theme.primary}]}>
              History
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          <Text style={styles.title}>Your message:</Text>
          <TextInput
              style={styles.areatext}
              multiline={true}
              // numberOfLines={5}
              textAlignVertical = "top"
              paddingHorizontal={12}
              onChangeText={(text) => this.onChangeMessage(text)}
              value={this.state.message}
          />

          <Text style={styles.title}>Attachment:</Text>

          <View style={{flexDirection: "row"}}>
            <TouchableOpacity style={styles.btnBrowserWrapper} onPress={() => this.onPressedPhoto()}>
              <Text style={styles.btnBrowse}>
                Browse...
              </Text>
            </TouchableOpacity>
            <Text style={[styles.btnBrowse, {flex: 1}]}>
              {fileName}
            </Text>
            
          </View>

          <TouchableOpacity style={styles.btnSendWrapper} onPress={() => this.onPressedSend()}>
              <Text style={styles.btnSend}>
                Send
              </Text>
          </TouchableOpacity>

        </View>
       
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.session.token,
    isLoading: state.chats.isLoading,
    status: state.chats.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    replyMessage: (data, token) => dispatch(replyMessageAction(data,token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageReply);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white
  },

  btnTabContainer: {
    flex: 1,

  },
  btnTab: {
    color: Theme.white,
    fontSize: Theme.fontSubTitle,
    paddingVertical: 8,
    paddingHorizontal: 12,
    textAlign: "center",
  },
  spinnerStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
    justifyContent: "center",
  },
  body: {
    marginTop: 10,
    paddingHorizontal: 20
  },
  title: {
    marginTop: 15,
    marginBottom: 10,
    color: Theme.black,
    fontSize: Theme.fontSubTitle,
    fontWeight: "bold"
  },
  areatext: {
    height: 120,
    borderColor: "#c7c7c7",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: Theme.fontSubTitle
  },
  btnBrowserWrapper: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#c7c7c7",
    backgroundColor: Theme.white,

  },
  btnBrowse: {
    color: Theme.black,
    fontSize: Theme.fontSubTitle,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },

  btnSendWrapper: {
    marginTop: 35,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#c7c7c7",
    backgroundColor: Theme.primary,
  },
  btnSend: {
    color: Theme.white,
    fontSize: Theme.fontSubTitle,
    paddingHorizontal: 12,
    paddingVertical: 8,
    textAlign: "center"
  },
});
