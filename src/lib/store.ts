import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "./features/CounterSlice";
import CartSliceReducer from "./features/CartSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: CounterReducer,
      Cart: CartSliceReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
