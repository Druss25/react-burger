import { Dispatch } from 'redux'
import { IResponseOrder } from '../../../models'
import * as fetch from '../../../utils/fetch'

export const name = 'order'

export enum OrderActionTypes {
  ORDER_REQUEST = 'ORDER_REQUEST',
  ORDER_SUCCESS = 'ORDER_SUCCESS',
  ORDER_ERROR = 'ORDER_ERROR',
  ORDER_RESET = 'ORDER_RESET',
}

interface getOrderAction {
  type: OrderActionTypes.ORDER_REQUEST
}

interface getOrderSuccess {
  type: OrderActionTypes.ORDER_SUCCESS
  payload: IResponseOrder
}

interface getOrderFailed {
  type: OrderActionTypes.ORDER_ERROR
  payload: string
}

interface OrderReset {
  type: OrderActionTypes.ORDER_RESET
}

export type OrderAction = getOrderAction | getOrderSuccess | getOrderFailed | OrderReset

export const getOrder = (ingredientsList: string[]) => async (dispatch: Dispatch<OrderAction>) => {
  dispatch({ type: OrderActionTypes.ORDER_REQUEST })
  await fetch
    .post<IResponseOrder>('/orders', {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ ingredients: ingredientsList }),
    })
    .then(res => {
      if (res.success) {
        dispatch({
          type: OrderActionTypes.ORDER_SUCCESS,
          payload: res,
        })
      }
    })
    .catch(error => {
      dispatch({
        type: OrderActionTypes.ORDER_ERROR,
        payload: error,
      })
    })
}
