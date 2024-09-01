import { error } from 'console';
import {
  feedReducer,
  getFeedState,
  getFeedOrders,
  loadFeed,
  initialState
} from '../src/slice/feedSlice';
import { TOrder } from '../src/utils/types';

describe('feedSlice', () => {
  const ordersMock: TOrder[] = [
    {
      _id: '1',
      status: 'готов',
      name: 'Бургер',
      createdAt: '2024-08-30T00:00:00.000Z',
      updatedAt: '2024-08-30T00:00:00.000Z',
      number: 123,
      ingredients: ['Булка', 'Начинка']
    }
  ];

  const feedMock = {
    orders: ordersMock,
    total: 11,
    totalToday: 3,
    error: null
  };

  it('тестирование начального состояния', () => {
    expect(feedReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('тестирование получения заказа', () => {
    it('тестирование состояния pending', () => {
      const action = { type: loadFeed.pending.type };
      const state = feedReducer(initialState, action);
      expect(state.orders).toEqual([]);
      expect(state.totalToday).toBeNull();
      expect(state.total).toBeNull();
      expect(state.error).toBeNull();
    });

    it('тестирование состояния fulfilled', () => {
      const action = {
        type: loadFeed.fulfilled.type,
        payload: feedMock
      };
      const state = feedReducer(initialState, action);
      expect(state.orders).toEqual(ordersMock);
      expect(state.total).toBe(11);
      expect(state.totalToday).toBe(3);
      expect(state.error).toBeNull();
    });

    it('тестирование состояния rejected', () => {
      const action = {
        type: loadFeed.rejected.type,
        error: { message: 'ошибка в получении заказа' }
      };
      const state = feedReducer(initialState, action);
      expect(state.orders).toEqual([]);
      expect(state.total).toBeNull();
      expect(state.totalToday).toBeNull();
      expect(state.error).toBe(null);
    });
  });

  describe('селекторы', () => {
    it('тестирование состояния feed', () => {
      const state = { feed: feedMock };
      expect(getFeedState(state)).toEqual(feedMock);
    });

    it('тестирование заказа', () => {
      const state = { feed: feedMock };
      expect(getFeedOrders(state)).toEqual(ordersMock);
    });
    it('тестирование ошибки', () => {
      const state = { feed: { ...feedMock, error: 'ошибка' } };
      expect(error(state)).toBe(undefined);
    });
  });
});
