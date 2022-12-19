import {
  getBun,
  getBurgerItems,
  getIngredients,
  getIngredientsCounters,
  totalBurgerPrice,
} from './selectors'
import { BurgerState, RootStore, IIngredients } from './../../../models/index'
import { burgerReducer, initialState } from './reducer'
import { addToBurger, BurgerAction, BurgerActionTypes } from './actions'
import {
  arrayIngredients,
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

describe('selectors', () => {
  it('should return getBun', () => {
    const burger: BurgerState = {
      bun: dataBun,
      ingredients: [dataIngredient],
    }

    const result = getBun({ burger } as RootStore)
    expect(result).toEqual(dataBun)
  })

  const burger: BurgerState = {
    bun: dataBun,
    ingredients: arrayIngredients,
  }

  it('should return getIngredients', () => {
    const result = getIngredients({ burger } as RootStore)
    expect(result).toEqual(arrayIngredients)
  })

  it('should return getBurgerItems', () => {
    const result = getBurgerItems({ burger } as RootStore)
    expect(result).toEqual(burger)
  })

  it('should return totalBurgerPrice', () => {
    const result = totalBurgerPrice({ burger } as RootStore)
    const bunPrice = burger.bun ? burger.bun.price * 2 : 0
    const ingredientsPrice = burger.ingredients.reduce(
      (total: number, value: IIngredients) => total + value.price,
      0,
    )
    expect(result).toEqual(bunPrice + ingredientsPrice)
  })

  it('should return getIngredientsCounters', () => {
    const result = getIngredientsCounters({ burger } as RootStore)
    expect(result).toEqual({
      '60d3b41abdacab0026a733c6': 2,
      '60d3b41abdacab0026a733c9': 1,
      '60d3b41abdacab0026a733cb': 1,
      '60d3b41abdacab0026a733cd': 1,
    })
  })
})
