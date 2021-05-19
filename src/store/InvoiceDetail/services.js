import { API_URL } from 'src/utils/config';

export const getInvoiceDetail = (hashedId,token) => {
    const url = API_URL + "get-invoice-details";
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:  `Bearer ${token}`,
      },
      body: JSON.stringify ({
        hashed_id: hashedId,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson
    })
    .catch((error) => {
      return "error";
    });
};




