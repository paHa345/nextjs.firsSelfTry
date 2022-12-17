import { createSlice } from "@reduxjs/toolkit";

export const initAppState = {
  currentType: "",
  showProducts: true,
  showItem: false,
  stickySection: false,
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
  },
});

export const appStateActions = appStateSlice.actions;
