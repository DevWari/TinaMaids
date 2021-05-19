import { put, all } from 'redux-saga/effects';
import { login, getUser, register, logout, forgotPassword } from './services';
import { 
  LOGIN_SUCCESS, 
  LOGIN_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE, 
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,  
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  SET_TOKEN_SUCCESS,
  SET_TOKEN_FAILURE
} from './types';

export function* loginSaga(action) {
  const { email, password } = action;
  try {
    const response = yield login(email, password);
    const user = yield getUser(response.token);
    const data = {
      token: response.token,
      user: user.user,
      status: response.status,
    } 
     yield put({ type: LOGIN_SUCCESS, data });
    //return navigate('CheckInHome');
  } catch (e) {
    yield put({ type: LOGIN_FAILURE });
  }
}

export function* setTokenSaga(action) {

  console.log ("Set Token Saga......", action)
  const {token, user} = action
  try {
    const data = {
      token: token,
      user: user
    }
    yield put({ type: SET_TOKEN_SUCCESS, data });
  } catch (e) {
    yield put({ type: SET_TOKEN_FAILURE });
  } 
}

export function* registerSaga(action) {
  const { data } = action;
  try {
    const response = yield register(data);
    const user = yield getUser(response.token);
    const authData = {
      token: response.token,
      user: user.user,
      status: response.status,
    }
     yield put({ type: REGISTER_SUCCESS, authData });
    //return navigate('CheckInHome');
  } catch (e) {
    yield put({ type: REGISTER_FAILURE });
  }
}

export function* logoutSaga(action) {
  const {token} = action;
  try {
    const response = yield logout(token);
     yield put({ type: LOG_OUT_SUCCESS, response });
    //return navigate('CheckInHome');
  } catch (e) {
    yield put({ type: LOG_OUT_FAILURE });
  }
}

export function* forgotPasswordSaga(action) {
  const {email} = action;
  try {
    const response = yield forgotPassword(email);
     yield put({ type: FORGOT_PASSWORD_SUCCESS, response });
    //return navigate('CheckInHome');
  } catch (e) {
    yield put({ type: FORGOT_PASSWORD_FAILURE });
  }
}
