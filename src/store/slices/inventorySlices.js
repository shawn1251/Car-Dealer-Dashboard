// store/slices/inventorySlice.js
import { createSlice } from '@reduxjs/toolkit';

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    data: [],
    totalItems: 0, 
  },
  reducers: {
    setInventory: (state, action) => {
      state.data = action.payload;
      state.totalItems = action.payload.reduce((total, item) => total + item.quantity, 0);
    },
  },
});

export const { setInventory } = inventorySlice.actions;
export default inventorySlice.reducer;