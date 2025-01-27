// store/slices/usersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    userCount: 0,
  },
  reducers: {
    setUsers: (state, action) => {
      state.data = action.payload;
      state.userCount = action.payload.length;
    },
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;