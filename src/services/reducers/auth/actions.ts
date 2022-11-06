import { IResponseLogin } from "../../../models/auth";
import { Dispatch } from "redux";
import { IRequestLogin, IResponseFailed, IUser } from "../../../models/auth";
import {
  getUserRequest,
  loginRequest,
  LogoutRequest,
  RegisterRequest,
  saveTokens,
  TokenRequest,
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

export const logout = () => async (dispatch: Dispatch<AuthAction>) => {
  await LogoutRequest()
    .then((res) => {
      if (!res.ok && res.status !== 200)
        return new Error("Что-то пошло не так !!!");
      return res.json();
    })
    .then((res) => {
      if (res.success) {
        dispatch({
          type: AuthActionTypes.AUTH_USER_LOGOUT,
        });
        localStorage.clear();
      }
    })
    .catch((error) => console.log(error));
};

export const getRefreshToken = async (refreshToken: string) => {
  if (refreshToken) {
    return await TokenRequest(refreshToken)
      .then((res) => {
        if (res.ok && res.status === 200) {
          return res.json();
        } else new Error("Ошибка обновления токена");
      })
      .then((res) => {
        if (res.success) saveTokens(res.accessToken, res.refreshToken);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

export const getUser = () => async (dispatch: Dispatch<AuthAction>) => {
  await getUserRequest()
    .then((res) => {
      if (!res.ok && res.status === 403) {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          getRefreshToken(refreshToken);
          return getUserRequest();
        }
      }
      return res.json();
    })
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
