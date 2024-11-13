import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: 0, // default to first tab
};

const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

// Export the action to be used in components
export const { setActiveTab } = tabSlice.actions;

// Export the reducer to be added to the store
export default tabSlice.reducer;
