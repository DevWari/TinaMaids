import {
  ADD_NOTIFICATION,
  INIT_NOTIFICATION,
  UPDATE_NOTIFICATION 
} from './types';

export const addNotification = (notifyData) => {
  return {
  type: ADD_NOTIFICATION,
  payload: notifyData,
}};

export const initNotification = () => {
  return {
    type: INIT_NOTIFICATION,
    payload: [],
  }
};

export const updateNotification = (notifyData) => {
  return {
    type: UPDATE_NOTIFICATION,
    payload: notifyData,
  }
};
  