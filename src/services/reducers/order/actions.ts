import { Dispatch } from "redux";
import { IResponseOrderApi } from "../../../models";
import { orderRequest } from "../../../utils/api";

export const name = "order";

export enum OrderActionTypes {
  ORDER_REQUEST = "ORDER_REQUEST",
  ORDER_SUCCESS = "ORDER_SUCCESS",
  ORDER_ERROR = "ORDER_ERROR",
  ORDER_RESET = "ORDER_RESET",
}

interface getOrderAction {
  type: OrderActionTypes.ORDER_REQUEST;
}

interface getOrderSuccess {
  type: OrderActionTypes.ORDER_SUCCESS;
  payload: IResponseOrderApi;
}

interface getOrderFailed {
  type: OrderActionTypes.ORDER_ERROR;
  payload: string;
}

interface OrderReset {
  type: OrderActionTypes.ORDER_RESET;
}

export type OrderAction =
  | getOrderAction
  | getOrderSuccess
  | getOrderFailed
  | OrderReset;

export const getOrder =
  (ingredientsList: string[]) => async (dispatch: Dispatch<OrderAction>) => {
    dispatch({ type: OrderActionTypes.ORDER_REQUEST });
    await orderRequest(ingredientsList)
      .then((res) => res.json())
      .then((res) => {
        if (res.error && !res.success) {
          throw res.error;
        }
        dispatch({
          type: OrderActionTypes.ORDER_SUCCESS,
          payload: res as IResponseOrderApi,
        });
      })
      .catch((error) => {
        dispatch({
          type: OrderActionTypes.ORDER_ERROR,
          payload: error,
        });
      });
  };
