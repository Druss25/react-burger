import { Dispatch } from "redux";
import { baseUrl } from "../../../utils/constants";
import { IResponseOrderApi } from "../../../models";

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

export const getOrder = (requestData: []) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    dispatch({
      type: OrderActionTypes.ORDER_REQUEST,
    });

    const res = await fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ ingredients: requestData }),
    });

    if (res.ok && res.status === 200) {
      const results: IResponseOrderApi = await res?.json();
      dispatch({
        type: OrderActionTypes.ORDER_SUCCESS,
        payload: results,
      });
    } else {
      dispatch({
        type: OrderActionTypes.ORDER_ERROR,
        payload: "Ошибка в получение данных с сервера",
      });
    }
  };
};
