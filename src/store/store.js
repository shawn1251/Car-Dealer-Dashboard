import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import statsReducer from './slices/statsSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    stats: statsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});