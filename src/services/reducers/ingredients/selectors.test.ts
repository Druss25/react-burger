import {
  errorSelector,
  getBun,
  getMain,
  getSauce,
  ingredientsSelector,
  loadingSelector,
} from './selectors'
import { IngredientsState, RootStore } from '../../../models'
import { dataFake } from '../../../utils/data'

const ingredients: IngredientsState = {
  data: dataFake.data,
  isLoading: false,
  hasError: false,
}

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
