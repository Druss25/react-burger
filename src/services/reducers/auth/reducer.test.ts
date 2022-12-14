import { AuthActionTypes } from './actions'
import { authReducer, initialState } from './reducer'

test('should return the AUTH_USER_REQUEST', () => {
  expect(
    authReducer(initialState, {
      type: AuthActionTypes.AUTH_USER_REQUEST,
    }),
  ).toEqual({
    ...initialState,
    isLoading: true,
  })
})

test('should return AUTH_USER_SUCCESS', () => {
  expect(
    authReducer(initialState, {
      type: AuthActionTypes.AUTH_USER_SUCCESS,
      payload: { email: 'druss25@yandex.ru', name: 'Druss25' },
    }),
  ).toEqual({
    ...initialState,
    user: { email: 'druss25@yandex.ru', name: 'Druss25' },
    isLoading: false,
    isAuth: true,
  })
})

test('should return AUTH_USER_ERROR', () => {
  expect(
    authReducer(initialState, {
      type: AuthActionTypes.AUTH_USER_ERROR,
      payload: 'Что-то пошло не так',
    }),
  ).toEqual({
    ...initialState,
    isLoading: false,
    hasError: true,
    message: 'Что-то пошло не так',
  })
})

test('should return AUTH_GET_USER', () => {
  expect(
    authReducer(initialState, {
      type: AuthActionTypes.AUTH_GET_USER,
      payload: { email: 'druss25@yandex.ru', name: 'Druss25' },
    }),
  ).toEqual({
    ...initialState,
    user: { email: 'druss25@yandex.ru', name: 'Druss25' },
    isLoading: false,
    isAuth: true,
  })
})

test('should return AUTH_UPDATE_USER_REQUEST', () => {
  expect(
    authReducer(initialState, {
      type: AuthActionTypes.AUTH_UPDATE_USER_REQUEST,
    }),
  ).toEqual({
    ...initialState,
    isLoading: true,
  })
})

test('should return AUTH_UPDATE_USER', () => {
  expect(
    authReducer(initialState, {
      type: AuthActionTypes.AUTH_UPDATE_USER,
      payload: { email: 'druss25@yandex.ru', name: 'Druss25' },
    }),
  ).toEqual({
    ...initialState,
    user: { email: 'druss25@yandex.ru', name: 'Druss25' },
    isLoading: false,
  })
})

test('should return AUTH_RESET_PASSWORD', () => {
  expect(
    authReducer(initialState, {
      type: AuthActionTypes.AUTH_RESET_PASSWORD,
    }),
  ).toEqual({
    ...initialState,
    isLoading: false,
    isReset: true,
  })
})

test('should return AUTH_FORGOT_PASSWORD', () => {
  expect(
    authReducer(initialState, {
      type: AuthActionTypes.AUTH_FORGOT_PASSWORD,
    }),
  ).toEqual({
    ...initialState,
    isLoading: false,
  })
})

test('should return AUTH_USER_LOGOUT', () => {
  expect(
    authReducer(initialState, {
      type: AuthActionTypes.AUTH_USER_LOGOUT,
    }),
  ).toEqual(initialState)
})
