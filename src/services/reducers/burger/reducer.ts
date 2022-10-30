import { BurgerState } from "../../../models/index";
import {
  BURGER_ADD,
  BURGER_DELETE,
  BURGER_RELOCATION,
  BURGER_RESET,
} from "./actions";

const initialState: BurgerState = {
  bun: null,
  ingredients: [],
};

export const burgerReducer = (
  state = initialState,
  action: any
): BurgerState => {
  switch (action.type) {
    case BURGER_ADD: {
      if (action.payload.type === "bun") {
        return { ...state, bun: action.payload };
      }
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    }
    case BURGER_DELETE: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients.slice(0, action.payload),
          ...state.ingredients.slice(action.payload + 1),
        ],
      };
    }
    case BURGER_RELOCATION: {
      const ingredients = [...state.ingredients];
      ingredients.splice(
        action.payload.to,
        0,
        ingredients.splice(action.payload.from, 1)[0]
      );
      return {
        ...state,
        ingredients,
      };
    }
    case BURGER_RESET: {
      return initialState;
    }
    default:
      return state;
  }
};
