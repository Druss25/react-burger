import { v4 as uuid } from "uuid";
import { IIngredients, IRelocatedBurger } from "../../../models";

export const name = "burger";

export enum BurgerActionTypes {
  BURGER_ADD = "BURGER_ADD",
  BURGER_DELETE = "BURGER_DELETE",
  BURGER_RELOCATION = "BURGER_RELOCATION",
  BURGER_RESET = "BURGER_RESET",
}

interface addBurgerAction {
  type: BurgerActionTypes.BURGER_ADD;
  payload: IIngredients;
}

interface deleteBurgerAction {
  type: BurgerActionTypes.BURGER_DELETE;
  payload: number;
}

interface relocatedBurgerAction {
  type: BurgerActionTypes.BURGER_RELOCATION;
  payload: IRelocatedBurger;
}

interface resetBurgerAction {
  type: BurgerActionTypes.BURGER_RESET;
}

export type BurgerAction =
  | addBurgerAction
  | deleteBurgerAction
  | relocatedBurgerAction
  | resetBurgerAction;

export const addToBurger = (ingredient: IIngredients) => {
  return {
    type: BurgerActionTypes.BURGER_ADD,
    payload: {
      ...ingredient,
      id: uuid(),
    },
  };
};
