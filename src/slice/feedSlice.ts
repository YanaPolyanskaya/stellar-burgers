import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface IFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
}

export const initialState: IFeedState = {
  orders: [],
  total: 0,
  totalToday: 0
};

export const loadFeed = createAsyncThunk('feed/loadFeed', async () =>
  getFeedsApi()
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState: initialState,
  reducers: {},
  selectors: {
    getFeedState: (state) => state,
    getFeedOrders: (state) => state.orders,
    getFeedTotal: (state) => state.total,
    getFeedTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder.addCase(loadFeed.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
  }
});

export const feedReducer = feedSlice.reducer;
export const { getFeedState, getFeedOrders, getFeedTotal, getFeedTotalToday } =
  feedSlice.selectors;
export const feedSliceName = feedSlice.name;
