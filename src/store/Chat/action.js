import {
  GET_CHATS,
  GET_CHATS_HISTORY,
  GET_CHAT_MESSAGES,
  GET_MESSAGE_DETAIL,
  REPLY_MESSAGE,
  NEW_CONVERSATION,
  MOVE_CHAT_HISTORY,
  GET_UNREAD_MESSAGES
} from './types';

export function getChatsAction(data, token) {
  return {
    type: GET_CHATS,
    token,
    data
  };
}

export function getChatsHistoryAction(data, token) {
  return {
    type: GET_CHATS_HISTORY,
    token,
    data
  };
}

export function getChatMessagesAction(data, token) {
  return {
    type: GET_CHAT_MESSAGES,
    token,
    data
  };
}

export function getMessageDetailAction(data, token) {
  return {
    type: GET_MESSAGE_DETAIL,
    token,
    data
  };
}

export function replyMessageAction(data, token) {
  return {
    type: REPLY_MESSAGE,
    token,
    data
  };
}

export function newConversationAction(data, token) {
  return {
    type: NEW_CONVERSATION,
    token,
    data
  };
}

export function moveChatToHistoryAction(data, token) {
  return {
    type: MOVE_CHAT_HISTORY,
    token,
    data
  };
}

export function GetUnreadMessagesAction(data, token) {
  return {
    type: GET_UNREAD_MESSAGES,
    token,
    data
  };
}


