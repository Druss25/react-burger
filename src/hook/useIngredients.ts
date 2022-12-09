import React from 'react'
import { useAppSelector } from './../services/store/index'
import { ingredientsSelector } from '../services/reducers/ingredients/selectors'
import { IIngredients } from '../models'

type TCount = {
  [key: string]: number
}

const useIngredients = (ingredients: ReadonlyArray<string>) => {
  const allIngredients = useAppSelector(ingredientsSelector)

  const fullIngredients = React.useCallback(
    (ingredients: ReadonlyArray<string>) =>
      ingredients.map(ingredient => allIngredients.filter(item => item._id === ingredient)).flat(),
    [allIngredients],
  )

  const totalPrice = React.useCallback(
    (ingredients: ReadonlyArray<IIngredients>) =>
      ingredients.reduce((total: number, value) => total + value.price, 0),
    [],
  )

  const summa = totalPrice(fullIngredients(ingredients))

  const noDoubleIngredients = fullIngredients(ingredients)
    .filter((item, index) => fullIngredients(ingredients).indexOf(item) === index)

  const countIngredients = (ingredients: ReadonlyArray<string>) => {
    let count = {} as TCount

    for (let elem of ingredients) {
      if (count[elem] === undefined) {
        count[elem] = 1
      } else {
        count[elem]++
      }
    }
    return count
  }

  const counts = countIngredients(ingredients)

  return { summa, noDoubleIngredients, counts }
}

export default useIngredients
