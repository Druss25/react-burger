import { combineReducers } from "@reduxjs/toolkit";
import { burgerReducer } from "../burger/reducer";
import { ingredientsReducer } from "../ingredients/reducer";
import { orderReducer } from "../order/reducer";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burger: burgerReducer,
  order: orderReducer,
  // modal: modalReducer
});

export default rootReducer;
