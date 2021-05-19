import { API_URL } from 'src/utils/config';

export const loadCustomerEstimateDetail = (token, hashedId) => {
    const url = API_URL + "estimate-details";
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
      console.log ("price...", responseJson)
      return responseJson
    })
    .catch((error) => {
      return "error";
    });
};

export const paymentEstimate = (token, hashedId, stripeToken) => {
  const url = API_URL + "process-customer-acceptance";
  const data = {
    hashed_id: hashedId,
    stripe_token: stripeToken,
    card_choice: 1,
    existing_card_choice: 1, 
  }
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



