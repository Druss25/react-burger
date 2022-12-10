import { TOrder } from '../../ws-orders-all/types'
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from './wsActionsTypes'

type TInitState = {
  messages: TMessages
  wsConnected: boolean
}
type TMessages = {
  orders: TOrder[]
  total: number
  totalToday: number
}

const initialState: TInitState = {
  messages: {} as TMessages,
  wsConnected: false,
}

export const wsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      }

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      }

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      }

    case WS_GET_MESSAGE: {
      return {
        ...state,
        messages: action.payload,
      }
    }
    default:
      return state
  }
}
