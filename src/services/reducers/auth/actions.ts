import { IResponseLogin } from "../../../models/auth";
import { Dispatch } from "redux";
import { IRequestLogin, IResponseFailed, IUser } from "../../../models/auth";
import {
  getUserRequest,
  loginRequest,
  LogoutRequest,
  RegisterRequest,
  saveTokens,
} from "../../../utils/api";

export const name = "auth";

export enum AuthActionTypes {
  AUTH_USER_REQUEST = "AUTH_USER_REQUEST",
  AUTH_USER_SUCCESS = "AUTH_USER_SUCCESS",
  AUTH_USER_ERROR = "AUTH_USER_ERROR",
  AUTH_USER_LOGOUT = "AUTH_USER_LOGOUT",
}

interface authUserRequest {
  type: AuthActionTypes.AUTH_USER_REQUEST;
}

interface authUserserSuccess {
  type: AuthActionTypes.AUTH_USER_SUCCESS;
  payload: IUser;
}

interface authUserserError {
  type: AuthActionTypes.AUTH_USER_ERROR;
  payload: IResponseFailed;
}

interface authUserserLogout {
  type: AuthActionTypes.AUTH_USER_LOGOUT;
}

export type AuthAction =
  | authUserRequest
  | authUserserSuccess
  | authUserserError
  | authUserserLogout;

export const login =
  (data: IUser) => async (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: AuthActionTypes.AUTH_USER_REQUEST });
    await loginRequest(data)
      .then((res) => res.json())
      .then((res: IResponseLogin) => {
        if (res.success) {
          dispatch({
            type: AuthActionTypes.AUTH_USER_SUCCESS,
            payload: res.user,
          });
          saveTokens(res.accessToken, res.refreshToken);
        } else throw new Error(res.message);
      })
      .catch((error) => {
        dispatch({
          type: AuthActionTypes.AUTH_USER_ERROR,
          payload: error,
        });
      });
  };

export const register =
  (data: IRequestLogin) => async (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: AuthActionTypes.AUTH_USER_REQUEST });
    await RegisterRequest(data)
      .then((res) => res.json())
      .then((res: IResponseLogin) => {
        if (res.success) {
          dispatch({
            type: AuthActionTypes.AUTH_USER_SUCCESS,
            payload: res.user,
          });
          saveTokens(res.accessToken, res.refreshToken);
        } else throw new Error(res.message);
      })
      .catch((error) => {
        dispatch({
          type: AuthActionTypes.AUTH_USER_ERROR,
          payload: error,
        });
      });
  };

export const logout = async () => {
  await LogoutRequest().then((res) => {
    if (res.ok && res.status === 200) localStorage.clear();
    return res.json();
  });
};

export const getToken = async () => {};

export const getUser = () => async (dispatch: Dispatch<AuthAction>) => {
  await getUserRequest()
    .then((res) => res.json())
    .then((res: IResponseLogin) => {
      if (res.success) {
        dispatch({
          type: AuthActionTypes.AUTH_USER_SUCCESS,
          payload: res.user,
        });
      } else throw new Error(res.message);
    })
    .catch((error) => {
      dispatch({
        type: AuthActionTypes.AUTH_USER_ERROR,
        payload: error,
      });
    });
};
