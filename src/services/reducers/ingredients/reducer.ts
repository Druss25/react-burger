import { IngredientsAction, IngredientsActionTypes } from './actions'
import { IngredientsState } from '../../../models'

export const initialState: IngredientsState = {
  data: [],
  isLoading: false,
  hasError: false,
  message: null,
}

export const ingredientsReducer = (
  state = initialState,
  action: IngredientsAction,
): IngredientsState => {
  switch (action.type) {
    case IngredientsActionTypes.GET_INGREDIENTS_REQUEST:
      return { ...state, isLoading: true }
    case IngredientsActionTypes.GET_INGREDIENTS_SUCCESS:
      return { ...state, data: action.payload.data, isLoading: false }
    case IngredientsActionTypes.GET_INGREDIENTS_ERROR:
      return { ...state, isLoading: false, hasError: true, message: action.payload }
    default:
      return state
  }
}
