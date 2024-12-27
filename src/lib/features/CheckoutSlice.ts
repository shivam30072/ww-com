"use client";

import { checkoutStateTypes, productTypes } from "@/app/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";

const initialState: checkoutStateTypes = {
  products: [],
  totSum: 0,
};

// export const syncCartWithDb = createAsyncThunk(
//   "cart/syncCartWithDb",
//   async (cart: cartStateTypes, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("/api/cart", { cart });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Failed to sync cart");
//     }
//   }
// );

export const CheckoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    addToCheckout: (state, action: PayloadAction<productTypes>) => {
      const product = state.products.find((p) => p.id === action.payload.id);
      if (product) {
        product.quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      state.totSum += action.payload.finalPrice;
    },
    removeFromCheckout: (state, action: PayloadAction<string>) => {
      const productIndex = state.products.findIndex(
        (p) => p.id === action.payload
      );
      if (productIndex !== -1) {
        const product = state.products[productIndex];
        if (product.quantity > 1) {
          product.quantity -= 1;
          state.totSum -= product.finalPrice;
        } else {
          state.totSum -= product.finalPrice;
          state.products.splice(productIndex, 1);
        }
      }
    },
    calculateTotalSum: (state) => {
      state.totSum = state.products.reduce(
        (sum, product) => sum + product.finalPrice * product.quantity,
        0
      );
    },
    clearCheckout: (state) => {
      state.products = [];
      state.totSum = 0;
    },
  },
  //   extraReducers: (builder) => {
  //     builder.addCase(syncCartWithDb.fulfilled, (state, action) => {
  //       console.log("Cart synced successfully:", action.payload);
  //     });
  //     builder.addCase(syncCartWithDb.rejected, (state, action) => {
  //       console.error("Failed to sync cart:", action.payload);
  //     });
  //   },
});

export const {
  addToCheckout,
  removeFromCheckout,
  calculateTotalSum,
  clearCheckout,
} = CheckoutSlice.actions;
export default CheckoutSlice.reducer;
