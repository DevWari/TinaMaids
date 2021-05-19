import {
    GET_INVOICE_DETAIL
  } from './types';
  
export function GetInvoiceDetailAction(hashedId, token) {
  return {
    type: GET_INVOICE_DETAIL,
    token,
    hashedId
  };
}

    