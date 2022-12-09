import { Dispatch } from 'redux'
import { TMessageData, TOrder } from './types'
import * as fetch from '../../../utils/fetch'

export const name = 'wsOrderAll'

export enum wsOrderAllActionTypes {
  GET_ORDER_REQUEST = 'GET_ORDER_REQUEST',
  GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS',
  GET_ORDER_FAILED = 'GET_ORDER_FAILED',
  WS_GET_ALL_ORDERS_REQUEST = 'WS_GET_ALL_ORDERS_REQUEST',
  WS_GET_ALL_ORDERS_SUCCESS = 'WS_GET_ALL_ORDERS_SUCCESS',
  WS_GET_ALL_ORDERS_FAILED = 'WS_GET_ALL_ORDERS_FAILED',
}

interface getOrderRequest {
  type: wsOrderAllActionTypes.GET_ORDER_REQUEST
}

interface getOrderSuccess {
  type: wsOrderAllActionTypes.GET_ORDER_SUCCESS
  payload: TOrder
}

interface getOrderFailed {
  type: wsOrderAllActionTypes.GET_ORDER_FAILED
}

interface getWsOrderAllRequest {
  type: wsOrderAllActionTypes.WS_GET_ALL_ORDERS_REQUEST
}

interface getWsOrderAllSuccess {
  type: wsOrderAllActionTypes.WS_GET_ALL_ORDERS_SUCCESS
  payload: TMessageData
}

interface getWsOrderAllFailed {
  type: wsOrderAllActionTypes.WS_GET_ALL_ORDERS_FAILED
}

export type wsOrderAllAction =
  | getWsOrderAllRequest
  | getWsOrderAllSuccess
  | getWsOrderAllFailed
  | getOrderRequest
  | getOrderSuccess
  | getOrderFailed

export const getWSOrderAll = (message: TMessageData) => (dispatch: Dispatch<wsOrderAllAction>) =>
  dispatch({ type: wsOrderAllActionTypes.WS_GET_ALL_ORDERS_SUCCESS, payload: message })

type TResponse = {
  success: boolean
  orders: TOrder
}
export const getOrderByNumber =
  (number: string) => async (dispatch: Dispatch<wsOrderAllAction>) => {
    dispatch({ type: wsOrderAllActionTypes.GET_ORDER_REQUEST })
    await fetch
      .get<TResponse>(`/orders/${number}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        if (res.success) {
          return dispatch({ type: wsOrderAllActionTypes.GET_ORDER_SUCCESS, payload: res.orders })
        }
      })
      .catch(error => {
        return dispatch({ type: wsOrderAllActionTypes.GET_ORDER_FAILED, payload: error })
      })
  }
