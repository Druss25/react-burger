import { Dispatch } from 'redux'
import {
  IRequestForgotPassword,
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
  AUTH_RESET_PASSWORD = 'AUTH_RESET_PASSWORD',
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
  type: AuthActionTypes.AUTH_RESET_PASSWORD
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

export const login = (form: IRequestLogin) => async (dispatch: Dispatch<AuthAction>) => {
  dispatch({
    type: AuthActionTypes.AUTH_USER_REQUEST,
  })
  return await fetch
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
    .then(res => {
      if (res.success) {
        saveTokens(res.accessToken, res.refreshToken)
        dispatch({
          type: AuthActionTypes.AUTH_USER_SUCCESS,
          payload: res.user,
        })
      } else {
        throw Error(`Неверное имя или пароль`)
      }
    })
    .catch((error: Error) => {
      dispatch({
        type: AuthActionTypes.AUTH_USER_ERROR,
        payload: error.message,
      })
    })
}

export const register = (form: IRequestRegister) => async (dispatch: Dispatch<AuthAction>) => {
  dispatch({ type: AuthActionTypes.AUTH_USER_REQUEST })
  return await fetch
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
    .then(res => {
      if (res.success && res !== undefined) {
        saveTokens(res.accessToken, res.refreshToken)
        dispatch({
          type: AuthActionTypes.AUTH_USER_SUCCESS,
          payload: res.user,
        })
      } else {
        throw Error('Что-то пошло не так')
      }
    })
    .catch((error: Error) => {
      dispatch({
        type: AuthActionTypes.AUTH_USER_ERROR,
        payload: error.message,
      })
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
      } else {
        throw Error('Что-то пошло не так')
      }
    })
    .catch((error: Error) => console.log(error))
}

// *
export const postNewTokens = async () => {
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
      } else {
        throw Error('Что-то пошло не так')
      }
    })
    .catch((error: Error) => console.log(`Ошибка: ${error.message}`))
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
      } else {
        throw Error('Что-то пошло не так')
      }
    })
    .catch((error: Error) => console.log(error.message))

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
  return await fetch
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
      } else {
        throw Error('Что-то пошло не так')
      }
    })
    .catch((error: Error) => console.log(error))
}

// *
export const resetPassword =
  (form: IRequestForgotPassword) => async (dispatch: Dispatch<AuthAction>) => {
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
        body: JSON.stringify(form),
      })
      .then(data => {
        if (data.success) {
          dispatch({
            type: AuthActionTypes.AUTH_RESET_PASSWORD,
          })
        } else {
          throw Error('Что-то пошло не так')
        }
      })
      .catch((error: Error) => console.log(error))
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
          return dispatch({
            type: AuthActionTypes.AUTH_FORGOT_PASSWORD,
          })
        } else {
          throw Error('Что-то пошло не так')
        }
      })
      .catch((error: Error) => console.log(error))
  }
