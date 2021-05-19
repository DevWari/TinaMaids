import { 
  ADD_NOTIFICATION,
  INIT_NOTIFICATION,
  UPDATE_NOTIFICATION
} from './types';

export const defaultState = {
  notifyData: [],
  isReadNotify: true,
  isLoading: false,
  isSuccess: false,
  errorMsg: "",
};

export const notification = (state = defaultState, action) => {
  let newNotifyData = JSON.parse(JSON.stringify(state.notifyData));
  let payload = action.payload;
  
  switch (action.type) {
    case ADD_NOTIFICATION:
      newNotifyData.push(payload);

      return {
        ...state,
        notifyData: newNotifyData,
        isReadNotify: false,
        isLoading: false,
        isSuccess: true,
        errorMsg: "",
      };
    case INIT_NOTIFICATION:
        return {
          ...state,
          notifyData: [],
          isReadNotify: true,
          isLoading: false,
          isSuccess: true,
          errorMsg: "",
        };
    case UPDATE_NOTIFICATION:
      let isReadNotify = payload.check;
      newNotifyData.forEach((item, index) =>{
        if (item.id == payload.id) {
          newNotifyData[index] = payload
        }
        else {
          if(item.check == false)
            isReadNotify = false
        }
      })

      return {
        ...state,
        notifyData: newNotifyData,
        isReadNotify: isReadNotify,
        isLoading: false,
        isSuccess: true,
        errorMsg: "",
      };

    default:
      return state;
  }
};
