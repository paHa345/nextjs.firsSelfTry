import { createSlice } from "@reduxjs/toolkit";

export const initOrderState = {
  orders: [],
  cart: 0,
  clientSecret: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState: initOrderState,
  reducers: {
    addOrder(state, action) {
      state.orders = [];

      state.orders = action.payload;
    },
    setClientSecret(state, action) {
      state.clientSecret = action.payload;
    },
  },
});

export const orderActions = orderSlice.actions;
