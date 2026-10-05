"use client";

import { configureStore } from "@reduxjs/toolkit";
import taskUiReducer from "@/app/store/TaskUISlice";

export const store = configureStore({
  reducer: {
    taskUi: taskUiReducer,
  },
});
