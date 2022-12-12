import { wsOrderAllActionTypes, wsOrderAllAction } from './actions'
import { TMessageData, TOrder } from './types'

const initialState: TMessageData = {
  orders: [] as TOrder[],
  success: false,
  total: 0,
  totalToday: 0,
  event: '',
}

export const wsOrdersAllReducer = (state = initialState, action: wsOrderAllAction) => {
  switch (action.type) {
    case wsOrderAllActionTypes.GET_ORDER_REQUEST: {
      return {
        ...state,
      }
    }
    case wsOrderAllActionTypes.GET_ORDER_SUCCESS: {
      return {
        ...state,
        orders: action.payload,
      }
    }
    case wsOrderAllActionTypes.GET_ORDER_FAILED: {
      return {
        state: initialState,
      }
    }
    case wsOrderAllActionTypes.WS_GET_ALL_ORDERS_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      }
    }
    default:
      return state
  }
}
