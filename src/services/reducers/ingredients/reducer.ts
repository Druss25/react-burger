import { IngredientsAction, IngredientsActionTypes } from './actions'
import { IngredientsState } from '../../../models'

export const initialState: IngredientsState = {
  data: [],
  isLoading: false,
  hasError: false,
}

export const ingredientsReducer = (
  state = initialState,
  action: IngredientsAction,
): IngredientsState => {
  switch (action.type) {
    case IngredientsActionTypes.GET_INGREDIENTS_REQUEST:
      return { ...state, isLoading: true }
    case IngredientsActionTypes.GET_INGREDIENTS_SUCCESS:
      return { ...state, data: action.payload, isLoading: false }
    case IngredientsActionTypes.GET_INGREDIENTS_ERROR:
      return { ...state, isLoading: false, hasError: true }
    default:
      return state
  }
}
