import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import userReducer from  './slices/userSlice';
import inventoryReducer from './slices/inventorySlice';
import salesReducer from './slices/salesSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    users: userReducer,
    inventory: inventoryReducer,
    sales: salesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});