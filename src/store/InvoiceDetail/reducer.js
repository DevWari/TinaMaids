import { 
    GET_INVOICE_DETAIL,
    GET_INVOICE_DETAIL_SUCCESS,
    GET_INVOICE_DETAIL_FAILURE
  } from './types';
  
  export const defaultState = {
    error: null,
    isLoading: false,
    data: null,
    status: -2,
  };
  export const invoiceDetail = (state = defaultState, action) => {
    switch (action.type) {
      case GET_INVOICE_DETAIL:
        return {
          ...state,
          isLoading: true
        };
      case GET_INVOICE_DETAIL_SUCCESS: 
        return {
          ...state,
          data: action.response.data,
          status: action.response.status,
          isLoading: false
        }
      case GET_INVOICE_DETAIL_FAILURE:
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
  