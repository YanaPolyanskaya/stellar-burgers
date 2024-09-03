import { rootReducer, store } from '../src/services/store';

describe('тестирование rootReducer', () => {
  test('тестирование правльной настройки и работы rootReducer с undefined', () => {
    const before = store.getState();

    const after = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(after).toEqual(before);
  });
});