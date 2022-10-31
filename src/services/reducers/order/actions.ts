import { Dispatch } from "redux";
import { IResponseOrderApi } from "../../../models";
import { requestFetch } from "../../../utils/httpReguest";

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
  (requestData: string[]) => (dispatch: Dispatch<OrderAction>) => {
    dispatch({
      type: OrderActionTypes.ORDER_REQUEST,
    });
    requestFetch("/orders", "POST", { ingredients: requestData })
      .then((data: IResponseOrderApi) => {
        dispatch({
          type: OrderActionTypes.ORDER_SUCCESS,
          payload: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: OrderActionTypes.ORDER_ERROR,
          payload: err,
        });
      });
  };
