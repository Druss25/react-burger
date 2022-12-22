import {
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_GET_MESSAGE,
} from './wsActionsTypes'
import { initialState, TMessages, wsHistoryReducer } from './wsReducer'

describe('testing Redux wsHistoryReducer', () => {
  it('should return the initial state', () => {
    expect(wsHistoryReducer(undefined, {} as any)).toEqual(initialState)
  })

  it('should return the action WS_AUTH_CONNECTION_SUCCESS', () => {
    const action = {
      type: WS_AUTH_CONNECTION_SUCCESS,
    }
    expect(wsHistoryReducer(initialState, action)).toEqual({
      ...initialState,
      wsConnected: true,
    })
  })

  it('should return the action WS_AUTH_CONNECTION_ERROR', () => {
    const action = {
      type: WS_AUTH_CONNECTION_ERROR,
    }
    expect(wsHistoryReducer(initialState, action)).toEqual({
      ...initialState,
      wsConnected: false,
    })
  })

  it('should return the action WS_AUTH_CONNECTION_CLOSED', () => {
    const action = {
      type: WS_AUTH_CONNECTION_CLOSED,
    }
    expect(wsHistoryReducer(initialState, action)).toEqual({
      ...initialState,
      wsConnected: false,
    })
  })

  it('should return the action WS_AUTH_GET_MESSAGE', () => {
    const mockData: TMessages = { orders: [], total: 0, totalToday: 0 }

    const action = {
      type: WS_AUTH_GET_MESSAGE,
      payload: mockData,
    }

    expect(wsHistoryReducer(initialState, action)).toEqual({
      ...initialState,
      messages: action.payload,
    })
  })
})
