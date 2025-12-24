import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: JSON.parse(localStorage.getItem("darkMode")) || false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      // localStorage.setItem("darkMode", state.darkMode);
    },
  },
});

export const { toggleDarkMode } = uiSlice.actions;

export default uiSlice.reducer;
