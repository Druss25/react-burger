import { BurgerAction, BurgerActionTypes } from "../actions/burger";
import {
  BurgerState,
  // IIngredients
} from "../models/ingredients";

// const InitItems: IIngredients[] = [];

const initialState: BurgerState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
};

export const burgerReducer = (
  state = initialState,
  action: BurgerAction
): BurgerState => {
  switch (action.type) {
    case BurgerActionTypes.GET_ITEMS_REQUEST: {
      return { ...state, itemsRequest: true };
    }
    case BurgerActionTypes.GET_ITEMS_SUCCESS: {
      return { ...state, itemsFailed: false, itemsRequest: false };
    }
    case BurgerActionTypes.GET_ITEMS_ERROR: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }
    case BurgerActionTypes.ADD_ITEMS: {
      // console.log("ADD_ITEMS: ", action.payload);
      return {
        ...state,
        items: [...state.items, action?.payload],
      };
    }
    case BurgerActionTypes.DELETE_ITEMS: {
      return {
        ...state,
        items: [...state.items].filter(
          (item) => item._id !== action?.payload._id
        ),
      };
    }
    default:
      return state;
  }
};
