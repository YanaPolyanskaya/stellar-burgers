import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  ingredientsReducer,
  ingredientsSliceName
} from '../slice/IngredientsSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { useState, ChangeEvent } from 'react';
import {
  constructorReducer,
  constructorSliceName
} from '../slice/constructorSlice';
import { feedReducer, feedSliceName } from '../slice/feedSlice';
import { orderSliceName, orderReducer } from '../slice/orderSlice';
import { authUserReducer, authUserSliceName } from '../slice/authSlice';
import { ordersReducer, ordersSliceName } from '../slice/ordersSlice';

export const rootReducer = combineReducers({
  [ingredientsSliceName]: ingredientsReducer,
  [constructorSliceName]: constructorReducer,
  [feedSliceName]: feedReducer,
  [orderSliceName]: orderReducer,
  [authUserSliceName]: authUserReducer,
  [ordersSliceName]: ordersReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
