import {
  orderReducer as reducer,
  clearOrder,
  createOrder,
  loadOrderByNumber
} from '../src/slice/orderSlice';
import { TOrder } from '../src/utils/types';

describe('orderSlice', () => {
  const initialState = {
    order: null as TOrder | null,
    isLoading: false
  };

  const orderMock: TOrder = {
    _id: '1',
    status: 'готов',
    name: 'Бургер',
    createdAt: '2024-08-30T00:00:00.000Z',
    updatedAt: '2024-08-30T00:00:00.000Z',
    number: 123,
    ingredients: ['Булка', 'Начинка']
  };

  it('тестирование начального состояния', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('тестирование очистки заказа', () => {
    it('очистка заказа', () => {
      const state = {
        ...initialState,
        order: orderMock
      };
      const action = clearOrder();
      const newState = reducer(state, action);
      expect(newState.order).toBe(null);
    });
  });

  describe('тестирование деталей заказа', () => {
    it('тестирование состояния pending', () => {
      const action = { type: loadOrderByNumber.pending.type };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(true);
    });

    it('тестирование состояния fulfilled', () => {
      const action = {
        type: loadOrderByNumber.fulfilled.type,
        payload: { orders: [orderMock] }
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.order).toEqual(orderMock);
    });

    it('тестирование состояния rejected', () => {
      const action = {
        type: loadOrderByNumber.rejected.type,
        error: { message: 'ошибка в получении данных заказа' }
      };
      const state = reducer({ ...initialState, isLoading: true }, action);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('тестирование создания заказа', () => {
    it('тестирование состояния pending', () => {
      const action = { type: createOrder.pending.type };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(true);
    });

    it('тестирование состояния fulfilled', () => {
      const action = {
        type: createOrder.fulfilled.type,
        payload: { order: orderMock }
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.order).toEqual(orderMock);
    });

    it('тестирование состояния rejected', () => {
      const action = {
        type: createOrder.rejected.type,
        error: { message: 'ошибка в создании заказа' }
      };
      const state = reducer({ ...initialState, isLoading: true }, action);
      expect(state.isLoading).toBe(false);
    });
  });
});
