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
