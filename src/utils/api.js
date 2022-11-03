import { baseUrl } from "./constants";

export const orderRequest = ingredientsList => {
  return fetch(`${baseUrl}/orders`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ingredients: ingredientsList})
  });
};
