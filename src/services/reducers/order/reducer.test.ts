import { IResponseOrder } from './../../../models/index'
import { OrderAction, OrderActionTypes } from './actions'
import { initialState, orderReducer } from './reducer'

describe('testing Redux orderReducer', () => {
  it('should return the initial state', () => {
    expect(orderReducer(undefined, {} as OrderAction)).toEqual(initialState)
  })

  it('should return the action ORDER_REQUEST', () => {
    const action: OrderAction = {
      type: OrderActionTypes.ORDER_REQUEST,
    }
    expect(orderReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
      error: null,
    })
  })

  it('should return ORDER_SUCCESS', () => {
    const mockData: IResponseOrder = {
      success: true,
      name: '',
      order: { number: 3455 },
      message: '',
    }
    const action: OrderAction = {
      type: OrderActionTypes.ORDER_SUCCESS,
      payload: mockData,
    }

    expect(orderReducer(initialState, action)).toEqual({
      ...initialState,
      data: action.payload,
      isLoading: false,
      error: null,
    })
  })

  it('should return the action ORDER_ERROR', () => {
    const action: OrderAction = {
      type: OrderActionTypes.ORDER_ERROR,
      payload: 'Ошибка получения данных от сервера',
    }
    expect(orderReducer(initialState, action)).toEqual({
      ...initialState,
      data: null,
      isLoading: false,
      error: action.payload,
    })
  })

  it('should return the action ORDER_RESET', () => {
    const action: OrderAction = {
      type: OrderActionTypes.ORDER_RESET,
    }
    expect(orderReducer(initialState, action)).toEqual(initialState)
  })
})
