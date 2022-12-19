import { dataFake } from './../../../utils/data'
import { IngredientsAction, IngredientsActionTypes } from './actions'
import { ingredientsReducer, initialState } from './reducer'
import { IngredientsState, RootStore } from '../../../models'
import {
  errorSelector,
  ingredientsSelector,
  loadingSelector,
  getBun,
  getSauce,
  getMain,
} from './selectors'

const ingredients: IngredientsState = {
  data: dataFake.data,
  isLoading: false,
  hasError: false,
}

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

describe('selectors', () => {
  it('should return loadingSelector', () => {
    const result = loadingSelector({ ingredients } as RootStore)
    expect(result).toEqual(false)
  })

  it('should return errorSelector', () => {
    const result = errorSelector({ ingredients } as RootStore)
    expect(result).toEqual(false)
  })

  it('should return ingredientsSelector', () => {
    const result = ingredientsSelector({ ingredients } as RootStore)
    expect(result).toEqual(dataFake.data)
  })

  it('should return getBun', () => {
    const result = getBun({ ingredients } as RootStore)
    const bun = dataFake.data.filter(item => item.type === 'bun')
    expect(result).toEqual(bun)
  })

  it('should return getSauce', () => {
    const result = getSauce({ ingredients } as RootStore)
    const sauce = dataFake.data.filter(item => item.type === 'sauce')
    expect(result).toEqual(sauce)
  })

  it('should return getMain', () => {
    const result = getMain({ ingredients } as RootStore)
    const main = dataFake.data.filter(item => item.type === 'main')
    expect(result).toEqual(main)
  })
})
