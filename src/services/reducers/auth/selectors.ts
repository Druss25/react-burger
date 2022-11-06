import { RootStore } from "../../../models";
import { name } from "./actions";

export const isLoadingAuthSelector = (state: RootStore) =>
  state[name].isLoading;
export const isAuthSelector = (state: RootStore) => state[name].isAuth;
export const getUserSelector = (state: RootStore) => state[name].user;
