import { Dispatch } from "redux";
import { IIngredients } from "../../../models";
import { requestFetch } from "../../../utils/httpReguest";

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

export const getIngredients = () => (dispatch: Dispatch<IngredientsAction>) => {
  dispatch({
    type: IngredientsActionTypes.GET_INGREDIENTS_REQUEST,
  });
  requestFetch("/ingredients")
    .then((data) => {
      dispatch({
        type: IngredientsActionTypes.GET_INGREDIENTS_SUCCESS,
        payload: data.data,
      });
    })
    .catch(() => {
      dispatch({
        type: IngredientsActionTypes.GET_INGREDIENTS_ERROR,
      });
    });
};
