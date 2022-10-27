import { combineReducers } from "@reduxjs/toolkit";
import { burgerReducer } from "../reducers/burger";
import { ingredientsReducer } from "../ingredients/reducer";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burger: burgerReducer,
  // order: orderReducer,
  // modal: modalReducer
});

export default rootReducer
