import { put, all } from 'redux-saga/effects';
import { getInvoiceDetail } from './services';
import { 
  GET_INVOICE_DETAIL_SUCCESS,
  GET_INVOICE_DETAIL_FAILURE
} from './types';

import { SetTokenAction } from 'src/store/Auth/action'
import {removeStorage, replaceToken} from 'src/utils/global'
import { navigate } from 'src/utils/navigation'


export function* getInvoiceDetailSaga(action) {
  const { token, hashedId } = action
  let response = null
  try {
    response = yield getInvoiceDetail(hashedId,token);
    if (response.status == 1) {
      yield put({ type: GET_INVOICE_DETAIL_SUCCESS, response });
    }
    else if (response.status == 2) {
      let token = response.token
      replaceToken (token)
      response = yield getInvoiceDetail(response.token)      
      if (response.status == 1) {        
        yield all([
        	put({ type: GET_INVOICE_DETAIL_SUCCESS, response }),
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
      navigate('LoginScreen')
    }
     
  } catch (e) {
    yield put({ type: GET_INVOICE_DETAIL_FAILURE });
  }
}


