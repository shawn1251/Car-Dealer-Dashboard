import { createSlice } from '@reduxjs/toolkit';

const salesSlice = createSlice({
  name: 'sales',
  initialState: {
    data: [], 
  },
  reducers: {
    setSales: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setSales } = salesSlice.actions;
export default salesSlice.reducer;