import { StateStoreType } from "../models";

export const loadingSelector = (state: StateStoreType) =>
  state.ingredients.isLoading;
export const errorSelector = (state: StateStoreType) =>
  state.ingredients.hasError;
export const dataSelector = (state: StateStoreType) => state.ingredients.data;
