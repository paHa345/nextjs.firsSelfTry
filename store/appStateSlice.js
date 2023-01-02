import { createSlice } from "@reduxjs/toolkit";

export const initAppState = {
  currentType: "",
  showProducts: true,
  showItem: false,
  stickySection: false,
  loadFavouriteItems: false,
  addToFavouriteNotification: false,
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState: initAppState,
  reducers: {
    showItem(state) {
      state.showProducts = false;
      state.showItem = true;
    },
    hideItem(state) {
      state.showProducts = true;
      state.showItem = false;
    },
    setCurrentType(state, action) {
      state.currentType = action.payload;
    },
    setLoadFavouriteItemsStatus(state, action) {
      state.loadFavouriteItems = action.payload;
    },
    setAddToFavouriteNotification(state, action) {
      state.addToFavouriteNotification = action.payload;
    },
  },
});

export const appStateActions = appStateSlice.actions;
