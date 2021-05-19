import { put, all } from 'redux-saga/effects';
import { 
  loadCustomerEstimateDetail,
  paymentEstimate
} from './services';
import { 
  LOAD_CUSTOMER_ESTIMATE_DETAIL_SUCCESS,
  LOAD_CUSTOMER_ESTIMATE_DETAIL_FAILURE,
  PAYMENT_ESTIMATE_SUCCESS,
  PAYMENT_ESTIMATE_FAILURE,
} from './types';
import { SetTokenAction } from 'src/store/Auth/action'
import {removeStorage, replaceToken} from 'src/utils/global'
import { navigate } from 'src/utils/navigation'

export function* loadCustomerEstimateDetailSaga(action) {
  const { token, hashedId } = action
  let response = null
  try {
    response = yield loadCustomerEstimateDetail(token,hashedId);
    if (response.status == 1) {
      yield put({ type: LOAD_CUSTOMER_ESTIMATE_DETAIL_SUCCESS, response });
    }
    else if (response.status == 2) {
      let token = response.token
      replaceToken (token)
      response = yield loadCustomerEstimateDetail(response.token, hashedId)      
      if (response.status == 1) {        
        yield all([
        	put({ type: LOAD_CUSTOMER_ESTIMATE_DETAIL_SUCCESS, response }),
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
    yield put({ type: LOAD_CUSTOMER_ESTIMATE_DETAIL_FAILURE });
  }
}

export function* paymentEstimateSaga(action) {
  const { token, hashedId, stripeToken } = action
  let response = null
  try {
    response = yield paymentEstimate(token,hashedId, stripeToken);
    if (response.status == 1) {
      yield put({ type: PAYMENT_ESTIMATE_SUCCESS, response });
    }
    else if (response.status == 2) {
      let token = response.token
      replaceToken (token)
      response = yield paymentEstimate(response.token, hashedId, stripeToken)      
      if (response.status == 1) {        
        yield all([
        	put({ type: PAYMENT_ESTIMATE_SUCCESS, response }),
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
    yield put({ type: PAYMENT_ESTIMATE_FAILURE });
  }
}


