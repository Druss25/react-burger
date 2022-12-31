export interface IUser {
  email: string
  name: string
}

export interface IResponse {
  success: boolean
  user: IUser
  accessToken: string
  refreshToken: string
  message?: string
}

export interface IResponseLogout {
  success: boolean
}

export interface IResponseUser {
  success: boolean
  user: IUser
  message?: string
}

export interface IResponseToken {
  success: boolean
  accessToken: string
  refreshToken: string
}

export interface IResponseReset {
  success: boolean
  message: string
}

export interface IRequestLogin {
  email: string
  password: string
}

export interface IRequestRegister {
  email: string
  name: string
  password?: string
}

export interface IRequestResetPassword {
  password: string
  token: string
}

export interface IRequestForgotPassword {
  email: string
}
