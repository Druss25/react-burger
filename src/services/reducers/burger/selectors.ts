import { IIngredients, RootStore } from "../../../models/index";
import { createSelector } from "reselect";
import { name } from "./actions";

const getBun = (store: RootStore) => store[name].bun;
const getIngredients = (store: RootStore) => store[name].ingredients;

export const getBurgerItems = createSelector(
  getBun,
  getIngredients,
  (bun, ingredients) => ({
    bun,
    ingredients,
  })
);

export const totalBurgerPrice = createSelector(
  getBun,
  getIngredients,
  (bun, ingredients) => {
    return (
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (total: number, value: IIngredients) => total + value.price,
        0
      )
    );
  }
);

interface ICounter {
  [key: string]: number;
}

export const getIngredientsCounters = createSelector(
  getBurgerItems,
  ({ bun, ingredients }) => {
    const counters: ICounter = {};

    ingredients.forEach((ingredient: IIngredients) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (bun) counters[bun._id] = 2;
    return counters;
  }
);
