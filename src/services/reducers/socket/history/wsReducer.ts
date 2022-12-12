import { AnyAction } from 'redux'
import { TOrder } from '../../ws-orders-all/types'
import {
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_GET_MESSAGE,
} from './wsActionsTypes'

type TMessages = {
  orders: TOrder[]
  total: number
  totalToday: number
}

type TInitState = {
  messages: TMessages
  wsConnected: boolean
}

const initialState: TInitState = {
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
