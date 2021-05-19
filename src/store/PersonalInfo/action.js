import {
    LOAD_CUSTOMER_ESTIMATE_DETAIL,
    PAYMENT_ESTIMATE,
  } from './types';
  
export function LoadCustomerEstimateDetailAction(token, hashedId) {
  return {
    type: LOAD_CUSTOMER_ESTIMATE_DETAIL,
    token,
    hashedId
  };
}

export function PaymentEstimateAction(token, hashedId, stripeToken) {
  return {
    type: PAYMENT_ESTIMATE,
    token,
    hashedId,
    stripeToken
  };
}

