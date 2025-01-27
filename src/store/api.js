import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from 'config';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users/all',
    }),
    getSales: builder.query({
      query: () => '/sales/all',
    }),
    getInventory: builder.query({
      query: () => '/inventory/vehicles',
    }),
  }),
});

export const { useGetUsersQuery, useGetSalesQuery, useGetInventoryQuery } = api;