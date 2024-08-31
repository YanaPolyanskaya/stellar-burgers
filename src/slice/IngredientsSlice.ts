import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface IIngredientsState {
  ingredients: TIngredient[];
  orderRequest: boolean;
  error?: string;
}

export const initialState: IIngredientsState = {
  ingredients: [],
  orderRequest: false
};

export const loadIngredients = createAsyncThunk(
  'burgerIngredients/loadIngredients',
  async () => getIngredientsApi()
);

const IngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState: initialState,
  reducers: {},
  selectors: {
    addAllIngredients: (state) => state.ingredients,
    getIsLoading: (state) => state.orderRequest,
    ingredientsError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(loadIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.orderRequest = false;
      })
      .addCase(loadIngredients.rejected, (state) => {
        state.orderRequest = false;
        state.error = 'Ошибка: ингридиент не найден';
      });
  }
});

export const ingredientsReducer = IngredientsSlice.reducer;
export const ingredientsSliceName = IngredientsSlice.name;
export const { addAllIngredients, getIsLoading, ingredientsError } =
  IngredientsSlice.selectors;
