import { put, all } from 'redux-saga/effects';
import { loadProfile, updateProfile } from './services';
import { 
  LOAD_PROFILE_SUCCESS, 
  LOAD_PROFILE_FAILURE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE
} from './types';

import { SetTokenAction } from 'src/store/Auth/action'
import {removeStorage, replaceToken} from 'src/utils/global'
import { navigate } from 'src/utils/navigation'

export function* loadProfileSaga(action) {
  const { token } = action
  let response = null;
  try {
    response = yield loadProfile(token);
    if (response.status == 1) {
      yield put({ type: LOAD_PROFILE_SUCCESS, response });
    }
    else if (response.status == 2) {
      let token = response.token
      replaceToken (token)
      response = yield loadProfile(token)      
      if (response.status == 1) {        
        yield all([
        	put({ type: LOAD_PROFILE_SUCCESS, response }),
        	put(SetTokenAction(token, null)),        	
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
      navigate ('LoginScreen')
    }
  
  } catch (e) {
    yield put({ type: LOAD_PROFILE_FAILURE });
  }
}

export function* upadteProfileSaga(action) {
    const { token, data } = action
    let response = null;
    try {
      response = yield updateProfile(data,token);
      if (response.status == 1) {
        yield put({ type: UPDATE_PROFILE_SUCCESS, response });
      }
      else if (response.status == 2) {
        let token = response.token
        replaceToken (token)
        response = yield updateProfile(data, response.token)      
        if (response.status == 1) {        
          yield all([
            put({ type: LOAD_PROFILE_SUCCESS, response }),
            put(SetTokenAction(token, null)),        	
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
        navigate ('LoginScreen')
      }
      
    } catch (e) {
      yield put({ type: UPDATE_PROFILE_FAILURE });
    }
}
