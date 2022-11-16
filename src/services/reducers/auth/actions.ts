import { accessToken } from './../../../utils/api'
import { Dispatch } from 'redux'
import {
  IRequestLogin,
  IRequestRegister,
  IRequestResetPassword,
  IResponse,
  IResponseLogout,
  IResponseReset,
  IResponseToken,
  IResponseUser,
  IUser,
} from '../../../models/auth'
import { removeTokens, saveTokens } from '../../../utils/api'
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
  AUTH_RESER_PASSWORD = 'AUTH_RESER_PASSWORD',
  AUTH_FORGOT_PASSWORD = 'AUTH_FORGOT_PASSWORD',
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

interface getUserAction {
  type: AuthActionTypes.AUTH_GET_USER
  payload: IUser
}

interface authUpdateUserRequest {
  type: AuthActionTypes.AUTH_UPDATE_USER_REQUEST
}

interface updateUserAction {
  type: AuthActionTypes.AUTH_UPDATE_USER
  payload: IUser
}

interface userLogoutAction {
  type: AuthActionTypes.AUTH_USER_LOGOUT
}

interface resetPasswordAction {
  type: AuthActionTypes.AUTH_RESER_PASSWORD
}

interface forgotPasswordAction {
  type: AuthActionTypes.AUTH_FORGOT_PASSWORD
}

export type AuthAction =
  | authUserRequest
  | authUserSuccess
  | authUserError
  | authUpdateUserRequest
  | updateUserAction
  | getUserAction
  | userLogoutAction
  | resetPasswordAction
  | forgotPasswordAction

// TODO Не совсем понял как это применить !!!
// TODO Нужно больше времени чтоб разобраться...
// const initRequest = () => {
//   return { type: AuthActionTypes.AUTH_USER_REQUEST }
// }

// *
export const login = (form: IRequestLogin) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: AuthActionTypes.AUTH_USER_REQUEST,
    })

    try {
      const { user, success, accessToken, refreshToken } = await fetch.post<IResponse>(
        '/auth/login',
        {
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(form),
        },
      )

      if (success) {
        dispatch({
          type: AuthActionTypes.AUTH_USER_SUCCESS,
          payload: user,
        })
        saveTokens(accessToken, refreshToken)
      }
    } catch (err) {
      dispatch({
        type: AuthActionTypes.AUTH_USER_ERROR,
        payload: '',
      })
    }
  }
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
        payload: 'Регистрация не прошла !!!',
      })
      console.log(error)
    })
}

// *
export const logout = () => async (dispatch: Dispatch<AuthAction>) => {
  dispatch({ type: AuthActionTypes.AUTH_USER_REQUEST })
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
      body: JSON.stringify({ token: String(localStorage.getItem('refreshToken')) }),
    })
    .then(data => {
      if (data.success) {
        dispatch({
          type: AuthActionTypes.AUTH_USER_LOGOUT,
        })
        removeTokens()
      }
    })
    .catch(err => err)
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
      body: JSON.stringify({ token: String(localStorage.getItem('refreshToken')) }),
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
  let request = await fetch
    .get<IResponseUser>('/auth/user', {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: String(localStorage.getItem('accessToken')),
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
    if (!!localStorage.getItem('refreshToken')) {
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
          }
          request = undefined
          return data
        })
        .catch(err => err)
    }
  } else return
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
        Authorization: String(localStorage.getItem('accessToken')),
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

// *
export const resetPassword = (email: string) => async (dispatch: Dispatch<AuthAction>) => {
  dispatch({ type: AuthActionTypes.AUTH_USER_REQUEST })
  await fetch
    .post<IResponseReset>('/password-reset', {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ email: email }),
    })
    .then(data => {
      if (data.success) {
        dispatch({
          type: AuthActionTypes.AUTH_RESER_PASSWORD,
        })
      }
    })
    .catch(err => err)
}

// *
export const forgotPassword =
  (form: IRequestResetPassword) => async (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: AuthActionTypes.AUTH_USER_REQUEST })
    await fetch
      .post<IResponseReset>('/password-reset/reset', {
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ password: form.password, token: form.token }),
      })
      .then(data => {
        if (data.success) {
          dispatch({
            type: AuthActionTypes.AUTH_FORGOT_PASSWORD,
          })
        }
      })
      .catch(err => console.log('Error:', err))
  }
