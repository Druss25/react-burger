import { combineReducers } from "redux";
import { burgerReducer } from "../reducers/burger/reducer";
import { ingredientModalReducer } from "../reducers/ingredient-modal/reducer";
import { ingredientsReducer } from "../reducers/ingredients/reducer";
import { orderReducer } from "../reducers/order/reducer";
import { authReducer } from "../reducers/auth/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  ingredients: ingredientsReducer,
  burger: burgerReducer,
  order: orderReducer,
  ingradientDetailModal: ingredientModalReducer,
});

export default rootReducer;
