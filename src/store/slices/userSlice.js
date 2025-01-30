import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setUser } = usersSlice.actions;
export default usersSlice.reducer;