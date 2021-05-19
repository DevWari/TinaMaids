import {
    LOGIN,
    LOG_OUT,
    REGISTER,
    FORGOT_PASSWORD,
    SET_TOKEN
  } from './types';
  
export function LoginAction(email, password) {
  return {
    type: LOGIN,
    email,
    password
  };
}

export function SetTokenAction(token, user) {
  console.log ("SetTokenAction.....", token + "=============" + user)
  return {
    type: SET_TOKEN,
    token,
    user
  };
}
  
export function RegisterAction(data) {
  return {
    type: REGISTER,
    data,
  };
}

export function LogoutAction(token) {
  return {
    type: LOG_OUT,
    token,
  };
}

export function ForgotPasswordAction(email) {
  return {
    type: FORGOT_PASSWORD,
    email,
  };
}
  