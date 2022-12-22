import { burgerReducer, initialState } from './reducer'
import { addToBurger, BurgerAction, BurgerActionTypes } from './actions'
import {
  dataBun,
  dataIngredient,
  resultDeleteState,
  resultState,
  testState,
} from './test-data'

describe('testing Redux burgerReducer', () => {
  it('should return the initial state', () => {
    expect(burgerReducer(undefined, {} as BurgerAction)).toEqual(initialState)
  })

  it('should return the action BURGER_ADD add bun', () => {
    const action: BurgerAction = {
      type: BurgerActionTypes.BURGER_ADD,
      payload: dataBun,
    }
    expect(burgerReducer(initialState, action)).toEqual({
      ...initialState,
      bun: action.payload,
    })
  })

  it('should return the action BURGER_ADD add ingredients', () => {
    const action: BurgerAction = addToBurger(dataIngredient)

    expect(burgerReducer(initialState, action)).toEqual({
      ...initialState,
      ingredients: [...initialState.ingredients, action.payload],
    })
  })

  it('should return the action BURGER_DELETE ingredient', () => {
    const action: BurgerAction = {
      type: BurgerActionTypes.BURGER_DELETE,
      payload: 1,
    }

    expect(burgerReducer(testState, action)).toEqual(resultDeleteState)
  })

  it('should return the action BURGER_RELOCATION ingredients', () => {
    const action: BurgerAction = {
      type: BurgerActionTypes.BURGER_RELOCATION,
      payload: { to: 1, from: 2 },
    }

    expect(burgerReducer(testState, action)).toEqual(resultState)
  })

  it('should return the action BURGER_RESET', () => {
    const action: BurgerAction = {
      type: BurgerActionTypes.BURGER_RESET,
    }
    expect(burgerReducer(initialState, action)).toEqual(initialState)
  })
})
