import { BurgerState, IIngredients, RootStore } from "../../../models"
import { getBun, getBurgerItems, getIngredients, getIngredientsCounters, totalBurgerPrice } from "./selectors"
import { arrayIngredients, dataBun, dataIngredient } from "./test-data"

describe('testing Redux burgerReducer selectors', () => {
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
