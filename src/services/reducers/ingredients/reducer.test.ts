import { ingredientsReducer, initialState } from './reducer'
import { IngredientsAction, IngredientsActionTypes } from './actions'
import { dataFake } from './../../../utils/data'

describe('testing ingredientsReducer', () => {
  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, {} as IngredientsAction)).toEqual(initialState)
  })

  it('should return the action AUTH_USER_REQUEST', () => {
    const action: IngredientsAction = {
      type: IngredientsActionTypes.GET_INGREDIENTS_REQUEST,
    }
    expect(ingredientsReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    })
  })

  it('should return the action AUTH_USER_SUCCESS', () => {
    const action: IngredientsAction = {
      type: IngredientsActionTypes.GET_INGREDIENTS_SUCCESS,
      payload: dataFake.data,
    }
    expect(ingredientsReducer(initialState, action)).toEqual({
      ...initialState,
      data: dataFake.data,
      isLoading: false,
    })
  })

  it('should return the action AUTH_USER_ERROR', () => {
    const action: IngredientsAction = {
      type: IngredientsActionTypes.GET_INGREDIENTS_ERROR,
    }
    expect(ingredientsReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      hasError: true,
    })
  })
})
