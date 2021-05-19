import { 
    CREATE_NEW_INFO,
    CREATE_NEW_INFO_SUCCESS,
    CREATE_NEW_INFO_FAILURE,

    CREATE_NEW_JOB,
    CREATE_NEW_JOB_SUCCESS,
    CREATE_NEW_JOB_FAILURE,

    CREATE_NEW_HOME,
    CREATE_NEW_HOME_SUCCESS,
    CREATE_NEW_HOME_FAILURE,
    
    CREATE_NEW_ESTIMATE,
    CREATE_NEW_ESTIMATE_SUCCESS,
    CREATE_NEW_ESTIMATE_FAILURE

  } from './types';
  
  export const defaultState = {
    error: null,
    isLoading: false,
    status: -2,
    name: '',
    email: '',
    phone: '',
    serviceType: null,
    jobType: null,
    frequency: null,
    bedrooms: null,
    bathrooms: null,
    footage: null,
    pets: null,
    address: '',
    requestDate: '',
    requestTime: '',
    description: '',
    extraService: null,
    initialData: null,
    zip: null,
    stateName: null,
    city: null,
  };
  export const newEstimate = (state = defaultState, action) => {
    switch (action.type) {
      case CREATE_NEW_INFO:
        return {
          ...state,
          isLoading: true
        };
      case CREATE_NEW_INFO_SUCCESS: 
        return {
          ...state,
          name: action.serverData.data.name,
          email: action.serverData.data.email,
          phone: action.serverData.data.phone,
          initialData: action.serverData.initialData.data,
          isLoading: false
        }
      case CREATE_NEW_INFO_FAILURE:
        return {
          ...state,
          isLoading: false,
        }
      case CREATE_NEW_JOB:
        return {
          ...state,
          isLoading: true
        };
      case CREATE_NEW_JOB_SUCCESS: 
        
        return {
          ...state,
          jobType: action.data.jobType,
          serviceType: action.data.serviceType,
          frequency: action.data.frequency,
          isLoading: false
        }
      case CREATE_NEW_JOB_FAILURE:
        return {
          ...state,
          isLoading: false,
        }
      case CREATE_NEW_HOME:
        return {
          ...state,
          isLoading: true
        };
      case CREATE_NEW_HOME_SUCCESS: 
        return {
          ...state,
          bedrooms: action.data.bedrooms,
          bathrooms: action.data.bathrooms,
          footage: action.data.footage,
          pets: action.data.pets,
          address: action.data.address,
          extraService: action.data.extraService,
          city: action.data.city,
          stateName: action.data.stateName,
          zip: action.data.zip,
          isLoading: false
        }
      case CREATE_NEW_HOME_FAILURE:
        return {
          ...state,
          isLoading: false,
        }
      case CREATE_NEW_ESTIMATE:
        return {
          ...state,
          status: -2,
          isLoading: true
        };
      case CREATE_NEW_ESTIMATE_SUCCESS: 
        return {
          ...state,
          isLoading: false,
          status: action.response.status
        }
      case CREATE_NEW_ESTIMATE_FAILURE:
        return {
          ...state,
          isLoading: false,
          status: -2
        }
      default:
        return state;
    }
  };
  