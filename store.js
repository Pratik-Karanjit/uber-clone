import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./slices/navSlice.js";

export const store = configureStore({
  reducer: {
    nav: navReducer,
  },
});
