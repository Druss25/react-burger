import { TOrder } from '../services/reducers/socket/orders/types'
import { IUser } from './auth'

export interface IIngredients {
  _id: string
  name: string
  type: string
  proteins: number
  fat: number
  carbohydrates: number
  calories: number
  price: number
  image: string
  image_mobile: string
  image_large: string
  __v: number
  id?: string
}

export interface IResponseOrder {
  success: boolean
  name: string
  order: {
    number?: number
  }
  message: string
}

export interface IRelocatedBurger {
  from: number
  to: number
}

export interface IngredientsState {
  data: IIngredients[]
  isLoading: boolean
  hasError: boolean
}

export interface BurgerState {
  bun: IIngredients | null
  ingredients: IIngredients[]
}

export interface OrderState {
  data: IResponseOrder | null
  isLoading: boolean
  error: string | null
}

export interface ModalState {
  data: IIngredients | null
  isOpen: boolean
}

export interface AuthState {
  user: IUser | null
  isLoading: boolean
  isAuth: boolean
  isReset: boolean
  hasError: boolean
  message?: string | null
}

type TMessages = {
  orders: TOrder[]
  total: number
  totalToday: number
}
export interface ISocketMessage {
  messages: TMessages
  wsConnected: boolean
}

export interface RootStore {
  auth: AuthState
  ingredients: IngredientsState
  burger: BurgerState
  order: OrderState
  ingredientDetailModal: ModalState
  orders: ISocketMessage
  history: ISocketMessage
}
