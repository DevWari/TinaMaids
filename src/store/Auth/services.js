import { API_URL } from 'src/utils/config';

export const login = (username, password) => {
  const url = API_URL + "login";
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: username,
      password: password
    })
  })
  .then((response) => response.json())
  .then((responseJson) => {
    console.log ("auth data...", responseJson)
    //refreshToken (responseJson.token)
    return responseJson
  })
  .catch((error) => {
    return "error";
  });
};

export const refreshToken = (token) => {
  const url = API_URL + "refresh-token";
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:  `Bearer ${token}`, 
    }
  })
  .then((response) => response.json())
  .then((responseJson) => {
    console.log ("refresh token...", responseJson)
    return responseJson
  })
  .catch((error) => {
    return "error";
  });
};

export const getUser = (token) => {
  const url = API_URL + "user";
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:  `Bearer ${token}`, 
    },
  })
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson
  })
  .catch((error) => {
    return "error";
  });
};

export const register = (data) => {
  const url = API_URL + "register?" + `name=${data.name}&email=${data.email}&password=${data.password}`;
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson
  })
  .catch((error) => {
    return "error";
  });
};

export const logout = (token) => {
  const url = API_URL + "logout";
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:  `Bearer ${token}`, 
    },
  })
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson
  })
  .catch((error) => {
    return "error";
  });
};

export const forgotPassword = (email) => {
  const url = API_URL + "forgot-password";
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: email})
  })
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson
  })
  .catch((error) => {
    return "error";
  });
};




