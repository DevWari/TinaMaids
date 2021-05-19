import { API_URL } from 'src/utils/config';

export const getPaymentInfo = (hashedId, token) => {
    
  const url = API_URL + "render-acceptance-page";
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:  `Bearer ${token}`,
    },
    body: JSON.stringify({hashed_id: hashedId})
  })
  .then((response) => response.json())
  .then((responseJson) => {
     return responseJson
  })
  .catch((error) => {
    return "error";
  });
};

export const getInvoiceInfo = (hashedId, token) => {
    
    const url = API_URL + "render-pay-invoice";
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:  `Bearer ${token}`,
      },
      body: JSON.stringify({hashed_id: hashedId})
    })
    .then((response) => response.json())
    .then((responseJson) => {
       return responseJson
    })
    .catch((error) => {
      return "error";
    });
  };

export const payment = (data, token) => {
    
    const url = API_URL + "process-customer-acceptance";
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

export const invoicePayment = (data, token) => {
    const url = API_URL + "process-pay-invoice";
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
  
  

