import { wsMessageOrders } from '../../../../models'
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from './wsActionsTypes'

export const name = 'orders'

export const wsConnectionSuccess = () => {
  return {
    type: WS_CONNECTION_SUCCESS,
  }
}

export const wsConnectionError = () => {
  return {
    type: WS_CONNECTION_ERROR,
  }
}

export const wsConnectionClosed = () => {
  return {
    type: WS_CONNECTION_CLOSED,
  }
}

export const wsGetMessage = (message: wsMessageOrders) => {
  return {
    type: WS_GET_MESSAGE,
    payload: message,
  }
}
