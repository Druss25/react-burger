import { v4 as uuid } from "uuid";
import { IIngredients } from "../models";

export const BURGER_ADD = "BURGER_ADD";
export const BURGER_DELETE = "BURGER_DELETE";
export const BURGER_RELOCATION = "BURGER_RELOCATION";
export const BURGER_RESET = "BURGER_RESET";

export const name = "burger";

export const addToBurger = (ingredient: IIngredients) => {
  return {
    type: BURGER_ADD,
    payload: {
      ...ingredient,
      id: uuid(),
    },
  };
};
