import { configureStore } from "@reduxjs/toolkit";
import CartSliceReducer from "./features/CartSlice";
import CheckoutSliceReducer from "./features/CheckoutSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      Cart: CartSliceReducer,
      Checkout: CheckoutSliceReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
