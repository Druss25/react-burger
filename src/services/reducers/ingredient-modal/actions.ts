import { ModalState } from '../../../models'

export const name = 'ingradientDetailModal'

export enum ModalActionTypes {
  MODAL_SET = 'MODAL_SET',
  MODAL_RESET = 'MODAL_RESET',
}

interface setModalAction {
  type: ModalActionTypes.MODAL_SET
  payload: ModalState
}

interface resetModal {
  type: ModalActionTypes.MODAL_RESET
}

export type ModalAction = setModalAction | resetModal
