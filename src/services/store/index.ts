import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducer from "./rootReducer";

export const store = configureStore({
  reducer,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
