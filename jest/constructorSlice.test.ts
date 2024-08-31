import {
  constructorReducer,
  addIngredient,
  deleteIngredient,
  changeIngredient,
  clearConstructor,
  initialState
} from '../src/slice/constructorSlice';

describe('constructorSlice', () => {
  const mockBun = {
    _id: '1',
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
  };

  const mockIngredient = {
    _id: '2',
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
  };
  //?
  it('тестирование добавления булки', () => {
    const action = addIngredient(mockBun);
    const actualState = constructorReducer(initialState, action);
    expect(actualState).toEqual({
      ...initialState,
      bun: { ...mockBun, id: expect.any(String) }
    });
  });

  it('тестирование добавления ингредиента', () => {
    const action = addIngredient(mockIngredient);
    const actualState = constructorReducer(initialState, action);
    expect(actualState).toEqual({
      ...initialState,
      ingredients: [{ ...mockIngredient, id: expect.any(String) }]
    });
  });

  it('тестирование удаления ингредиента', () => {
    const state = {
      ...initialState,
      ingredients: [{ ...mockIngredient, id: '2' }]
    };
    const action = deleteIngredient('2');
    const actualState = constructorReducer(state, action);
    expect(actualState).toEqual(initialState);
  });

  it('тестирование изменения порядка ингредиентов в начинке', () => {
    const state = {
      ...initialState,
      ingredients: [
        { ...mockIngredient, id: '1', name: 'Ингредиент 1' },
        { ...mockIngredient, id: '2', name: 'Ингредиент 2' }
      ]
    };
    const action = changeIngredient({ initialIndex: 0, finishIndex: 1 });
    const actualState = constructorReducer(state, action);
    expect(actualState.ingredients).toEqual([
      { ...mockIngredient, id: '2', name: 'Ингредиент 2' },
      { ...mockIngredient, id: '1', name: 'Ингредиент 1' }
    ]);
  });

  it('тестирование очистки конструктора', () => {
    const state = {
      bun: { ...mockBun, id: '1' },
      ingredients: [{ ...mockIngredient, id: '1' }]
    };
    const action = clearConstructor();
    const actualState = constructorReducer(state, action);
    expect(actualState).toEqual(initialState);
  });
});
