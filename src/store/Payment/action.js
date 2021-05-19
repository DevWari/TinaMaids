import {
    GET_PAYMENT_INFO,
    PAYMENT,
    INVOICE_PAYMENT,
    GET_INVOICE_INFO
  } from './types';
  
export function GetPaymentInfoAction(hashedId,token) {
  return {
    type: GET_PAYMENT_INFO,
    token,
    hashedId,
  };
}

export function GetInoviceInfoAction(hashedId,token) {
    return {
      type: GET_INVOICE_INFO,
      token,
      hashedId,
    };
}

export function PaymentAction(data,token) {
    return {
      type: PAYMENT,
      token,
      data,
    };
}
export function InvoicePaymentAction(data,token) {
    return {
      type: INVOICE_PAYMENT,
      token,
      data,
    };
}
  