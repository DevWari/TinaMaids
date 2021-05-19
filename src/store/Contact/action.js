import {
    SEND_CONTACT,
    INIT_CONTACT_STATUS
} from './types';
  
export function SendContactAction(data) {
  return {
    type: SEND_CONTACT,
    data,
  };
}

export function InitStatustAction() {
  return {
    type: INIT_CONTACT_STATUS,
    data: []
  };
}
