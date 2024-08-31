import { rootReducer, store } from '../src/services/store';

describe('тестирование rootReducer', () => {
  test('тестирование rootReducer', () => {
    const before = store.getState();

    const after = rootReducer(undefined, { type: 'undefined' });

    expect(after).toEqual(before);
  });
});
