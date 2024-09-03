import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface IOrdersState {
  orders: TOrder[];
  error: string | null;
}

export const initialState: IOrdersState = {
  orders: [],
  error: null
};

export const loadUserOrders = createAsyncThunk(
  'orders/loadUserOrders',
  async () => getOrdersApi()
);

const userOrdersSlice = createSlice({
  name: 'orders',
  initialState: initialState,
  reducers: {},
  selectors: {
    getUserOrders: (state) => state.orders,
    error: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserOrders.pending, (state) => {
        state.error = null;
      })
      .addCase(loadUserOrders.rejected, (state) => {
        state.error = 'ошибка при получении заказов';
      })
      .addCase(loadUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  }
});

export const ordersReducer = userOrdersSlice.reducer;
export const ordersSliceName = userOrdersSlice.name;
export const { getUserOrders, error } = userOrdersSlice.selectors;
