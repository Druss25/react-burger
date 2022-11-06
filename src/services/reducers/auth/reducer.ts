import { AuthState } from "../../../models";
import { AuthAction, AuthActionTypes } from "./actions";

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuth: false,
  hasError: false,
  message: null,
};

export const authReducer = (
  state = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.AUTH_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isAuth: false,
        hasError: false,
        message: null,
      };
    }
    case AuthActionTypes.AUTH_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isAuth: true,
        hasError: false,
        message: null,
      };
    }
    case AuthActionTypes.AUTH_USER_ERROR: {
      return {
        ...state,
        user: null,
        isLoading: false,
        isAuth: false,
        hasError: true,
        message: action.payload.message,
      };
    }
    case AuthActionTypes.AUTH_USER_LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
};
