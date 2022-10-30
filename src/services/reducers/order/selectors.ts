import { StateStoreType } from "../../../models";
import { name } from "./actions";

export const isLoadingOrderSelector = (state: StateStoreType) =>
  state[name].isLoading;
export const NumberOrderSelector = (state: StateStoreType) =>
  state[name].data?.order.number;
