export interface BurgerState {
  items: IIngredients[];
  itemsRequest: boolean;
  itemsFailed: boolean;
}

export interface IngredientsState {
  data: IIngredients[];
  isLoading: boolean;
  hasError: boolean;
}

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

export interface StateStoreType {
  ingredients: IngredientsState;
  burger: BurgerState;
}
