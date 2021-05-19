import { put, all } from 'redux-saga/effects';
import { 
  CREATE_NEW_ESTIMATE_SUCCESS,
  CREATE_NEW_ESTIMATE_FAILURE,
  CREATE_NEW_INFO_SUCCESS,
  CREATE_NEW_INFO_FAILURE,
  CREATE_NEW_JOB_SUCCESS,
  CREATE_NEW_JOB_FAILURE,
  CREATE_NEW_HOME_SUCCESS,
  CREATE_NEW_HOME_FAILURE,
  
} from './types';
import {createNewEstimate, renderNewEstimate} from './services'

export function* createNewInfoSaga(action) {
  const { data } = action
  try {
    const response = yield renderNewEstimate()
    const serverData = {
      data: data,
      initialData: response,
    }
     yield put({ type: CREATE_NEW_INFO_SUCCESS, serverData });
    //return navigate('CheckInHome');
  } catch (e) {
    yield put({ type: CREATE_NEW_INFO_FAILURE });
  }
}
export function* createNewJobSaga(action) {
  const { data } = action
  try {
     yield put({ type: CREATE_NEW_JOB_SUCCESS, data });
    //return navigate('CheckInHome');
  } catch (e) {
    yield put({ type: CREATE_NEW_JOB_FAILURE });
  }
}
export function* createNewHomeSaga(action) {
  const { data } = action
  try {
     yield put({ type: CREATE_NEW_HOME_SUCCESS, data });
    //return navigate('CheckInHome');
  } catch (e) {
    yield put({ type: CREATE_NEW_HOME_FAILURE });
  }
}

export function* createNewEstimateSaga(action) {
  const { data, token } = action
  try {
    const response  = yield createNewEstimate(data, token)
     yield put({ type: CREATE_NEW_ESTIMATE_SUCCESS, response });
    //return navigate('CheckInHome');
  } catch (e) {
    yield put({ type: CREATE_NEW_ESTIMATE_FAILURE });
  }
}
