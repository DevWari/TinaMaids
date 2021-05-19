import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";

import { navigate } from 'src/utils/navigation';
import Menu from 'src/components/Menu';
import Colors from 'src/theme/Colors';
import Theme from 'src/theme/Theme';
import Inbox from 'src/components/MyMessage/Inbox'
import { connect, useSelector } from "react-redux";
import DropDownPicker from 'react-native-dropdown-picker';
import { newConversationAction } from "../../store/Chat/action";
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-picker';
import { ScrollView } from "react-native-gesture-handler";

const dropData = [
  // {label: 'Receiption 1', value: '1', icon: () => <Icon name="flag" size={18} color="#900" />},
  {label: 'Receiption 1', value: '1'},
  {label: 'Receiption 2', value: '2'},
  {label: 'Receiption 3', value: '3'},
]

class NewMessage extends React.Component {
  state = {
    selectRecipient: "",
    selected: "Inbox",
    loading: false,
    title: "",
    message: "",
    recipients: [],
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
      return
    }
    
    const { recipients } = this.props;

    let newRecipients = [];

    recipients?.forEach(item => {
      let oneItem = {
        label: item.name,
        value: item.id
      }
      newRecipients.push(oneItem);
    });
    this.setState({
      recipients: newRecipients
    })
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
    const { selectRecipient, message, title, fileData, fileName, fileSize, fileUri, fileType } = this.state;
    if(selectRecipient  == "")
      return;
    if (message == "" || title == "") return;

    let file = null;
    if (fileUri != null) {
      //If file selected then create FormData
      file = new FormData();
      file.append('name', fileName);
      file.append('type', fileType);
      file.append('uri', fileUri);
      file.append('size', fileSize);
      file.append('file', fileData);
    }

    let data = {
      to: selectRecipient,
      message: message,
      title: title,
      file: file,
    }
    this.props.newConversation(data, this.props.token)
  }

  async selectFile () {
   
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
            
      //Setting the state to show single file attributes
      this.setState({ singleFile: res });
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        console.log('Canceled from single doc picker');
      } else {
        //For Unknown Error
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
    const { loading, selected, recipients, fileName } = this.state;

    return (
      <ScrollView style={styles.container}>
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
          <DropDownPicker
            items={recipients}
            placeholder="Choose recipient"
            containerStyle={{height: 40, width: "100%"}}
            style={{backgroundColor: 'white',  borderWidth: 0.5}}
            itemStyle={{
                justifyContent: 'flex-start'
            }}
            labelStyle={{
              fontSize: Theme.fontSubTitle,
              textAlign: 'left',
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={item => this.setState({
              selectRecipient: item.value
            })}
          />
        <Text style={[styles.title, {marginTop: 15}]}>Title:</Text>
        <TextInput
            style={styles.input}
            placeholder={""}
            onChangeText={(text) => this.onChangeTitle(text)}
            value={this.state.title}
        />

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
          <Text style={styles.btnBrowse}>
              {fileName}
            </Text>
        </View>

        <TouchableOpacity style={styles.btnSendWrapper} onPress={() => this.onPressedSend()}>
            <Text style={styles.btnSend}>
              Send
            </Text>
        </TouchableOpacity>

        </View>

        
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.session.token,
    isLoading: state.chats.isLoading,
    status: state.chats.status,
    recipients: state.chats.chats?.data?.recipients,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    newConversation: (data, token) => dispatch(newConversationAction(data,token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);

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
    marginVertical: 8,
    color: Theme.black,
    fontSize: Theme.fontSubTitle,
    fontWeight: "bold"
  },
  input: {
    paddingBottom: 8,
    height: 40,
    width: "100%",
    fontSize: 15,
    paddingHorizontal: 15,
    borderColor: "#c7c7c7",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: Theme.fontText
  },
  areatext: {
    height: 120,
    borderColor: "#c7c7c7",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: Theme.fontText
  },
  btnBrowserWrapper: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#c7c7c7",
    backgroundColor: Theme.white,

  },
  btnBrowse: {
    flex: 1,
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
