import { 
  GET_CHATS,
  GET_CHATS_SUCCESS,
  GET_CHATS_FAILURE,
  
  GET_CHATS_HISTORY,
  GET_CHATS_HISTORY_SUCCESS,
  GET_CHATS_HISTORY_FAILURE,

  GET_CHAT_MESSAGES,
  GET_CHAT_MESSAGES_SUCCESS,
  GET_CHAT_MESSAGES_FAILURE,

  GET_MESSAGE_DETAIL,
  GET_MESSAGE_DETAIL_SUCCESS,
  GET_MESSAGE_DETAIL_FAILURE,

  REPLY_MESSAGE,
  REPLY_MESSAGE_SUCCESS,
  REPLY_MESSAGE_FAILURE,

  NEW_CONVERSATION,
  NEW_CONVERSATION_SUCCESS,
  NEW_CONVERSATION_FAILURE,

  MOVE_CHAT_HISTORY,
  MOVE_CHAT_HISTORY_SUCCESS,
  MOVE_CHAT_HISTORY_FAILURE,

  GET_UNREAD_MESSAGES,
  GET_UNREAD_MESSAGES_SUCCESS,
  GET_UNREAD_MESSAGES_FAILURE,

} from './types';

export const defaultState = {
  chats: [],
  chatsHistory: [],
  chatMessages: null,
  messageDetail: null,
  unreadMessages: null,
  isLoading: false,
  status: -2,
};

export const chats = (state = defaultState, action) => {
  switch (action.type) {
    case GET_CHATS_SUCCESS:
      return {
        ...state,
        chats: action.response.response1,
        chatsHistory: action.response.response2,
        status: 1,
        isLoading: false
      };
    case GET_CHATS_FAILURE: 
      return {
        ...state,
        chats: [],
        chatsHistory: [],
        isLoading: false,
        status: -2,
    }
    case GET_CHATS:
      return {
        ...state,
        chats: [],
        chatsHistory: [],
        status: -2,
        isLoading: true,
      };
    case GET_CHATS_HISTORY_SUCCESS:
      return {
        ...state,
        chatsHistory: action.response,
        status: 1,
        isLoading: false
      };
    case GET_CHATS_HISTORY_FAILURE: 
      return {
        ...state,
        chatsHistory: [],
        isLoading: false,
        status: -2,
    }
    case GET_CHATS_HISTORY:
      return {
        ...state,
        chatsHistory: [],
        status: -2,
        isLoading: true,
      };
    case GET_CHAT_MESSAGES_SUCCESS:
      return {
        ...state,
        chatMessages: action.response,
        status: 1,
        isLoading: false
      };
    case GET_CHAT_MESSAGES_FAILURE: 
      return {
        ...state,
        chatMessages: null,
        isLoading: false,
        status: -2,
    }
    case GET_CHAT_MESSAGES:
      return {
        ...state,
        chatMessages: null,
        status: -2,
        isLoading: true,
      };
    case GET_MESSAGE_DETAIL_SUCCESS:
      return {
        ...state,
        messageDetail: action.response,
        status: 1,
        isLoading: false
      };
    case GET_MESSAGE_DETAIL_FAILURE: 
      return {
        ...state,
        messageDetail: [],
        isLoading: false,
        status: -2,
    }
    case GET_MESSAGE_DETAIL:
      return {
        ...state,
        messageDetail: [],
        status: -2,
        isLoading: true,
      };
    case REPLY_MESSAGE_SUCCESS:
      return {
        ...state,
        status: action.response.status,
        isLoading: false
      };
    case REPLY_MESSAGE_FAILURE: 
      return {
        ...state,
        isLoading: false,
        status: -2,
    }
    case REPLY_MESSAGE:
      return {
        ...state,
        status: -2,
        isLoading: true,
      };

    case NEW_CONVERSATION_SUCCESS:
      return {
        ...state,
        status: 200,
        isLoading: false
      };
    case NEW_CONVERSATION_FAILURE: 
      return {
        ...state,
        isLoading: false,
        status: -2,
    }
    case NEW_CONVERSATION:
      return {
        ...state,
        status: -2,
        isLoading: true,
      };
    case MOVE_CHAT_HISTORY_SUCCESS:
      return {
        ...state,
        status: 200,
        isLoading: false
      };
    case MOVE_CHAT_HISTORY_FAILURE:
      return {
        ...state,
        isLoading: false,
        status: -2,
    }
    case MOVE_CHAT_HISTORY:
      return {
        ...state,
        status: -2,
        isLoading: true,
      };
    case GET_UNREAD_MESSAGES_SUCCESS:
      return {
        ...state,
        unreadMessages: action.response,
        status: 1,
        isLoading: false
      };
    case GET_UNREAD_MESSAGES_FAILURE: 
      return {
        ...state,
        isLoading: false,
        status: -2,
        unreadMessages: null,
    }
    case GET_UNREAD_MESSAGES:
      return {
        ...state,
        status: -2,
        isLoading: true,
        unreadMessages: null
      };
    default:
      return state;
  }
};
