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

export const getOrder = (ingredients: string[]) => async (dispatch: Dispatch<OrderAction>) => {
  dispatch({ type: OrderActionTypes.ORDER_REQUEST })
  const token = localStorage.getItem('accessToken') as string
  return await fetch
    .post<IResponseOrder>('/orders', {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ ingredients }),
    })
    .then(res => {
      if (res.success) {
        dispatch({
          type: OrderActionTypes.ORDER_SUCCESS,
          payload: res,
        })
      } else {
        throw Error('Что-то пошло не так')
      }
    })
    .catch((error: Error) => {
      dispatch({
        type: OrderActionTypes.ORDER_ERROR,
        payload: error.message,
      })
    })
}
