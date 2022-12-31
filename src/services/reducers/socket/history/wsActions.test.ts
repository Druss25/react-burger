import {
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_GET_MESSAGE,
} from './wsActionsTypes'
import {
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetMessage,
} from './wsActions'
import { mockDataOrders } from '../orders/data'

describe('testing actions socket history', () => {
  it('test action wsConnectionSuccess', () => {
    const action = {
      type: WS_AUTH_CONNECTION_SUCCESS,
    }

    expect(wsConnectionSuccess()).toEqual(action)
  })

  it('test action wsConnectionError', () => {
    const action = {
      type: WS_AUTH_CONNECTION_ERROR,
    }

    expect(wsConnectionError()).toEqual(action)
  })

  it('test action wsConnectionClosed', () => {
    const action = {
      type: WS_AUTH_CONNECTION_CLOSED,
    }

    expect(wsConnectionClosed()).toEqual(action)
  })

  it('test action wsGetMessage', () => {
    const action = {
      type: WS_AUTH_GET_MESSAGE,
      payload: mockDataOrders,
    }

    expect(wsGetMessage(mockDataOrders)).toEqual(action)
  })

})
