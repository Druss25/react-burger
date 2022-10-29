import { Dispatch } from "redux";
import { IIngredients } from "../models";
import { baseUrl } from "../../utils/constants";

export const name = "ingredients";

export enum IngredientsActionTypes {
  GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST",
  GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS",
  GET_INGREDIENTS_ERROR = "GET_INGREDIENTS_ERROR",
}

interface getIngredientsAction {
  type: IngredientsActionTypes.GET_INGREDIENTS_REQUEST;
}

interface getIngredientsSuccess {
  type: IngredientsActionTypes.GET_INGREDIENTS_SUCCESS;
  payload: IIngredients[];
}

interface getIngredientsError {
  type: IngredientsActionTypes.GET_INGREDIENTS_ERROR;
}

export type IngredientsAction =
  | getIngredientsAction
  | getIngredientsSuccess
  | getIngredientsError;

export const getIngredients = () => {
  return async (dispatch: Dispatch<IngredientsAction>) => {
    dispatch({
      type: IngredientsActionTypes.GET_INGREDIENTS_REQUEST,
    });
    const res = await fetch(`${baseUrl}/ingredients`);
    if (res && res.ok) {
      const { data } = await res?.json();
      dispatch({
        type: IngredientsActionTypes.GET_INGREDIENTS_SUCCESS,
        payload: data as IIngredients[],
      });
    } else {
      dispatch({
        type: IngredientsActionTypes.GET_INGREDIENTS_ERROR,
      });
    }
  };
};
