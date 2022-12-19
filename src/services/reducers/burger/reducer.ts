import { BurgerState } from '../../../models/index'
import { BurgerActionTypes, BurgerAction } from './actions'

export const initialState: BurgerState = {
  bun: null,
  ingredients: [],
}

export const burgerReducer = (state = initialState, action: BurgerAction): BurgerState => {
  switch (action.type) {
    case BurgerActionTypes.BURGER_ADD: {
      if (action.payload.type === 'bun') {
        return { ...state, bun: action.payload }
      }
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      }
    }

    case BurgerActionTypes.BURGER_DELETE: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients.slice(0, action.payload),
          ...state.ingredients.slice(action.payload + 1),
        ],
      }
    }

    case BurgerActionTypes.BURGER_RELOCATION: {
      const ingredients = [...state.ingredients]
      ingredients.splice(action.payload.to, 0, ingredients.splice(action.payload.from, 1)[0])
      return {
        ...state,
        ingredients,
      }
    }
    case BurgerActionTypes.BURGER_RESET: {
      return initialState
    }

    default:
      return state
  }
}
