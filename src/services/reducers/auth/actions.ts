import { Dispatch } from 'redux'
import { IRequestLogin, IRequestRegister, IResponseLogin, IUser } from '../../../models/auth'
import {
  checkRefreshToken,
  getAccessToken,
  getRefreshToken,
  loginRequest,
  LogoutRequest,
  RegisterRequest,
  removeTokens,
  saveTokens,
  updateUserRequest,
} from '../../../utils/api'
import * as _fetch from '../../../utils/fetch'

export const name = 'auth'

export enum AuthActionTypes {
  AUTH_USER_REQUEST = 'AUTH_USER_REQUEST',
  AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS',
  AUTH_USER_ERROR = 'AUTH_USER_ERROR',
  AUTH_GET_USER = 'AUTH_GET_USER',
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

interface authUserLogout {
  type: AuthActionTypes.AUTH_USER_LOGOUT
}

export type AuthAction =
  | authUserRequest
  | authUserSuccess
  | authUserError
  | authGetUser
  | authUserLogout

export const login = (form: IRequestLogin) => async (dispatch: Dispatch<AuthAction>) => {
  dispatch({ type: AuthActionTypes.AUTH_USER_REQUEST })
  const data = (await loginRequest(form)) as IResponseLogin

  if (data.success) {
    dispatch({
      type: AuthActionTypes.AUTH_USER_SUCCESS,
      payload: data.user,
    })
    saveTokens(data.accessToken, data.refreshToken)
  } else {
    console.log('Ошибка авторизации: ', data)
  }
}

export const register = (data: IRequestRegister) => async (dispatch: Dispatch<AuthAction>) => {
  dispatch({ type: AuthActionTypes.AUTH_USER_REQUEST })
  await RegisterRequest(data)
    .then(res => res.json())
    .then((res: IResponseLogin) => {
      if (res.success) {
        dispatch({
          type: AuthActionTypes.AUTH_USER_SUCCESS,
          payload: res.user,
        })
        saveTokens(res.accessToken, res.refreshToken)
      } else throw new Error(res.message)
    })
    .catch((error: string) => {
      dispatch({
        type: AuthActionTypes.AUTH_USER_ERROR,
        payload: error,
      })
    })
}

export const logout = () => async (dispatch: Dispatch<AuthAction>) => {
  await LogoutRequest()
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        dispatch({
          type: AuthActionTypes.AUTH_USER_LOGOUT,
        })
        removeTokens()
      }
    })
    .catch(error => console.log(error))
}

// export const getNewTokens = async () => {
//   await TokenRequest()
//     .then(res => {
//       if (res.ok) {
//         return res.json()
//       } else throw new Error('Ошибка обновления токена')
//     })
//     .then(res => {
//       if (res.success) {
//         console.log('Обновил токены !')
//         saveTokens(res.accessToken, res.refreshToken)
//         return res
//       }
//     })
//     .catch(error => {
//       console.log(error)
//     })
// }

interface getUserResponse {
  success: boolean
  user: IUser
  message: string
}

interface IRequestInit {
  path: string
  config: RequestInit
}

interface ITokenResponse {
  success: boolean
  accessToken: string
  refreshToken: string
}

const requestNewToken: IRequestInit = {
  path: '/auth/token',
  config: {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ token: getRefreshToken() }),
  },
}

const postNewTokens = async () => {
  const { path, config } = requestNewToken

  await _fetch
    .post<ITokenResponse>(path, config)
    .then(data => {
      if (data.success) {
        saveTokens(data.accessToken, data.refreshToken)
        return data.accessToken
      }
    })
    .catch(err => console.log(err))
}

const RequestGetUser: IRequestInit = {
  path: '/auth/user',
  config: {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: String(getAccessToken()),
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  },
}

// export const getUser = () => async (dispatch: Dispatch<AuthAction>) => {
//   const { path, config } = RequestGetUser
//   dispatch({ type: AuthActionTypes.AUTH_USER_REQUEST })
//   const response = await _fetch.get<getUserResponse>(path, config)

//   if (!response.success && response.message === 'jwt expired') {
//     if (checkRefreshToken) {
//       await getNewTokens()
//       getUser()
//     }
//   }

//   if (!response.success) {
//     dispatch({
//       type: AuthActionTypes.AUTH_USER_ERROR,
//       payload: response?.message,
//     })
//   }

//   if (response.success) {
//     dispatch({
//       type: AuthActionTypes.AUTH_GET_USER,
//       payload: response.user,
//     })
//   }
// }

export const getUser = () => async (dispatch: Dispatch<AuthAction>) => {
  const { path, config } = RequestGetUser

  dispatch({ type: AuthActionTypes.AUTH_USER_REQUEST })
  const request = await _fetch
    .get<getUserResponse>(path, config)
    .then(data => {
      if (data.success) {
        console.log('Прочитал пользователя !')
        dispatch({
          type: AuthActionTypes.AUTH_GET_USER,
          payload: data.user,
        })
      }
    })
    .catch(err => err)

  console.log('Ответ request ---- ', request)
  if (request !== undefined) {
    if (checkRefreshToken) {
      return await postNewTokens().then(async () => {
        console.log('Начало выполнения второго запроса')
        return await _fetch
          .get<getUserResponse>(path, {
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
              console.log('Прочитал данные с новым токеном !', data)
              dispatch({
                type: AuthActionTypes.AUTH_GET_USER,
                payload: data.user,
              })
              console.log('Записал второй запрос !')
              return data
            }
          })
          .catch(err => err)
      })
    }
  }
}

export const updateUser = () => async (dispatch: Dispatch<AuthAction>) => {
  await updateUserRequest()
    .then((res: IResponseLogin) => {
      if (res.success) {
        dispatch({
          type: AuthActionTypes.AUTH_USER_SUCCESS,
          payload: res.user,
        })
      } else throw new Error(res.message)
    })
    .catch(error => {
      dispatch({
        type: AuthActionTypes.AUTH_USER_ERROR,
        payload: error,
      })
    })
}
