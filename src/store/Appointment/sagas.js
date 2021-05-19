import { put, all, call } from 'redux-saga/effects';
import { navigate } from 'src/utils/navigation';

import { 
  getAllAppointments,
  getEstimateAppointments,
  getAppointmentDetail,
  getExtraServices,
  addAppointment,
  cancelAppointment,
} from './services';

import {
  GET_ALL_APPOINTMENTS_SUCCESS, GET_ALL_APPOINTMENTS_FAILURE,
  GET_ESTIMATE_APPOINTMENTS_SUCCESS, GET_ESTIMATE_APPOINTMENTS_FAILURE,
  GET_APPOINTMENT_DETAIL_SUCCESS, GET_APPOINTMENT_DETAIL_FAILURE,
  GET_EXTRA_SERVICES_SUCCESS, GET_EXTRA_SERVICES_FAILURE,
  ADD_APPOINTMENT_SUCCESS, ADD_APPOINTMENT_FAILURE,
  CANCEL_APPOINTMENT_SUCCESS, CANCEL_APPOINTMENT_FAILURE
} from './types';
import { Alert } from 'react-native';
import { SetTokenAction } from 'src/store/Auth/action'
import {removeStorage, replaceToken} from 'src/utils/global'

export function* getAllAppointmentsSaga(action) {
  const { token, data } = action  
  let response = null;
    try {
      response = yield getAllAppointments(data, token);
      if ( response.status == 1) {
        yield put({ type: GET_ALL_APPOINTMENTS_SUCCESS, response });
      }
      else if ( response.status == 2) {
        replaceToken (response.token)
        yield put(SetTokenAction(response.token, null))

        response = yield getAllAppointments(data, response.token)
        if (response.status == 1) {
          yield all([
            put({ type: GET_ALL_APPOINTMENTS_SUCCESS, response }),
          ]);
        }
        else {
          yield put(SetTokenAction(null, null))
          removeStorage ()
          navigate ('LoginScreen')
        }
      }
      else {
        yield put(SetTokenAction(null, null))
        removeStorage ()
        navigate('LoginScreen')
      }
    } catch (e) {
      yield put({ type: GET_ALL_APPOINTMENTS_FAILURE });
    }
}

export function* getEstimateAppointmentsSaga(action) {
  const { token, data } = action
    let response = null;
    try {
      response = yield getEstimateAppointments(data, token);
      if ( response.status == 1) {
        yield put({ type: GET_ESTIMATE_APPOINTMENTS_SUCCESS, response });
      }
      else if ( response.status == 2) {
        replaceToken (response.token)
        yield put(SetTokenAction(response.token, null))

        response = yield getEstimateAppointments(data, response.token)
        if (response.status == 1) {
          yield all([
            put({ type: GET_ESTIMATE_APPOINTMENTS_SUCCESS, response }),
          ]);     
        }
        else {
          yield put(SetTokenAction(null, null))
          removeStorage ()
          navigate ('LoginScreen')
        }
      }
      else {
        yield put(SetTokenAction(null, null))
        removeStorage ()
        navigate('LoginScreen')
      }
    } catch (e) {
      yield put({ type: GET_ESTIMATE_APPOINTMENTS_FAILURE });
    }
}

export function* getAppointmentDetailSaga(action) {
  const { token, data } = action
    let response = null;
    try {
      response = yield getAppointmentDetail(data, token);
      if ( response.status == 1) {
        yield put({ type: GET_APPOINTMENT_DETAIL_SUCCESS, response });
      }
      else if ( response.status == 2) {
        replaceToken (response.token)
        yield put(SetTokenAction(response.token, null))

        response = yield getAppointmentDetail(data, response.token)
        if (response.status == 1) {
          yield all([
            put({ type: GET_APPOINTMENT_DETAIL_SUCCESS, response }),
          ]);     
        }
        else {
          yield put(SetTokenAction(null, null))
          removeStorage ()
          navigate ('LoginScreen')
        }
      }
      else {
        yield put(SetTokenAction(null, null))
        removeStorage ()
        navigate('LoginScreen')
      }
    } catch (e) {
      yield put({ type: GET_APPOINTMENT_DETAIL_FAILURE });
    }
}

export function* getExtraServicesSaga(action) {
  const { token, data } = action
    let response = null;
    try {
      response = yield getExtraServices(data, token);
      if ( response.status == 1) {
        yield put({ type: GET_EXTRA_SERVICES_SUCCESS, response });
      }
      else if ( response.status == 2) {
        replaceToken (response.token)
        yield put(SetTokenAction(response.token, null))
        response = yield getExtraServices(data, response.token)
        if (response.status == 1) {
          yield all([
            put({ type: GET_EXTRA_SERVICES_SUCCESS, response }),
          ]);
        }
        else {
          yield put(SetTokenAction(null, null))
          removeStorage ()
          navigate ('LoginScreen')
        }
      }
      else {
        yield put(SetTokenAction(null, null))
        removeStorage ()
        navigate('LoginScreen')
      }
    } catch (e) {
      yield put({ type: GET_EXTRA_SERVICES_FAILURE });
    }
}

export function* addAppointmentSaga(action) {
  const { token, data } = action
    try {
      const response = yield addAppointment(data,token);
      yield put({ type: ADD_APPOINTMENT_SUCCESS, response });
      if (response.status == 1) {
        navigate('PersonalInfo', {accept: true, hashedId: data.hashed_id});
      }
      else {
        Alert.alert(
          "Tina Maids",
          response?.message,
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
      }
    } catch (e) {
      yield put({ type: ADD_APPOINTMENT_FAILURE });
    }
}

export function* cancelAppointmentSaga(action) {
  const { token, data } = action
    try {
      const response = yield cancelAppointment(data,token);
      yield put({ type: CANCEL_APPOINTMENT_SUCCESS, response });
      if (response.status == 1) {
        Alert.alert(
          "Tina Maids",
          response?.message,
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
      }
    } catch (e) {
      yield put({ type: CANCEL_APPOINTMENT_FAILURE });
    }
}