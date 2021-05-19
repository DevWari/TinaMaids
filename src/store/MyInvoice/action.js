import {
    GET_INVOICES
  } from './types';
  
export function GetInvoiceAction(status, token) {
  return {
    type: GET_INVOICES,
    token,
    status
  };
}

    