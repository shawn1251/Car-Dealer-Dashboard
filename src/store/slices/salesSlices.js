import { createSlice } from '@reduxjs/toolkit';

const salesSlice = createSlice({
  name: 'sales',
  initialState: {
    data: [], 
    totalSales: 0, 
  },
  reducers: {
    setSales: (state, action) => {
      state.data = action.payload;
      state.totalSales = action.payload.reduce((total, sale) => total + sale.amount, 0);
    },
  },
});

export const { setSales } = salesSlice.actions;
export default salesSlice.reducer;