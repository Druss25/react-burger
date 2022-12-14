import { AuthState } from '../../../models'
import { AuthAction, AuthActionTypes } from './actions'

export const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuth: false,
  isReset: false,
  hasError: false,
  message: null,
}

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionTypes.AUTH_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      }

    case AuthActionTypes.AUTH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isAuth: true,
        hasError: false,
        message: null,
      }

    case AuthActionTypes.AUTH_USER_ERROR:
      return {
        ...state,
        user: null,
        isLoading: false,
        isAuth: false,
        hasError: true,
        message: action.payload,
      }

    case AuthActionTypes.AUTH_GET_USER:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isAuth: true,
        hasError: false,
        message: null,
      }

    case AuthActionTypes.AUTH_UPDATE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      }

    case AuthActionTypes.AUTH_UPDATE_USER:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      }

    case AuthActionTypes.AUTH_RESET_PASSWORD:
      return {
        ...state,
        isReset: true,
        isLoading: false,
      }

    case AuthActionTypes.AUTH_FORGOT_PASSWORD:
      return {
        ...state,
        isReset: false,
        isLoading: false,
      }

    case AuthActionTypes.AUTH_USER_LOGOUT: {
      return initialState
    }
    default:
      return state
  }
}
