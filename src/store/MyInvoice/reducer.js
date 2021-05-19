import { 
    GET_INVOICES,
    GET_INVOICES_SUCCESS,
    GET_INVOICES_FAILURE
  } from './types';
  
  export const defaultState = {
    error: null,
    isLoading: false,
    data: null,
    status: -2,
  };
  export const myInvoice = (state = defaultState, action) => {
    switch (action.type) {
      case GET_INVOICES:
        return {
          ...state,
          isLoading: true
        };
      case GET_INVOICES_SUCCESS: 
        return {
          ...state,
          data: action.response.data,
          status: action.response.status,
          isLoading: false
        }
      case GET_INVOICES_FAILURE:
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
  