import { API_URL } from 'src/utils/config';

export const getInvoice = (status,token) => {
    
    const url = API_URL + "get-invoices";
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:  `Bearer ${token}`,
      },
      body: JSON.stringify ({
        status: status,
        paginator: 1
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log ("Invoices....", responseJson)
      return responseJson
    })
    .catch((error) => {
      return "error";
    });
};




