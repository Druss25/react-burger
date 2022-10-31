import { RootStore } from "../../../models";
import { name } from "./actions";

export const currentIngredient = (store: RootStore) => store[name].data;
