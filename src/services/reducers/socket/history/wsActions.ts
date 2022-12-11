import {
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_GET_MESSAGE,
} from './wsActionsTypes'

export const name = 'history'

export const wsConnectionSuccess = () => {
  return {
    type: WS_AUTH_CONNECTION_SUCCESS,
  }
}

export const wsConnectionError = () => {
  return {
    type: WS_AUTH_CONNECTION_ERROR,
  }
}

export const wsConnectionClosed = () => {
  return {
    type: WS_AUTH_CONNECTION_CLOSED,
  }
}

export const wsGetMessage = (message: any) => {
  return {
    type: WS_AUTH_GET_MESSAGE,
    payload: message,
  }
}
