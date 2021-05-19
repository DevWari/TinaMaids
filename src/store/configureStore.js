/*******
 * configureStore
 * Set up and configure store, reducers and epics
 */
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, all } from 'redux-saga/effects';

/* Reducers */

import { session } from './Auth/reducer';
import { account } from './MyAccount/reducer';
import { contact } from './Contact/reducer';
import { notification } from './Notification/reducer';
import { appointment } from './Appointment/reducer';
import { chats } from './Chat/reducer';
import { myEstimate } from './MyEstimate/reducer';
import { personalInfo } from './PersonalInfo/reducer';
import { myInvoice } from './MyInvoice/reducer';
import { invoiceDetail } from './InvoiceDetail/reducer';
import { newEstimate } from './NewEstimate/reducer';
import { payment } from './Payment/reducer';


/* Sagas */

import { loginSaga, registerSaga, logoutSaga, forgotPasswordSaga, setTokenSaga } from './Auth/sagas';
import { loadProfileSaga, upadteProfileSaga } from './MyAccount/sagas';
import { sendContactSaga } from './Contact/sagas';
import { loadCustomerEstimateSaga } from './MyEstimate/sagas';
import { getPaymentInfoSaga, paymentSaga, getInvoiceInfoSaga, invoicePaymentSaga } from './Payment/sagas';
import { 
  createNewInfoSaga,
  createNewJobSaga,
  createNewHomeSaga,
  createNewEstimateSaga
} from './NewEstimate/sagas';
import { 
  loadCustomerEstimateDetailSaga,
  paymentEstimateSaga
} from './PersonalInfo/sagas';
import { getInvoiceSaga } from './MyInvoice/sagas';
import { getInvoiceDetailSaga } from './InvoiceDetail/sagas';
import {
  getAllAppointmentsSaga,
  getEstimateAppointmentsSaga,
  getAppointmentDetailSaga,
  getExtraServicesSaga,
  addAppointmentSaga,
  cancelAppointmentSaga,
} from './Appointment/sagas';

import { 
  getChatsSaga,
  getChatsHistorySaga,
  getChatMessagesSaga,
  getMessageDetailSaga,
  replyMessageSaga,
  newChatConversationSaga,
  moveChatToHistorySaga,
  getUnreadMessagesSaga
} from './Chat/sagas';

/* Actions    */

import { LOGIN, REGISTER, LOG_OUT, FORGOT_PASSWORD, SET_TOKEN } from './Auth/types';
import { LOAD_PROFILE, UPDATE_PROFILE } from './MyAccount/types';
import { SEND_CONTACT } from './Contact/types';
import { LOAD_CUSTOMER_ESTIMATES } from './MyEstimate/types';
import { 
  LOAD_CUSTOMER_ESTIMATE_DETAIL,
  PAYMENT_ESTIMATE
} from './PersonalInfo/types';
import { GET_INVOICES } from './MyInvoice/types';
import { GET_INVOICE_DETAIL } from './InvoiceDetail/types';
import { GET_PAYMENT_INFO, PAYMENT, GET_INVOICE_INFO, INVOICE_PAYMENT, INVOICE_PAYMENT_FAILURE } from './Payment/types';
import {
  GET_ALL_APPOINTMENTS,
  GET_ESTIMATE_APPOINTMENTS,
  GET_APPOINTMENT_DETAIL,
  GET_EXTRA_SERVICES,
  ADD_APPOINTMENT,
  CANCEL_APPOINTMENT,
} from './Appointment/types';

import {
  GET_CHATS,
  GET_CHATS_HISTORY,
  GET_CHAT_MESSAGES,
  GET_MESSAGE_DETAIL,
  REPLY_MESSAGE,
  NEW_CONVERSATION,
  MOVE_CHAT_HISTORY,
  GET_UNREAD_MESSAGES
} from './Chat/types';
import {
  CREATE_NEW_INFO,
  CREATE_NEW_JOB,
  CREATE_NEW_HOME,
  CREATE_NEW_ESTIMATE
} from './NewEstimate/types'

const rootReducer = combineReducers({
  session,
  account,
  contact,
  notification,
  appointment,
  chats,
  myEstimate,
  personalInfo,
  myInvoice,
  invoiceDetail,
  newEstimate,
  payment
});

const sagaMiddleware = createSagaMiddleware();

function* watchAll() {
  yield all([
    takeEvery(LOGIN, loginSaga),
    takeEvery(REGISTER, registerSaga),
    takeEvery(LOG_OUT, logoutSaga),
    takeEvery(LOAD_PROFILE, loadProfileSaga),
    takeEvery(UPDATE_PROFILE, upadteProfileSaga),
    takeEvery(SEND_CONTACT, sendContactSaga),
    takeEvery(GET_ALL_APPOINTMENTS, getAllAppointmentsSaga),
    takeEvery(GET_ESTIMATE_APPOINTMENTS, getEstimateAppointmentsSaga),
    takeEvery(GET_APPOINTMENT_DETAIL, getAppointmentDetailSaga),
    takeEvery(GET_EXTRA_SERVICES, getExtraServicesSaga),
    takeEvery(ADD_APPOINTMENT, addAppointmentSaga),
    takeEvery(CANCEL_APPOINTMENT, cancelAppointmentSaga),
    takeEvery(GET_CHATS, getChatsSaga),
    takeEvery(GET_CHATS_HISTORY, getChatsHistorySaga),
    takeEvery(LOAD_CUSTOMER_ESTIMATES, loadCustomerEstimateSaga),
    takeEvery(LOAD_CUSTOMER_ESTIMATE_DETAIL, loadCustomerEstimateDetailSaga),
    takeEvery(GET_CHAT_MESSAGES, getChatMessagesSaga),
    takeEvery(GET_MESSAGE_DETAIL, getMessageDetailSaga),
    takeEvery(REPLY_MESSAGE, replyMessageSaga),
    takeEvery(NEW_CONVERSATION, newChatConversationSaga),
    takeEvery(MOVE_CHAT_HISTORY, moveChatToHistorySaga),
    takeEvery(GET_UNREAD_MESSAGES, getUnreadMessagesSaga),
    takeEvery(GET_INVOICES, getInvoiceSaga),
    takeEvery(GET_INVOICE_DETAIL, getInvoiceDetailSaga),
    takeEvery(CREATE_NEW_INFO, createNewInfoSaga),
    takeEvery(CREATE_NEW_JOB, createNewJobSaga),
    takeEvery(CREATE_NEW_HOME, createNewHomeSaga),
    takeEvery(CREATE_NEW_ESTIMATE, createNewEstimateSaga),
    takeEvery(PAYMENT_ESTIMATE, paymentEstimateSaga),
    takeEvery(FORGOT_PASSWORD, forgotPasswordSaga),
    takeEvery(GET_PAYMENT_INFO, getPaymentInfoSaga),
    takeEvery(PAYMENT, paymentSaga),
    takeEvery(GET_INVOICE_INFO, getInvoiceInfoSaga),
    takeEvery(INVOICE_PAYMENT, invoicePaymentSaga),
    takeEvery(SET_TOKEN, setTokenSaga),
  ]);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(watchAll);
  return store;
};
