import { 
    GET_PAYMENT_INFO, 
    GET_PAYMENT_INFO_SUCCESS, 
    GET_PAYMENT_INFO_FAILURE, 

    PAYMENT,
    PAYMENT_SUCCESS,
    PAYMENT_FAILURE,

    INVOICE_PAYMENT,
    INVOICE_PAYMENT_SUCCESS,
    INVOICE_PAYMENT_FAILURE,

    GET_INVOICE_INFO,
    GET_INVOICE_INFO_SUCCESS,
    GET_INVOICE_INFO_FAILURE
} from './types';
  
export const defaultState = {
    error: null,
    isLoading: false,
    data: null,
    status: -2,
    paymentStatus: -2,
};
  export const payment = (state = defaultState, action) => {
    switch (action.type) {
      
      case GET_PAYMENT_INFO:
        return {
          ...state,
          isLoading: true
        };
      case GET_PAYMENT_INFO_SUCCESS: 
        return {
          ...state,
          data: action.response.data,
          isLoading: false,
          status: action.response.status
        }
      case GET_PAYMENT_INFO_FAILURE:
        return {
          ...state,
          isLoading: false,
          update_status: -2
        }
      case GET_INVOICE_INFO:
        return {
            ...state,
            isLoading: true
        };
      case GET_INVOICE_INFO_SUCCESS: 
        return {
            ...state,
            data: action.response,
            isLoading: false,
            status: action.response.status
        }
      case GET_INVOICE_INFO_FAILURE:
        return {
            ...state,
            isLoading: false,
            update_status: -2
        }
      case PAYMENT:
        return {
            ...state,
            isLoading: true,
            paymentStatus: -2,
        };
      case PAYMENT_SUCCESS: 
        return {
            ...state,
            isLoading: false,
            paymentStatus: action.response.status
        }
      case PAYMENT_FAILURE:
        return {
            ...state,
            isLoading: false,
            paymentStatus: -2,
        }
      case INVOICE_PAYMENT:
        return {
            ...state,
            isLoading: true,
            status: -2,
        };
      case INVOICE_PAYMENT_SUCCESS: 
        return {
            ...state,
            isLoading: false,
            status: action.response.status
        }
      case INVOICE_PAYMENT_FAILURE:
        return {
            ...state,
            isLoading: false,
            status: -2
        }
      default:
        return state;
    }
  };
  