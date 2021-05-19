import { API_URL } from 'src/utils/config';

export const loadCustomerEstimate = (token) => {
    console.log ("TOKEN....", token)
    const url = API_URL + "get-customer-estimates";
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
      console.log ("estimate....", responseJson)
      return responseJson
    })
    .catch((error) => {
      return "error";
    });
};




