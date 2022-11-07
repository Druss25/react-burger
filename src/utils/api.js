import { baseUrl } from "./constants";

export const saveTokens = (accessToken, refreshToken) => {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}

export const getAccessToken = () => {
  return localStorage.getItem('accessToken')
}

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken')
}

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

export const loginRequest = async data => {
  return await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
};

export const RegisterRequest = async data => {
  return await fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    // mode: 'cors',
    // cache: 'no-cache',
    // credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    // redirect: 'follow',
    // referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
};

export const LogoutRequest = async () => {
  return await fetch(`${baseUrl}/auth/logout`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({token: getRefreshToken()})
  });
};

export const TokenRequest = async (refreshToken) => {
  return await fetch(`${baseUrl}/auth/token`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({token: refreshToken})
  });
};

export const getUserRequest = async () =>
  await fetch(`${baseUrl}/auth/user`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getAccessToken()
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
  .then(res => res.json())


export const updateUserRequest = async (data) => {
  return await fetch(`${baseUrl}/auth/user`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getAccessToken()
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  })
  .then(res => res.json())
};
