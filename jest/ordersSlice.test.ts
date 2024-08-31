import {
  ordersReducer,
  loadUserOrders
} from '../src/slice/ordersSlice';
import { TOrder } from '../src/utils/types';
describe('loadUserOrders', () => {
  const initialState = {
    orders: [] as TOrder[],
    isLoading: false,
  };
})
describe('loadUserOrders', () => {
  const initialState = {
    orders: [] as TOrder[],
    isLoading: false,
  };

  const ordersMock: TOrder[] = [
    {
      _id: '1',
      status: 'completed',
      name: 'Order 1',
      createdAt: '2024-08-30T00:00:00.000Z',
      updatedAt: '2024-08-30T00:00:00.000Z',
      number: 1,
      ingredients: []
    },
    {
      _id: '2',
      status: 'pending',
      name: 'Order 2',
      createdAt: '2024-08-30T00:00:00.000Z',
      updatedAt: '2024-08-30T00:00:00.000Z',
      number: 2,
      ingredients: []
    }
  ];

  it('тестирование начального состояния', () => {
    expect(ordersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('тестирование получения заказа', () => {
    it('тестирование состояния pending', () => {
      const action = { type: loadUserOrders.pending.type };
      const state = ordersReducer(initialState, action);
      expect(state.orders).toEqual([]);
      expect(state.isLoading).toBe(false);
    });

    it('тестирование состояния fulfilled', () => {
      const action = {
        type: loadUserOrders.fulfilled.type,
        payload: ordersMock
      };
      const state = ordersReducer(initialState, action);
      expect(state.orders).toEqual(ordersMock);
    });

    it('тестирование состояния rejected', () => {
      const action = {
        type: loadUserOrders.rejected.type,
        error: { message: 'ошибка в получении истории заказов' }
      };
      const state = ordersReducer(initialState, action);
      expect(state.orders).toEqual([]);
    });
  });
  
  describe('селекторы', () => {
    it('тестирование заказов', () => {
      const state = { userOrders: { orders: ordersMock, error: null } };
    });
  });
});