import { createSlice } from '@reduxjs/toolkit';

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    data: [],
  },
  reducers: {
    setInventory: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setInventory } = inventorySlice.actions;
export default inventorySlice.reducer;