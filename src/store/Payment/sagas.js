import { put, all } from 'redux-saga/effects';
import { 
  getPaymentInfo, 
  payment, 
  getInvoiceInfo,
  invoicePayment
} from './services';
import { 
  GET_PAYMENT_INFO_SUCCESS,
  GET_PAYMENT_INFO_FAILURE,
  PAYMENT_SUCCESS,
  PAYMENT_FAILURE,
  GET_INVOICE_INFO_SUCCESS,
  GET_INVOICE_INFO_FAILURE,
  INVOICE_PAYMENT_SUCCESS,
  INVOICE_PAYMENT_FAILURE
} from './types';
import {Alert} from 'react-native'
import { SetTokenAction } from 'src/store/Auth/action'
import {removeStorage, replaceToken} from 'src/utils/global'
import { navigate } from 'src/utils/navigation'


export function* getPaymentInfoSaga(action) {
  const { hashedId, token } = action
  let response = null;
  try {
    response = yield getPaymentInfo(hashedId, token);
    if (response.status == 1) {
      yield put({ type: GET_PAYMENT_INFO_SUCCESS, response });
    }
    else if (response.status == 2) {
      let token = response.token
      replaceToken (response.token)
      response = yield getPaymentInfo(status, response.token)      
      if (response.status == 1) {        
        yield all([
        	put({ type: GET_PAYMENT_INFO_SUCCESS, response }),
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
     
    //return navigate('CheckInHome');
  } catch (e) {
    yield put({ type: GET_PAYMENT_INFO_FAILURE });
  }
}
export function* paymentSaga(action) {
  const { data, token } = action
  let response = null;
  try {
    response = yield payment(data, token);
    if (response.status == 1) {
      Alert.alert(response.message)
      yield put({ type: PAYMENT_SUCCESS, response });  
    }
    else if (response.status == 2) {
      let token = response.token
      replaceToken (token)
      response = yield payment(data, response.token)      
      if (response.status == 1) {        
        yield all([
        	put({ type: PAYMENT_SUCCESS, response }),
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
      yield put({ type: PAYMENT_FAILURE });
  }
}

export function* invoicePaymentSaga(action) {
    const { data, token } = action
    let response = null;
    try {
      response = yield invoicePayment(data, token);
      if (response.status == 1) {
        Alert.alert(response.message)
        yield put({ type: INVOICE_PAYMENT_SUCCESS, response });
      }
      else if (response.status == 2) {
        let token = response.token
        replaceToken (token)
        response = yield invoicePayment(data, response.token)      
        if (response.status == 1) {        
          yield all([
            put({ type: INVOICE_PAYMENT_SUCCESS, response }),
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
        yield put({ type: INVOICE_PAYMENT_FAILURE });
    }
}

export function* getInvoiceInfoSaga(action) {
    const { hashedId, token } = action
    let response = null
    try {
      response = yield getInvoiceInfo(hashedId, token);
      if (response.status == 1) {
        yield put({ type: GET_INVOICE_INFO_SUCCESS, response });
      }
      else if (response.status == 2) {
        let token = response.token
        replaceToken (token)
        response = yield getInvoiceInfo(hashedId, response.token)      
        if (response.status == 1) {        
          yield all([
            put({ type: GET_INVOICE_INFO_SUCCESS, response }),
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
        yield put({ type: GET_INVOICE_INFO_FAILURE });
    }
}
  