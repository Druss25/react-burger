import { ISocketMessage, wsMessageOrders } from '../../../../models'
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from './wsActionsTypes'

export const initialState: ISocketMessage = {
  messages: {} as wsMessageOrders,
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
