import {
  fetchGetUser,
  authUserReducer,
  loginUser,
  registerUser,
  updateUser,
  logoutUser,
  userAuth,
  initialState
} from '../src/slice/authSlice';
import { TUser } from '../src/utils/types';

jest.mock('../../utils/cookie', () => ({
  deleteCookie: jest.fn(),
  setCookie: jest.fn(),
  getCookie: jest.fn()
}));

const storageMock = (function () {
  let store: { [key: string]: string } = {};

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(global, 'storage', { value: storageMock });

describe('authSlice', () => {
  const userMock: TUser = {
    email: 'yanochka.p.a@mail.ru',
    name: 'test'
  };

  it('тестирование начального состояния', () => {
    expect(authUserReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  describe('вход в личный кабинет', () => {
    it('тестирование сочтояния pending', () => {
      const action = { type: loginUser.pending.type };
      const state = authUserReducer(initialState, action);
      expect(state.requestLoginUser).toBe(true);
      expect(state.loginError).toBeNull();
    });

    it('тестирование состояния fulfilled', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: userMock
      };
      const state = authUserReducer(initialState, action);
      expect(state.requestLoginUser).toBe(false);
      expect(state.userData).toEqual(userMock);
      expect(state.isAuthChecked).toBe(true);
      expect(state.loginError).toBeNull();
    });

    it('тестирование состояния rejected', () => {
      const action = {
        type: loginUser.rejected.type,
        error: { message: 'Ошибка в получении доступа к личному кабинету' }
      };
      const state = authUserReducer(
        { ...initialState, requestLoginUser: true },
        action
      );
      expect(state.requestLoginUser).toBe(false);
      expect(state.loginError).toBe(
        'Ошибка в регистристрации пользователя'
      );
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('регистрация пользователя', () => {
    it('тестирование состояния pending', () => {
      const action = { type: registerUser.pending.type };
      const state = authUserReducer(initialState, action);
      expect(state.requestLoginUser).toBe(true);
      expect(state.registerError).toBeNull();
    });

    it('тестирование состояния fulfilled', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: userMock
      };
      const state = authUserReducer(initialState, action);
      expect(state.requestLoginUser).toBe(false);
      expect(state.userData).toEqual(userMock);
      expect(state.registerError).toBeNull();
    });

    it('тестирование состояния rejected', () => {
      const action = {
        type: registerUser.rejected.type,
        error: { message: 'Ошибка в регистристрации пользователя' }
      };
      const state = authUserReducer(
        { ...initialState, requestLoginUser: true },
        action
      );
      expect(state.requestLoginUser).toBe(false);
      expect(state.registerError).toBe(
        'Ошибка в регистристрации пользователя'
      );
    });
  });

  describe('выход из личного кабинета', () => {
    it('тестирование состояния pending', () => {
      const action = { type: logoutUser.pending.type };
      const state = authUserReducer(
        { ...initialState, userData: userMock, isAuthChecked: true },
        action
      );
      expect(state.requestLoginUser).toBe(true);
    });

    it('тестирование состояния fulfilled', () => {
      const action = { type: logoutUser.fulfilled.type };
      const state = authUserReducer(
        {
          ...initialState,
          userData: userMock,
          isAuthChecked: true,
          requestLoginUser: true
        },
        action
      );
      expect(state.requestLoginUser).toBe(false);
      expect(state.userData).toBeNull();
      expect(localStorage.clear).toHaveBeenCalled();
    });

    it('тестирование состояния rejected', () => {
      const action = {
        type: logoutUser.rejected.type,
      };
      const state = authUserReducer(
        { ...initialState, requestLoginUser: true },
        action
      );
      expect(state.requestLoginUser).toBe(false);
    });
  });

  describe('смена пользователя', () => {
    it('тестирование состояния pending', () => {
      const action = { type: updateUser.pending.type };
      const state = authUserReducer(
        { ...initialState, userData: userMock },
        action
      );
      expect(state.requestLoginUser).toBe(true);
      expect(state.userData).toBeNull();
      expect(state.updateError).toBeNull();
    });

    it('тестирование состояния fulfilled', () => {
      const updatedUser = { ...userMock, name: 'новый пользователь' };
      const action = {
        type: updateUser.fulfilled.type,
        payload: { user: updatedUser }
      };
      const state = authUserReducer(initialState, action);
      expect(state.requestLoginUser).toBe(false);
      expect(state.userData).toEqual(updatedUser);
      expect(state.updateError).toBeNull();
    });

    it('тестирование состояния rejected', () => {
      const action = {
        type: updateUser.rejected.type,
      };
      const state = authUserReducer(
        { ...initialState, requestLoginUser: true },
        action
      );
      expect(state.requestLoginUser).toBe(false);
    });
  });

  describe('авторизация пользователя', () => {
    it('тестирование состояния pending', () => {
      const action = { type: userAuth.pending.type };
      const state = authUserReducer(initialState, action);
      expect(state.loginError).toBeNull();
      expect(state.registerError).toBeNull();
    });

    it('тестирование состояния fulfilled', () => {
      const action = {
        type: fetchGetUser.fulfilled.type,
        payload: { user: userMock }
      };
      const state = authUserReducer(initialState, action);
      expect(state.userData).toEqual(userMock);
    });
  });

  describe('данные пользователя', () => {
    it('тестирование состояния fulfilled', () => {
      const action = {
        type: fetchGetUser.fulfilled.type,
        payload: { user: userMock }
      };
      const state = authUserReducer(initialState, action);
      expect(state.userData).toEqual(userMock);
    });
  });
});
