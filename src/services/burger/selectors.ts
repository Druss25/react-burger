import { IIngredients, StateStoreType } from "./../models/index";
import { createSelector } from "reselect";
import { name } from "./actions";

const getBun = (store: StateStoreType) => store[name].bun;
const getIngredients = (store: StateStoreType) => store[name].ingredients;

export const getBurgerItems = createSelector(
  getBun,
  getIngredients,
  (bun, ingredients) => ({
    bun,
    ingredients,
  })
);

export const getPrice = createSelector(
  getBun,
  getIngredients,
  (bun, ingredients) => {
    return (
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce((total: any, value: any) => total + value.price, 0)
    );
  }
);

export const getIngredientsCounters = createSelector(
  getBurgerItems,
  ({ bun, ingredients }) => {
    const counters: any = {};
    ingredients.forEach((ingredient: IIngredients) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (bun) counters[bun._id] = 2;
    return counters;
  }
);
