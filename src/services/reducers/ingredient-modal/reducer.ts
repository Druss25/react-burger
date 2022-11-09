import { ModalState } from '../../../models'
import { ModalAction, ModalActionTypes } from './actions'

const initialState: ModalState = {
  data: null,
  isOpen: false,
}

export const ingredientModalReducer = (state = initialState, action: ModalAction): ModalState => {
  switch (action.type) {
    case ModalActionTypes.MODAL_SET:
      return {
        ...state,
        data: action.payload.data,
        isOpen: action.payload.isOpen,
      }
    case ModalActionTypes.MODAL_RESET:
      return initialState
    default:
      return state
  }
}
