import { Dispatch } from "redux";
import { baseUrl } from "../../utils/constants";

export enum OrderActionTypes {
  ORDER_REQUEST = "ORDER_REQUEST",
  ORDER_SUCCESS = "ORDER_SUCCESS",
  ORDER_FAILED = "ORDER_FAILED",
  ORDER_RESET = "ORDER_RESET",
}

interface getOrderAction {
  type: OrderActionTypes.ORDER_REQUEST;
}

interface getOrderSuccess {
  type: OrderActionTypes.ORDER_SUCCESS;
  payload: responseApi;
}

interface getOrderFailed {
  type: OrderActionTypes.ORDER_FAILED;
}

interface OrderReset {
  type: OrderActionTypes.ORDER_RESET;
}

export type OrderAction =
  | getOrderAction
  | getOrderSuccess
  | getOrderFailed
  | OrderReset;


  interface responseApi {
  success: boolean;
  name: string;
  order: {
    namber: number;
  };
}

export const getOrder = (requestData: any) => {
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
      const results: responseApi = await res?.json();
      dispatch({
        type: OrderActionTypes.ORDER_SUCCESS,
        payload: results,
      });
    } else {
      dispatch({
        type: OrderActionTypes.ORDER_FAILED,
        payload: "Ошибка в получение данных с сервера",
      });
    }
  };
};
