import { Dispatch } from "redux";
import { IIngredients } from "../models";
import { baseUrl } from "../../utils/constants";

export enum IngredientsActionTypes {
  FETCH_INGREDIENTS_REQUEST = "FETCH_INGREDIENTS_REQUEST",
  FETCH_INGREDIENTS_SUCCESS = "FETCH_INGREDIENTS_SUCCESS",
  FETCH_INGREDIENTS_ERROR = "FETCH_INGREDIENTS_ERROR",
}

interface FetchIngredientsAction {
  type: IngredientsActionTypes.FETCH_INGREDIENTS_REQUEST;
}

interface FetchIngredientsSuccess {
  type: IngredientsActionTypes.FETCH_INGREDIENTS_SUCCESS;
  payload: IIngredients[];
}

interface FetchIngredientsError {
  type: IngredientsActionTypes.FETCH_INGREDIENTS_ERROR;
}

export type IngredientsAction =
  | FetchIngredientsAction
  | FetchIngredientsSuccess
  | FetchIngredientsError;

export const getIngredients = () => {
  return async (dispatch: Dispatch<IngredientsAction>) => {
    dispatch({ type: IngredientsActionTypes.FETCH_INGREDIENTS_REQUEST });
    const res = await fetch(`${baseUrl}/ingredients`);
    if (res && res.ok) {
      const { data } = await res?.json();
      dispatch({
        type: IngredientsActionTypes.FETCH_INGREDIENTS_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: IngredientsActionTypes.FETCH_INGREDIENTS_ERROR,
      });
    }
  };
};
