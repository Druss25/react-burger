import {
  wsConnectionClosed,
  wsConnectionError,
  wsConnectionSuccess,
  wsGetMessage,
} from './wsActions'
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from './wsActionsTypes'
import { mockDataOrders } from './data'

describe('testing actions socket orders', () => {
  it('test action wsConnectionSuccess', () => {
    const action = {
      type: WS_CONNECTION_SUCCESS,
    }

    expect(wsConnectionSuccess()).toEqual(action)
  })

  it('test action wsConnectionError', () => {
    const action = {
      type: WS_CONNECTION_ERROR,
    }

    expect(wsConnectionError()).toEqual(action)
  })

  it('test action wsConnectionClosed', () => {
    const action = {
      type: WS_CONNECTION_CLOSED,
    }

    expect(wsConnectionClosed()).toEqual(action)
  })

  it('test action wsGetMessage', () => {
    const action = {
      type: WS_GET_MESSAGE,
      payload: mockDataOrders,
    }

    expect(wsGetMessage(mockDataOrders)).toEqual(action)
  })
})
