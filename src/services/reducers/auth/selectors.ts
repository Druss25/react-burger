import { RootStore } from "../../../models";
import { name } from "./actions";

export const AuthSelector = (state: RootStore) => state[name];
export const UserSelector = (state: RootStore) => state[name].user;
