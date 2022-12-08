import { Dispatch } from 'redux'
import { TMessageData } from './types'

export enum wsOrderAllActionTypes {
  WS_GET_ALL_ORDERS_REQUEST = 'WS_GET_ALL_ORDERS_REQUEST',
  WS_GET_ALL_ORDERS_SUCCESS = 'WS_GET_ALL_ORDERS_SUCCESS',
  WS_GET_ALL_ORDERS_FAILED = 'WS_GET_ALL_ORDERS_FAILED',
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

export type wsOrderAllAction = getWsOrderAllRequest | getWsOrderAllSuccess | getWsOrderAllFailed

export const getWSOrderAll = (message: TMessageData) => (dispatch: Dispatch<wsOrderAllAction>) =>
  dispatch({ type: wsOrderAllActionTypes.WS_GET_ALL_ORDERS_SUCCESS, payload: message })
