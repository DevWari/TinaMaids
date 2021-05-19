import { API_URL } from 'src/utils/config';

export const getAllAppointments = (data, token) => {
  const url = API_URL + "get-appointments";
  
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

export const getEstimateAppointments = (data, token) => {
  const url = API_URL + "get-estimate-appointments";
  
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:  `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  })
  .then((response) => response.json())
  .then((responseJson) => {
     return responseJson
  })
  .catch((error) => {
    return "error";
  });
};

export const getAppointmentDetail = (data, token) => {
  const url = API_URL + "get-appointment-details";
  
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:  `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  })
  .then((response) => response.json())
  .then((responseJson) => {
     return responseJson
  })
  .catch((error) => {
    return "error";
  });
};

export const getExtraServices = (data, token) => {
  const url = API_URL + "render-add-appointment-to-estimate";
  
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:  `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  })
  .then((response) => response.json())
  .then((responseJson) => {
     return responseJson
  })
  .catch((error) => {
    return "error";
  });
};

export const addAppointment = (data, token) => {
  const url = API_URL + "add-appointment-to-estimate";
  
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:  `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  })
  .then((response) => response.json())
  .then((responseJson) => {
     return responseJson
  })
  .catch((error) => {
    return "error";
  });
};

export const cancelAppointment = (data, token) => {
  const url = API_URL + "cancel-appointment";
  
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:  `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  })
  .then((response) => response.json())
  .then((responseJson) => {
     return responseJson
  })
  .catch((error) => {
    return "error";
  });
};
