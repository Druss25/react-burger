import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from './wsActionsTypes'
import { initialState, TMessages, wsReducer } from './wsReducer'

describe('testing Redux orderReducer', () => {
  it('should return the initial state', () => {
    expect(wsReducer(undefined, {} as any)).toEqual(initialState)
  })

  it('should return the action WS_CONNECTION_SUCCESS', () => {
    const action = {
      type: WS_CONNECTION_SUCCESS,
    }
    expect(wsReducer(initialState, action)).toEqual({
      ...initialState,
      wsConnected: true,
    })
  })

  it('should return the action WS_CONNECTION_ERROR', () => {
    const action = {
      type: WS_CONNECTION_ERROR,
    }
    expect(wsReducer(initialState, action)).toEqual({
      ...initialState,
      wsConnected: false,
    })
  })

  it('should return the action WS_CONNECTION_CLOSED', () => {
    const action = {
      type: WS_CONNECTION_CLOSED,
    }
    expect(wsReducer(initialState, action)).toEqual({
      ...initialState,
      wsConnected: false,
    })
  })

  it('should return the action WS_GET_MESSAGE', () => {
    const mockData: TMessages = { orders: [], total: 0, totalToday: 0 }

    const action = {
      type: WS_GET_MESSAGE,
      payload: mockData,
    }

    expect(wsReducer(initialState, action)).toEqual({
      ...initialState,
      messages: action.payload,
    })
  })
})
