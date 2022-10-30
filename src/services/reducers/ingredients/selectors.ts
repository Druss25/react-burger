import { StateStoreType } from "../../../models";
import { name } from "./actions";

export const loadingSelector = (state: StateStoreType) => state[name].isLoading;
export const errorSelector = (state: StateStoreType) => state[name].hasError;
export const ingredientsSelector = (state: StateStoreType) =>
  state.ingredients.data;

export const getBun = (state: StateStoreType) =>
  state[name].data.filter((item) => item.type === "bun");
export const getSauce = (state: StateStoreType) =>
  state[name].data.filter((item) => item.type === "sauce");
export const getMain = (state: StateStoreType) =>
  state[name].data.filter((item) => item.type === "main");
