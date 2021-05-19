import {
    LOAD_PROFILE,
    UPDATE_PROFILE
  } from './types';
  
export function LoadProfileAction(token) {
  return {
    type: LOAD_PROFILE,
    token
  };
}
export function UpdateProfileAction(data, token) {
    return {
      type: UPDATE_PROFILE,
      token,
      data
    };
}
    