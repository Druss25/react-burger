import { OrderState } from '../../../models'
import { OrderAction, OrderActionTypes } from './actions'

export const initialState: OrderState = {
  data: null,
  isLoading: false,
  error: null,
}

export const orderReducer = (state = initialState, action: OrderAction): OrderState => {
  switch (action.type) {
    case OrderActionTypes.ORDER_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    }
    case OrderActionTypes.ORDER_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: null,
      }
    }
    case OrderActionTypes.ORDER_ERROR: {
      return {
        ...state,
        data: null,
        isLoading: false,
        error: 'Ошибка получения данных от сервера',
      }
    }
    case OrderActionTypes.ORDER_RESET: {
      return initialState
    }
    default:
      return state
  }
}
