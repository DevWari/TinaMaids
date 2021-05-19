import {
    LOAD_CUSTOMER_ESTIMATES
  } from './types';
  
export function LoadCustomerEstimateAction(token) {
  
  return {
    type: LOAD_CUSTOMER_ESTIMATES,
    token
  };
}

    