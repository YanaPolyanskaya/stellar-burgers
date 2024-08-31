import {
  feedReducer,
  getFeedState,
  getFeedOrders,
  //getErrorFeed,
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
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      number: 123,
      ingredients: ['Булка', 'Начинка']
    }
  ];

  const feedMock = {
    orders: ordersMock,
    total: 12,
    totalToday: 2,
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
      expect(state.total).toBeNull();
      expect(state.totalToday).toBeNull();
    });

    it('тестирование состояния fulfilled', () => {
      const action = {
        type: loadFeed.fulfilled.type,
        payload: feedMock
      };
      const state = feedReducer(initialState, action);
      expect(state.orders).toEqual(ordersMock);
      expect(state.total).toBe(12);
      expect(state.totalToday).toBe(2);
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
  });
});
