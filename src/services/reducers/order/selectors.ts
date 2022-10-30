import { RootStore } from "../../../models";
import { name } from "./actions";

export const isLoadingOrderSelector = (state: RootStore) =>
  state[name].isLoading;
export const NumberOrderSelector = (state: RootStore) =>
  state[name].data?.order.number;
