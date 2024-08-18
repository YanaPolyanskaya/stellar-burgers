import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

interface IConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: IConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructorSlice',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (
        state: IConstructorState,
        action: PayloadAction<TConstructorIngredient>
      ) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    deleteIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    clearConstructor: (state) => {
      state.ingredients = [];
      state.bun = null;
    },
    changeIngredient: (state, action) => {
      const element = state.ingredients[action.payload.initialIndex];
      state.ingredients[action.payload.initialIndex] =
        state.ingredients[action.payload.finishIndex];
      state.ingredients[action.payload.finishIndex] = element;
    }
  },
  selectors: {
    getIngredientsConstructor: (state) => state
  }
});

export const constructorReducer = constructorSlice.reducer;
export const constructorSliceName = constructorSlice.name;
export const {
  addIngredient,
  deleteIngredient,
  clearConstructor,
  changeIngredient
} = constructorSlice.actions;
export const { getIngredientsConstructor } = constructorSlice.selectors;
