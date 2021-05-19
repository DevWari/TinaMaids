import { 
  LOAD_PROFILE, 
  LOAD_PROFILE_SUCCESS, 
  LOAD_PROFILE_FAILURE, 
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE
} from './types';

export const defaultState = {
  error: null,
  isLoading: false,
  data: null,
  status: -2,
  update_status: -2,
};
export const account = (state = defaultState, action) => {
  switch (action.type) {
    case LOAD_PROFILE:
      return {
        ...state,
        isLoading: true
      };
    case LOAD_PROFILE_SUCCESS: 
      return {
        ...state,
        data: action.response,
        isLoading: false
      }
    case LOAD_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        status: -2,
        data: null,
      }
    case UPDATE_PROFILE:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_PROFILE_SUCCESS: 
      return {
        ...state,
        update_status: action.response.status,
        isLoading: false
      }
    case UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        update_status: -2
      }
    default:
      return state;
  }
};
