import { AnyAction } from 'redux'
import { TOrder } from '../../socket/orders/types'
import {
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_GET_MESSAGE,
} from './wsActionsTypes'

export type TMessages = {
  orders: TOrder[]
  total: number
  totalToday: number
}

type TInitState = {
  messages: TMessages
  wsConnected: boolean
}

export const initialState: TInitState = {
  messages: {} as TMessages,
  wsConnected: false,
}

export const wsHistoryReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case WS_AUTH_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      }

    case WS_AUTH_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      }

    case WS_AUTH_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      }

    case WS_AUTH_GET_MESSAGE: {
      return {
        ...state,
        messages: action.payload,
      }
    }
    default:
      return state
  }
}
