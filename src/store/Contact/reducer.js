import { 
    SEND_CONTACT, 
    SEND_CONTACT_SUCCESS, 
    SEND_CONTACT_FAILURE,
    INIT_CONTACT_STATUS,
  } from './types';
  
  export const defaultState = {
    error: null,
    isLoading: false,
    status: -2,
  };
  export const contact = (state = defaultState, action) => {
    
    switch (action.type) {
      case SEND_CONTACT:
        return {
          ...state,
          isLoading: true,
          status: -2,
        };
      case SEND_CONTACT_SUCCESS: 
        return {
          ...state,
          status: action.response.success ? action.response.success : -1 ,
          isLoading: false
        }
      case SEND_CONTACT_FAILURE:
        return {
          ...state,
          isLoading: false,
          status: -2,
        }
      case INIT_CONTACT_STATUS:
        return {
          ...state,
          isLoading: false,
          status: -2,
        }
      default:
        return state;
    }
  };
  