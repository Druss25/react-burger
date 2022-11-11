import { Dispatch } from 'redux'
import { IRequestLogin, IRequestRegister, IUser } from '../../../models/auth'
import {
  checkRefreshToken,
  getAccessToken,
  getRefreshToken,
  removeTokens,
  saveTokens,
} from '../../../utils/api'
import * as fetch from '../../../utils/fetch'

export const name = 'auth'

export enum AuthActionTypes {
  AUTH_USER_REQUEST = 'AUTH_USER_REQUEST',
  AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS',
  AUTH_USER_ERROR = 'AUTH_USER_ERROR',
  AUTH_GET_USER = 'AUTH_GET_USER',
  AUTH_UPDATE_USER_REQUEST = 'AUTH_UPDATE_USER_REQUEST',
  AUTH_UPDATE_USER = 'AUTH_UPDATE_USER',
  AUTH_USER_LOGOUT = 'AUTH_USER_LOGOUT',
}

interface authUserRequest {
  type: AuthActionTypes.AUTH_USER_REQUEST
}

interface authUserSuccess {
  type: AuthActionTypes.AUTH_USER_SUCCESS
  payload: IUser
}

interface authUserError {
  type: AuthActionTypes.AUTH_USER_ERROR
  payload: string
}

interface authGetUser {
  type: AuthActionTypes.AUTH_GET_USER
  payload: IUser
}

interface authUpdateUserRequest {
  type: AuthActionTypes.AUTH_UPDATE_USER_REQUEST
}

interface authUpdateUser {
  type: AuthActionTypes.AUTH_UPDATE_USER
  payload: IUser
}

interface authUserLogout {
  type: AuthActionTypes.AUTH_USER_LOGOUT
}

export type AuthAction =
  | authUserRequest
  | authUserSuccess
  | authUserError
  | authUpdateUserRequest
  | authUpdateUser
  | authGetUser
  | authUserLogout

interface IResponse {
  success: boolean
  user: IUser
  accessToken: string
  refreshToken: string
  message?: string
}

// *
export const login = (form: IRequestLogin) => async (dispatch: Dispatch<AuthAction>) => {
  dispatch({ type: AuthActionTypes.AUTH_USER_REQUEST })

  await fetch
    .post<IResponse>('/auth/login', {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(form),
    })
    .then(data => {
      if (data.success) {
        dispatch({
          type: AuthActionTypes.AUTH_USER_SUCCESS,
          payload: data.user,
        })
        saveTokens(data.accessToken, data.refreshToken)
      }
    })
    .catch(err => err)
}

// *
export const register = (form: IRequestRegister) => async (dispatch: Dispatch<AuthAction>) => {
  dispatch({ type: AuthActionTypes.AUTH_USER_REQUEST })

  await fetch
    .post<IResponse>('/auth/register', {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(form),
    })
    .then(data => {
      if (data.success) {
        dispatch({
          type: AuthActionTypes.AUTH_USER_SUCCESS,
          payload: data.user,
        })
        saveTokens(data.accessToken, data.refreshToken)
      }
    })
    .catch(error => {
      dispatch({
        type: AuthActionTypes.AUTH_USER_ERROR,
        payload: error,
      })
    })

  // await RegisterRequest(data)
  //   .then(res => res.json())
  //   .then((res: IResponseLogin) => {
  //     if (res.success) {
  //       dispatch({
  //         type: AuthActionTypes.AUTH_USER_SUCCESS,
  //         payload: res.user,
  //       })
  //       saveTokens(res.accessToken, res.refreshToken)
  //     }
  //   })
  //   .catch((error: string) => {
  //     dispatch({
  //       type: AuthActionTypes.AUTH_USER_ERROR,
  //       payload: error,
  //     })
  //   })
}

interface IResponseLogout {
  success: boolean
}

// *
export const logout = () => async (dispatch: Dispatch<AuthAction>) => {
  await fetch
    .post<IResponseLogout>('/auth/logout', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ token: getRefreshToken() }),
    })
    .then(data => {
      if (data.success) {
        dispatch({
          type: AuthActionTypes.AUTH_USER_LOGOUT,
        })
        removeTokens()
      }
    })
    .catch(error => error)
}

interface IResponseUser {
  success: boolean
  user: IUser
  message?: string
}

interface IResponseToken {
  success: boolean
  accessToken: string
  refreshToken: string
}

// *
const postNewTokens = async () => {
  return await fetch
    .post<IResponseToken>('/auth/token', {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ token: getRefreshToken() }),
    })
    .then(data => {
      if (data.success) {
        saveTokens(data.accessToken, data.refreshToken)
        return data.accessToken
      }
    })
    .catch(err => err)
}
// *
export const getUser = () => async (dispatch: Dispatch<AuthAction>) => {
  dispatch({ type: AuthActionTypes.AUTH_USER_REQUEST })
  const request = await fetch
    .get<IResponseUser>('/auth/user', {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: String(getAccessToken()),
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
    .then(data => {
      if (data.success) {
        dispatch({
          type: AuthActionTypes.AUTH_GET_USER,
          payload: data.user,
        })
      }
    })
    .catch(err => err)

  if (request !== undefined) {
    if (checkRefreshToken) {
      const token = await postNewTokens()
      await fetch
        .get<IResponseUser>('/auth/user', {
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            Authorization: String(token),
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
        })
        .then(data => {
          if (data.success) {
            dispatch({
              type: AuthActionTypes.AUTH_GET_USER,
              payload: data.user,
            })
            return data
          }
          return null
        })
        .catch(err => err)
    }
  }
}
// *
export const updateUser = (form: IRequestRegister) => async (dispatch: Dispatch<AuthAction>) => {
  dispatch({ type: AuthActionTypes.AUTH_UPDATE_USER_REQUEST })
  await fetch
    .patch<IRequestRegister, IResponseUser>('/auth/user', form, {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: String(getAccessToken()),
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(form),
    })
    .then(data => {
      if (data.success) {
        dispatch({
          type: AuthActionTypes.AUTH_UPDATE_USER,
          payload: data.user,
        })
      }
    })
    .catch(err => err)
}
