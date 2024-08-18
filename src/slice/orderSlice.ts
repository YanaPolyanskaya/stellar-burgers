import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const loadOrderByNumber = createAsyncThunk(
  'order/loadByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ids: string[]) => orderBurgerApi(ids)
);

type IOrderState = {
  order: TOrder | null;
  isLoading: boolean;
};

const initialState: IOrderState = {
  order: null,
  isLoading: false
};

const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  selectors: {
    getOrder: (state) => state.order,
    isLoading: (state) => state.isLoading
  },
  reducers: {
    clearOrder: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOrderByNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadOrderByNumber.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
        state.isLoading = false;
      })
      .addCase(loadOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.isLoading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
export const orderSliceName = orderSlice.name;
export const { getOrder, isLoading } = orderSlice.selectors;
