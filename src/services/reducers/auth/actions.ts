import { Dispatch } from "redux";
import { IRequestLogin } from "./../../../models/auth";
import { IResponseLogin, IUser } from "../../../models/auth";
import {
  getRefreshToken,
  getUserRequest,
  loginRequest,
  LogoutRequest,
  RegisterRequest,
  saveTokens,
  TokenRequest,
  updateUserRequest,
} from "../../../utils/api";

export const name = "auth";

export enum AuthActionTypes {
  AUTH_USER_REQUEST = "AUTH_USER_REQUEST",
  AUTH_USER_SUCCESS = "AUTH_USER_SUCCESS",
  AUTH_USER_ERROR = "AUTH_USER_ERROR",
  AUTH_GET_USER = "AUTH_GET_USER",
  AUTH_USER_LOGOUT = "AUTH_USER_LOGOUT",
}

interface authUserRequest {
  type: AuthActionTypes.AUTH_USER_REQUEST;
}

interface authUserSuccess {
  type: AuthActionTypes.AUTH_USER_SUCCESS;
  payload: IUser;
}

interface authUserError {
  type: AuthActionTypes.AUTH_USER_ERROR;
  payload: string;
}

interface authGetUser {
  type: AuthActionTypes.AUTH_GET_USER;
  payload: IUser;
}

interface authUserLogout {
  type: AuthActionTypes.AUTH_USER_LOGOUT;
}

export type AuthAction =
  | authUserRequest
  | authUserSuccess
  | authUserError
  | authGetUser
  | authUserLogout;

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
      .catch((error: string) => {
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
        throw new Error("Что-то пошло не так !!!");
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

export const getRefreshTokens = async (refreshToken: string) => {
  if (refreshToken) {
    return await TokenRequest(refreshToken)
      .then((res) => {
        if (res.ok && res.status === 200) {
          return res.json();
        } else throw new Error("Ошибка обновления токена");
      })
      .then((res) => {
        if (res.success) {
          saveTokens(res.accessToken, res.refreshToken);
          return res;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

type getUserResponse = {
  success: boolean;
  user: IUser;
  message?: string;
};

export const getUser = () => async (dispatch: Dispatch<AuthAction>) => {
  await getUserRequest()
    .then((res: getUserResponse) => {
      if (!res.success && res.message === "jwt expired") {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
          getRefreshTokens(refreshToken);
          return async () => await getUserRequest();
        }
      }
      if (res.success) {
        dispatch({
          type: AuthActionTypes.AUTH_GET_USER,
          payload: res.user,
        });
      } else throw new Error(res.message);
    })
    .catch((error) => {
      console.info(error);
    });
};

export const updateUser = () => async (dispatch: Dispatch<AuthAction>) => {
  await updateUserRequest()
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
