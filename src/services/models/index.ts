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
  data: any;
  isLoading: boolean;
  error: string | null;
}

export interface StateStoreType {
  ingredients: IngredientsState;
  burger: BurgerState;
  order: OrderState;
}
