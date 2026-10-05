"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showMessage: false,
};

// function reducer(reducerState, action) {
//   if (action.type === "on") {
//     return { showMessage: true };
//   }
//   if (action.type === "off") {
//     return { showMessage: false };
//   }
//   return reducerState;
// }

const taskUiSlice = createSlice({
  name: "taskUi",
  initialState,
  reducers: {
    on: (state) => {
      state.showMessage = true;
    },
    off: (state) => {
      state.showMessage = false;
    },
  },
});

export const { on, off } = taskUiSlice.actions;

export default taskUiSlice.reducer;
