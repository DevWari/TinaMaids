import {
    CREATE_NEW_ESTIMATE,
    CREATE_NEW_INFO,
    CREATE_NEW_JOB,
    CREATE_NEW_HOME,
  } from './types';
  
export function CreateNewEstimateAction(data, token) {
  return {
    type: CREATE_NEW_ESTIMATE,
    token,
    data,
  };
}
export function CreateNewInfoAction(data) {
  return {
    type: CREATE_NEW_INFO,
    data,
  };
}

export function CreateNewJobAction(data) {
  return {
    type: CREATE_NEW_JOB,
    data,
  };
}

export function CreateNewHomeAction(data) {
  return {
    type: CREATE_NEW_HOME,
    data,
  };
}

