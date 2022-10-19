import { Dispatch } from "redux";
import { baseUrl } from "../../utils/constants";
// import { IIngredients } from "./../models/ingredients";

export enum IngredientsActionTypes {
  FETCH_INGREDIENT_REQUEST = "FETCH_INGREDIENT_REQUEST",
  FETCH_INGREDIENT_SUCCESS = "FETCH_INGREDIENT_SUCCESS",
  FETCH_INGREDIENT_ERROR = "FETCH_INGREDIENT_ERROR",
}

interface FetchIngredientsAction {
  type: IngredientsActionTypes.FETCH_INGREDIENT_REQUEST;
}

interface FetchIngredientsSuccess {
  type: IngredientsActionTypes.FETCH_INGREDIENT_SUCCESS;
  payload: [];
}

interface FetchIngredientsError {
  type: IngredientsActionTypes.FETCH_INGREDIENT_ERROR;
}

export type IngredientsAction =
  | FetchIngredientsAction
  | FetchIngredientsSuccess
  | FetchIngredientsError;

export const getIngredients = () => {
  return async (dispatch: Dispatch<IngredientsAction>) => {
    try {
      dispatch({ type: IngredientsActionTypes.FETCH_INGREDIENT_REQUEST });
      const res = await fetch(`${baseUrl}/ingredients`);
      if (res.ok) {
        const { data } = await res?.json();
        dispatch({
          type: IngredientsActionTypes.FETCH_INGREDIENT_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: IngredientsActionTypes.FETCH_INGREDIENT_ERROR,
        });
      }
    } catch (e: any) {
      dispatch({
        type: IngredientsActionTypes.FETCH_INGREDIENT_ERROR,
      });
    }
  };
};
