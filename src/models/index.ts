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
export interface IResponseIngredients {
  success: boolean
  data: IIngredients[]
}

export interface IResponseOrder {
  success: boolean
  name: string
  order: {
    number?: number
  }
  message: string
}

export interface IOwner {
  name: Readonly<string>
  email: Readonly<string>
  createdAt: Readonly<string>
  updatedAt: Readonly<string>
}
export interface IOrderResponse {
  success: Readonly<boolean>
  name: Readonly<string>
  order: {
    ingredients: ReadonlyArray<IIngredients>
    _id: Readonly<string>
    owner?: IOwner
    status: Readonly<string>
    name: Readonly<string>
    createdAt: Readonly<string>
    updatedAt: Readonly<string>
    number?: Readonly<number>
    price: Readonly<number>
  }
}

export interface IRelocatedBurger {
  from: number
  to: number
}

export interface IngredientsState {
  data: IIngredients[]
  isLoading: boolean
  hasError: boolean
  message?: string | null
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
export interface IOrder {
  _id: string
  ingredients: Array<string>
  status: string
  name: string
  createdAt: string
  updatedAt: string
  number: number
}

export interface wsMessageOrders {
  success?: boolean
  orders: Array<IOrder>
  total: number
  totalToday: number
}

export interface ISocketMessage {
  messages: wsMessageOrders
  wsConnected: boolean
}

export interface RootStore {
  auth: AuthState
  ingredients: IngredientsState
  burger: BurgerState
  order: OrderState
  orders: ISocketMessage
  history: ISocketMessage
}
