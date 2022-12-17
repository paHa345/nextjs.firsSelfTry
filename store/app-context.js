import React from "react";

const AppContext = React.createContext({
  cartItems: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  currentItems: [],
  showProducts: true,
  showItem: false,
  showItemHandler: (item) => {},
  hideItemHandler: (item) => {},
  productsByType: [],
  item: {},
  currentType: "",
  setCurrentItem: (item) => {},
  stickySection: false,
  setStickyHandler: () => {},
  setCartFromLocalStorage: () => {},
});

export default AppContext;
