import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface IOrdersState {
  orders: TOrder[];
  isLoading: boolean;
}

export const initialState: IOrdersState = {
  orders: [],
  isLoading: false
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
    isLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUserOrders.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(loadUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      });
  }
});

export const ordersReducer = userOrdersSlice.reducer;
export const ordersSliceName = userOrdersSlice.name;
export const { getUserOrders, isLoading } = userOrdersSlice.selectors;
