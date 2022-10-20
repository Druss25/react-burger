import { IIngredients } from "./../models/ingredients";
import { Dispatch } from "redux";

export enum BurgerActionTypes {
  GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST",
  GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS",
  GET_ITEMS_ERROR = "GET_ITEMS_ERROR",
  ADD_ITEMS = "ADD_ITEMS",
  DELETE_ITEMS = "DELETE_ITEMS",
}

interface ItemsAction {
  type: BurgerActionTypes.GET_ITEMS_REQUEST;
}

interface ItemsSuccess {
  type: BurgerActionTypes.GET_ITEMS_SUCCESS;
}

interface ItemsError {
  type: BurgerActionTypes.GET_ITEMS_ERROR;
}

interface AddItems {
  type: BurgerActionTypes.ADD_ITEMS;
  payload: IIngredients;
}

interface DeleteItems {
  type: BurgerActionTypes.DELETE_ITEMS;
  payload: IIngredients;
}

export type BurgerAction =
  | ItemsAction
  | ItemsSuccess
  | ItemsError
  | AddItems
  | DeleteItems;

export const AddBurgerBunItems = (item: IIngredients) => {
  return (dispatch: Dispatch<BurgerAction>) => {
    if (item !== null && item !== undefined)
      dispatch({
        type: BurgerActionTypes.ADD_ITEMS,
        payload: item,
      });
  };
};
