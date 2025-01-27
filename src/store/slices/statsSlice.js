// store/slices/statsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userCount: 0,
  totalSales: 0,
  totalItems: 0,
};

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    setUserCount: (state, action) => {
      state.userCount = action.payload;
    },
    setTotalSales: (state, action) => {
      state.totalSales = action.payload;
    },
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
    },
  },
});

export const { setUserCount, setTotalSales, setTotalItems } = statsSlice.actions;
export default statsSlice.reducer;