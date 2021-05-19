import { Alert } from 'react-native';
import { put, all, call } from 'redux-saga/effects';
import { navigate } from 'src/utils/navigation';
import { SetTokenAction } from 'src/store/Auth/action'
import {removeStorage, replaceToken} from 'src/utils/global'

import {
  getChats,
  getChatsHistory,
  getChatMessages,
  getMessageDetail,
  replyMessage,
  newChatConversation,
  moveChatToHistory,
  getUnreadMessages
} from './services';

import {
  GET_CHATS_SUCCESS,  GET_CHATS_FAILURE,
  GET_CHATS_HISTORY_SUCCESS,  GET_CHATS_HISTORY_FAILURE,
  GET_CHAT_MESSAGES_SUCCESS, GET_CHAT_MESSAGES_FAILURE,
  GET_MESSAGE_DETAIL_SUCCESS, GET_MESSAGE_DETAIL_FAILURE,
  NEW_CONVERSATION_SUCCESS, NEW_CONVERSATION_FAILURE, 
  REPLY_MESSAGE_SUCCESS, REPLY_MESSAGE_FAILURE, 
  MOVE_CHAT_HISTORY_SUCCESS, MOVE_CHAT_HISTORY_FAILURE, 
  GET_UNREAD_MESSAGES_SUCCESS, GET_UNREAD_MESSAGES_FAILURE,

} from './types';

export function* getChatsSaga(action) {
  const { token, data } = action
  let response1 = null
  let response2 = null
    try {
      response1 = yield getChats(data,token);
      if ( response1.status == 1 ) {

        response2 = yield getChatsHistory(data, token)
        
        if ( response2.status == 1 ) {
          const response = {
            response1,
            response2
          }
          yield put({ type: GET_CHATS_SUCCESS, response })
        }
        else if ( response2.status == 2) {
          replaceToken (response2.token)
          yield put(SetTokenAction(response2.token, null))  
  
          response2 = yield getChatsHistory(data, response2.token)
          if (response2.status == 1) {
            const response = {
              response1,
              response2
            }
            yield put({ type: GET_CHATS_SUCCESS, response })
          }
          else {
            yield put(SetTokenAction(null, null))    
            removeStorage ()
            navigate ('LoginScreen')
          }
        }
      }
      else if ( response1.status == 2) {
        replaceToken (response1.token)
        yield put(SetTokenAction(response1.token, null))  
        let newToken = response1.token
        response1 = yield getChats(data, newToken)
        if ( response1.status == 1 ) {
          response2 = yield getChatsHistory(data, newToken)
          if ( response2.status == 1 ) {
            const response = {
              response1,
              response2
            }
            yield put({ type: GET_CHATS_SUCCESS, response })
          }
          else {
            yield put(SetTokenAction(null, null))    
            removeStorage ()
            navigate ('LoginScreen')
          }
        }
        else {
          yield put(SetTokenAction(null, null))    
          removeStorage ()
          navigate ('LoginScreen')
        }
      }
      else {
        yield put(SetTokenAction(null, null))
        removeStorage ()
        navigate('LoginScreen')
      }
      
    } catch (e) {
      yield put({ type: GET_CHATS_FAILURE });
    }
}

export function* getChatsHistorySaga(action) {
  const { token, data } = action
  let response = null
    try {
      response = yield getChatsHistory(data, token)

      if ( response.status == 1 || response.status == 0 ) {
        yield put({ type: GET_CHATS_HISTORY_SUCCESS, response });
        if (response.status == 0) {
          Alert.alert(
            "Tina Maids",
            response?.message,
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
        }
      }
      else if ( response.status == 2) {
        replaceToken (response.token)
        yield put(SetTokenAction(response.token, null))

        response = yield getChatsHistory(data, response.token)
        
        if (response.status == 1 || response.status == 0) {
          yield all([
            put({ type: GET_CHATS_HISTORY_SUCCESS, response }),
          ]);

          if (response.status == 0) {
            Alert.alert(
              "Tina Maids",
              response?.message,
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ],
              { cancelable: false }
            );
          }
        }
        else {    
          yield put(SetTokenAction(null, null))    
          removeStorage ()
          navigate ('LoginScreen')
        }
      }
      else {      
        yield put(SetTokenAction(null, null))    
        removeStorage ()
        navigate('LoginScreen')
      }
    } catch (e) {
      yield put({ type: GET_CHATS_HISTORY_FAILURE });
    }
}

