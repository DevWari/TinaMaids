import { put, all } from 'redux-saga/effects';
import { loadCustomerEstimate } from './services';
import { 
  LOAD_CUSTOMER_ESTIMATES_SUCCESS,
  LOAD_CUSTOMER_ESTIMATES_FAILURE
} from './types';
import { SetTokenAction } from 'src/store/Auth/action'
import {removeStorage, replaceToken} from 'src/utils/global'
import { navigate } from 'src/utils/navigation'


export function* loadCustomerEstimateSaga(action) {
  const { token } = action
  let response = null;  
  try {
    response = yield loadCustomerEstimate(token);
    console.log ("My Estimate....", response)
    if ( response.status == 1) {
      console.log ("My Estimate ......status================1")
      yield put({ type: LOAD_CUSTOMER_ESTIMATES_SUCCESS, response });
    }
    else if ( response.status == 2) {
      let token = response.token
      replaceToken (response.token)
      console.log ("MY Estimage... token=====> response ====== 2", response.token)
      response = yield loadCustomerEstimate(response.token)
      if (response.status == 1) {
        console.log ("My Estimate Status =======2------>1===========")   
        yield all([
        	put({ type: LOAD_CUSTOMER_ESTIMATES_SUCCESS, response }),
        	put(SetTokenAction(token, null)),        	
        ]);     
      }
      else {    
        console.log ("My Estimate.....status 2==========other")
        yield put(SetTokenAction(null, null))    
        removeStorage ()
        navigate ('LoginScreen')
      }
    }
    else {      
      console.log ("My Estimate.....status -1==================", response.status)
      yield put(SetTokenAction(null, null))    
      removeStorage ()
      navigate('LoginScreen')
    }
  } catch (e) {
    yield put({ type: LOAD_CUSTOMER_ESTIMATES_FAILURE });
  }
}


