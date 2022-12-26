import { configureStore } from "@reduxjs/toolkit";
import { itemSlice } from "./itemSlice";

import { cartSlice } from "./cartSlice";
import { appStateSlice } from "./appStateSlice";
import { orderSlice } from "./orderSlice";

const store = configureStore({
  reducer: {
    item: itemSlice.reducer,
    cart: cartSlice.reducer,
    appState: appStateSlice.reducer,
    order: orderSlice.reducer,
  },
});

export default store;

// const ItemReducer = (state = initState, action) => {
//   if (action.type === "increment") {
//     return { counter: state.counter + 1, showCounter: state.showCounter };
//   }
//   if (action.type === "decrement") {
//     return { counter: state.counter - 1, showCounter: state.showCounter };
//   }
//   if (action.type === "show") {
//     return { counter: state.counter, showCounter: !state.showCounter };
//   }
//   return state;
// };