export function* getChatMessagesSaga(action) {
  const { token, data } = action
      let response = null
      try {
        response = yield getChatMessages(data, token)
        if ( response.status == 1 ) {
          yield put({ type: GET_CHAT_MESSAGES_SUCCESS, response });
        }
        else if ( response.status == 2) {
          replaceToken (response.token)
          yield put(SetTokenAction(response.token, null))
  
          response = yield getChatMessages(data, response.token)
          
          if (response.status == 1) {
            yield all([
              put({ type: GET_CHAT_MESSAGES_SUCCESS, response }),
            ]);
          }
          else {    
            yield put(SetTokenAction(null, null))    
            removeStorage ()
            navigate ('LoginScreen')
          }
        }
        else {      
          yield put(SetTokenAction(null, null))    
          removeStorage ()
          navigate('LoginScreen')
        }
    } catch (e) {
      yield put({ type: GET_CHAT_MESSAGES_FAILURE });
    }
}

export function* getMessageDetailSaga(action) {
  const { token, data } = action
      let response = null
      try {
        response = yield getMessageDetail(data, token)
        if ( response.status == 1 ) {
          yield put({ type: GET_MESSAGE_DETAIL_SUCCESS, response });
        }
        else if ( response.status == 2) {
          replaceToken (response.token)
          yield put(SetTokenAction(response.token, null))
  
          response = yield getMessageDetail(data, response.token)
          
          if (response.status == 1) {
            yield all([
              put({ type: GET_MESSAGE_DETAIL_SUCCESS, response }),
            ]);
          }
          else {    
            yield put(SetTokenAction(null, null))    
            removeStorage ()
            navigate ('LoginScreen')
          }
        }
        else {      
          yield put(SetTokenAction(null, null))    
          removeStorage ()
          navigate('LoginScreen')
        }
    } catch (e) {
      yield put({ type: GET_MESSAGE_DETAIL_FAILURE });
    }
}

export function* replyMessageSaga(action) {
    const { token, data } = action
    let response = null;
    try {
      response = yield replyMessage(data,token);
      if (response.status == 1) {
        yield put({ type: REPLY_MESSAGE_SUCCESS, response });
        let message = response?.message;
        navigate('MyMessageScreen', {messageSent: true, message: message});
      }
      else if ( response.status == 2) {
        replaceToken (response.token)
        yield put(SetTokenAction(response.token, null))
        response = yield replyMessage(data, response.token)
        if (response.status == 1) {
          yield all([
            put({ type: REPLY_MESSAGE_SUCCESS, response }),
          ]);
        }
        else {
          yield put(SetTokenAction(null, null))
          removeStorage ()
          navigate ('LoginScreen')
        }
      }
      else {
        yield put(SetTokenAction(null, null))
        removeStorage ()
        navigate('LoginScreen')
      }
    } catch (e) {
      yield put({ type: REPLY_MESSAGE_FAILURE });
    }
}

export function* newChatConversationSaga(action) {
  const { token, data } = action
    let response = null;
    try {
      response = yield newChatConversation(data,token);
      if (response.status == 1) {
        yield put({ type: NEW_CONVERSATION_SUCCESS, response });
        let message = response?.message;
        navigate('MyMessageScreen', {messageSent: true, message: message});
      }
      else if ( response.status == 2) {
        replaceToken (response.token)
        yield put(SetTokenAction(response.token, null))
        response = yield newChatConversation(data, response.token)
        if (response.status == 1) {
          yield all([
            put({ type: NEW_CONVERSATION_SUCCESS, response }),
          ]);
        }
        else {
          yield put(SetTokenAction(null, null))
          removeStorage ()
          navigate ('LoginScreen')
        }
      }
      else {
        yield put(SetTokenAction(null, null))
        removeStorage ()
        navigate('LoginScreen')
      }
    } catch (e) {
      yield put({ type: NEW_CONVERSATION_FAILURE });
    }
}

export function* moveChatToHistorySaga(action) {
  const { token, data } = action
    try {
      const response = yield moveChatToHistory(data,token);
      yield put({ type: MOVE_CHAT_HISTORY_SUCCESS, response });
      if (response.status == 1) {
        Alert.alert(
          "Tina Maids",
          response?.message,
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
      }
    } catch (e) {
      yield put({ type: MOVE_CHAT_HISTORY_FAILURE });
    }
}

export function* getUnreadMessagesSaga(action) {
  const { token, data } = action
    try {
      const response = yield getUnreadMessages(data,token);
      yield put({ type: GET_UNREAD_MESSAGES_SUCCESS, response });
    } catch (e) {
      yield put({ type: GET_UNREAD_MESSAGES_FAILURE });
    }
}