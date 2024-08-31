import {
  ingredientsReducer,
  loadIngredients,
  initialState
} from '../src/slice/IngredientsSlice';

describe('ingredientsSlice', () => {
  const ingredientsMock = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
    }
  ];

  it('тестирование изменения булевой переменной', () => {
    expect(ingredientsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  describe('получение ингредиентов', () => {
    it('тестирование состояния pending', () => {
      const action = { type: loadIngredients.pending.type };
      const state = ingredientsReducer(initialState, action);
      expect(state.orderRequest).toBe(true);
      expect(state.error).toBe(null);
    });

    it('тестирование состояния fulfilled', () => {
      const action = {
        type: loadIngredients.fulfilled.type,
        payload: ingredientsMock
      };
      const state = ingredientsReducer(initialState, action);
      expect(state.orderRequest).toBe(false);
      expect(state.ingredients).toEqual(ingredientsMock);
      expect(state.error).toBe(null);
    });

    it('тестирование состояния rejected', () => {
      const error = 'Ошибка: ингридиент не найден';
      const action = {
        type: loadIngredients.rejected.type,
        error: { message: error }
      };
      const state = ingredientsReducer(
        { ...initialState, orderRequest: true },
        action
      );
      expect(state.orderRequest).toBe(false);
      expect(state.error).toBe(error);
    });
  });
});
