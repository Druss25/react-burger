import { AuthActionTypes, AuthAction } from './actions'
import { authReducer, initialState } from './reducer'

describe('testing Redux AuthReducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {} as AuthAction)).toEqual(initialState)
  })

  it('should return the action AUTH_USER_REQUEST', () => {
    const action: AuthAction = {
      type: AuthActionTypes.AUTH_USER_REQUEST,
    }
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    })
  })

  it('should return AUTH_USER_SUCCESS', () => {
    const action: AuthAction = {
      type: AuthActionTypes.AUTH_USER_SUCCESS,
      payload: { email: 'druss25@yandex.ru', name: 'Druss25' },
    }

    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      user: action.payload,
      isLoading: false,
      isAuth: true,
    })
  })

  it('should return AUTH_USER_ERROR', () => {
    const action: AuthAction = {
      type: AuthActionTypes.AUTH_USER_ERROR,
      payload: 'Что-то пошло не так',
    }

    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      hasError: true,
      message: action.payload,
    })
  })

  it('should return AUTH_GET_USER', () => {
    const action: AuthAction = {
      type: AuthActionTypes.AUTH_GET_USER,
      payload: { email: 'druss25@yandex.ru', name: 'Druss25' },
    }

    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      user: action.payload,
      isLoading: false,
      isAuth: true,
    })
  })

  it('should return AUTH_UPDATE_USER_REQUEST', () => {
    const action: AuthAction = {
      type: AuthActionTypes.AUTH_UPDATE_USER_REQUEST,
    }

    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    })
  })

  it('should return AUTH_UPDATE_USER', () => {
    const action: AuthAction = {
      type: AuthActionTypes.AUTH_UPDATE_USER,
      payload: { email: 'druss25@yandex.ru', name: 'Druss25' },
    }
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      user: { email: 'druss25@yandex.ru', name: 'Druss25' },
      isLoading: false,
    })
  })

  it('should return AUTH_RESET_PASSWORD', () => {
    const action: AuthAction = {
      type: AuthActionTypes.AUTH_RESET_PASSWORD,
    }

    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      isReset: true,
    })
  })

  it('should return AUTH_FORGOT_PASSWORD', () => {
    const action: AuthAction = {
      type: AuthActionTypes.AUTH_FORGOT_PASSWORD,
    }

    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
    })
  })

  it('should return AUTH_USER_LOGOUT', () => {
    const action: AuthAction = {
      type: AuthActionTypes.AUTH_USER_LOGOUT,
    }

    expect(authReducer(initialState, action)).toEqual(initialState)
  })
})
