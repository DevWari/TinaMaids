import { put, all } from 'redux-saga/effects';
import { getInvoice } from './services';
import { 
  GET_INVOICES_SUCCESS,
  GET_INVOICES_FAILURE
} from './types';
import { SetTokenAction } from 'src/store/Auth/action'
import {removeStorage, replaceToken} from 'src/utils/global'
import { navigate } from 'src/utils/navigation'


export function* getInvoiceSaga(action) {
  const { token, status } = action
  console.log ("Invoice token.....")
  let response = null;
  try {
    response = yield getInvoice(status,token);
    if (response.status == 1) {
      console.log ("Invoice status ====== 1")
      yield put({ type: GET_INVOICES_SUCCESS, response });
    }
    else if (response.status == 2) {
      let token = response.token
      console.log ("Invoice status  ================ 2", response.token)
      replaceToken (response.token)
      response = yield getInvoice(status, response.token)      
      if (response.status == 1) {        
        console.log ("Invoice status ===========2 -------- 1")
        yield all([
        	put({ type: GET_INVOICES_SUCCESS, response }),
        	put(SetTokenAction(token, null)),        	
        ]);     
      }
      else {    
        console.log ("Invoice status ===========2 ------------other", response.status)
        yield put(SetTokenAction(null, null))    
        removeStorage ()
        navigate ('LoginScreen')
      }
    }
    else {
      console.log ("Invoice status ================= 2 ===========", response.status)
      console.log("end Invoice....")
      yield put(SetTokenAction(null, null))    
      removeStorage ()
      navigate ('LoginScreen')
    }
     
    //return navigate('CheckInHome');
  } catch (e) {
    yield put({ type: GET_INVOICES_FAILURE });
  }
}


