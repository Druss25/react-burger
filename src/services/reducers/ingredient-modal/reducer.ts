import { ModalState } from "../../../models";
import { ModalAction, ModalActionTypes } from "./actions";

const initialState: ModalState = {
  data: null,
};

export const ingredientModalReducer = (
  state = initialState,
  action: ModalAction
): ModalState => {
  switch (action.type) {
    case ModalActionTypes.MODAL_SET:
      return {
        ...state,
        data: action.payload,
      };
    case ModalActionTypes.MODAL_RESET:
      return initialState;
    default:
      return state;
  }
};
