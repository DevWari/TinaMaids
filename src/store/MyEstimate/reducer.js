import { 
    LOAD_CUSTOMER_ESTIMATES,
    LOAD_CUSTOMER_ESTIMATES_SUCCESS,
    LOAD_CUSTOMER_ESTIMATES_FAILURE
  } from './types';
  
  export const defaultState = {
    error: null,
    isLoading: false,
    data: null,
    status: -2,
  };
  export const myEstimate = (state = defaultState, action) => {
    switch (action.type) {
      case LOAD_CUSTOMER_ESTIMATES:
        return {
          ...state,
          isLoading: true
        };
      case LOAD_CUSTOMER_ESTIMATES_SUCCESS: 
        return {
          ...state,
          data: action.response.data,
          status: action.response.status,
          isLoading: false
        }
      case LOAD_CUSTOMER_ESTIMATES_FAILURE:
        return {
          ...state,
          isLoading: false,
          status: -2,
          data: null,
        }
      default:
        return state;
    }
  };
  