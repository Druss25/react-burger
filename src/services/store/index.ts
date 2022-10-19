import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { ingredientsReducer } from "../reducers/ingredients";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
  },
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
