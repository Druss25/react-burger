import { combineReducers } from "@reduxjs/toolkit";
import { burgerReducer } from "../reducers/burger/reducer";
import { ingredientModalReducer } from "../reducers/ingredient-modal/reducer";
import { ingredientsReducer } from "../reducers/ingredients/reducer";
import { orderReducer } from "../reducers/order/reducer";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burger: burgerReducer,
  order: orderReducer,
  modal: ingredientModalReducer,
});

export default rootReducer;
