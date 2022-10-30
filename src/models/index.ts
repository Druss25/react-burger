export interface IIngredients {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  id?: string;
}

export interface IResponseOrderApi {
  success: boolean;
  name: string;
  order: {
    number?: number;
  };
}

export interface IRelocatedBurger {
  from: number;
  to: number;
}

export interface IngredientsState {
  data: IIngredients[];
  isLoading: boolean;
  hasError: boolean;
}

export interface BurgerState {
  bun: IIngredients | null;
  ingredients: IIngredients[];
}

export interface OrderState {
  data: IResponseOrderApi | null;
  isLoading: boolean;
  error: string | null;
}

export interface ModalState {
  data: IIngredients | null;
}

export interface RootStore {
  ingredients: IngredientsState;
  burger: BurgerState;
  order: OrderState;
  ingradientModal: ModalState;
}
