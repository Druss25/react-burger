export interface IUser {
  email: string;
  name: string;
}

export interface IRequestLogin {
  email: string;
  password: string;
  name: string;
}

export interface IResponseLogin {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: IUser;
  message?: string;
}

export interface IResponseRegistration {
  success: boolean;
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface IResponseRefreshToken {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface IResponseLogout {
  success: boolean;
  message: string;
}

export interface IResponseUser {
  success: boolean;
  user: IUser;
}
