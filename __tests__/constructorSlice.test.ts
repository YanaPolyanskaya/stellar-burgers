import {
  constructorReducer,
  addIngredient,
  deleteIngredient,
  changeIngredient,
  clearConstructor,
  initialState
} from '../src/slice/constructorSlice';

describe('constructorSlice', () => {
  const bunMock = {
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

  const ingredientMock = {
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
    const action = addIngredient(bunMock);
    const currentState = constructorReducer(initialState, action);
    expect(currentState).toEqual({
      ...initialState,
      bun: { ...bunMock, id: expect.any(String) }
    });
  });

  it('тестирование добавления ингредиента', () => {
    const action = addIngredient(ingredientMock);
    const currentState = constructorReducer(initialState, action);
    expect(currentState).toEqual({
      ...initialState,
      ingredients: [{ ...ingredientMock, id: expect.any(String) }]
    });
  });

  it('тестирование удаления ингредиента', () => {
    const state = {
      ...initialState,
      ingredients: [{ ...ingredientMock, id: '2' }]
    };
    const action = deleteIngredient('2');
    const currentState = constructorReducer(state, action);
    expect(currentState).toEqual(initialState);
  });

  it('тестирование изменения порядка ингредиентов в начинке', () => {
    const state = {
      ...initialState,
      ingredients: [
        { ...ingredientMock, id: '1', name: 'Ингредиент 1' },
        { ...ingredientMock, id: '2', name: 'Ингредиент 2' }
      ]
    };
    const action = changeIngredient({ initialIndex: 0, finishIndex: 1 });
    const currentState = constructorReducer(state, action);
    expect(currentState.ingredients).toEqual([
      { ...ingredientMock, id: '2', name: 'Ингредиент 2' },
      { ...ingredientMock, id: '1', name: 'Ингредиент 1' }
    ]);
  });

  it('тестирование очистки конструктора', () => {
    const state = {
      bun: { ...bunMock, id: '1' },
      ingredients: [{ ...ingredientMock, id: '1' }]
    };
    const action = clearConstructor();
    const currentState = constructorReducer(state, action);
    expect(currentState).toEqual(initialState);
  });
});
//