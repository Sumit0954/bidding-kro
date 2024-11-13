import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "./tabSlice";

const store = configureStore({
  reducer: {
    tab: tabReducer, // add the tab slice
  },
});

export default store;
