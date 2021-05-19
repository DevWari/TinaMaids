import { API_URL } from 'src/utils/config';

export const createNewEstimate = (data,token) => {

    console.log ("data....", data)
    const url = API_URL + "new-estimate";
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // Authorization:  `Bearer ${token}`,
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

export const renderNewEstimate = () => {
  
  const url = API_URL + "render-new-estimate";
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




