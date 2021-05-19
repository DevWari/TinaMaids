import { 
    LOAD_CUSTOMER_ESTIMATE_DETAIL,
    LOAD_CUSTOMER_ESTIMATE_DETAIL_SUCCESS,
    LOAD_CUSTOMER_ESTIMATE_DETAIL_FAILURE,

    PAYMENT_ESTIMATE,
    PAYMENT_ESTIMATE_SUCCESS,
    PAYMENT_ESTIMATE_FAILURE,
  } from './types';
  
  export const defaultState = {
    error: null,
    isLoading: false,
    data: null,
    serviceType: null,
    subTask: null,
    status: -2,
  };
  export const personalInfo = (state = defaultState, action) => {
    switch (action.type) {
      case LOAD_CUSTOMER_ESTIMATE_DETAIL:
        return {
          ...state,
          isLoading: true
        };
      case LOAD_CUSTOMER_ESTIMATE_DETAIL_SUCCESS: 
        return {
          ...state,
          data: action.response.data,
          serviceType: action.response.service_type,
          subTask: action.response.sub_task,
          status: action.response.status,
          isLoading: false
        }
      case LOAD_CUSTOMER_ESTIMATE_DETAIL_FAILURE:
        return {
          ...state,
          isLoading: false,
          status: -2,
          data: null,
          subTask: null,
          serviceType: null,
        }
      case PAYMENT_ESTIMATE:
        return {
          ...state,
          isLoading: true
        };
      case PAYMENT_ESTIMATE_SUCCESS: 
        return {
          ...state,
          isLoading: false
        }
      case PAYMENT_ESTIMATE_FAILURE:
        return {
          ...state,
          isLoading: false,
        }
      default:
        return state;
    }
  };
  