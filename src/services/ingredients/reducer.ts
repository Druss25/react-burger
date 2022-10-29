import { IngredientsAction, IngredientsActionTypes } from "./actions";
import { IngredientsState } from "../models";

const initialState: IngredientsState = {
  data: [],
  isLoading: false,
  hasError: false,
};

export const ingredientsReducer = (
  state = initialState,
  action: IngredientsAction
): IngredientsState => {
  switch (action.type) {
    case IngredientsActionTypes.GET_INGREDIENTS_REQUEST:
      return { data: [], isLoading: true, hasError: false };
    case IngredientsActionTypes.GET_INGREDIENTS_SUCCESS:
      return { data: action.payload, isLoading: false, hasError: false };
    case IngredientsActionTypes.GET_INGREDIENTS_ERROR:
      return { data: [], isLoading: false, hasError: true };
    default:
      return state;
  }
};
