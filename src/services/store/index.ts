import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { burgerReducer } from "../reducers/burger";
import { ingredientsReducer } from "../reducers/ingredients";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burger: burgerReducer,
    // order: orderReducer,
    // modal: modalReducer
  },
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
