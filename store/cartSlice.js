import { createSlice } from "@reduxjs/toolkit";

export const initCartState = {
  cartItems: [],
  cartItemsQuantity: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initCartState,
  reducers: {
    addItemToCart(state, action) {
      const hasItemInCart = state.cartItems.find(
        (el) => el.item.id === action.payload.item.id
      )
        ? true
        : false;

      const existingCartItemIndex = state.cartItems.findIndex(
        (item) => item.item.id === action.payload.item.id
      );
      const existingCartItem = state.cartItems[existingCartItemIndex];
      if (!hasItemInCart) {
        state.cartItems = state.cartItems.concat({
          item: action.payload.item,
          quantity: action.payload.quantity,
        });
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      } else {
        state.cartItems[existingCartItemIndex] = {
          item: action.payload.item,
          quantity: existingCartItem.quantity + action.payload.quantity,
        };
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    removeItemFronCart(state, action) {
      const number = state.cartItems.findIndex(
        (el) => el.item.id === action.payload.id
      );

      state.cartItems.splice(number, 1);

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    setCartFromLocalStorage(state) {
      const localStorageEl = JSON.parse(localStorage.getItem("cartItems"));
      state.cartItems = localStorageEl;
    },
    setCartItemsAmount(state, action) {
      if (action.payload === null) {
        state.cartItemsQuantity = 0;
      } else {
        const quantity = JSON.parse(action.payload).reduce((acc, el) => {
          return el.quantity + acc;
        }, 0);
        state.cartItemsQuantity = quantity;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
