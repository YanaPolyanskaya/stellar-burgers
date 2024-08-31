import {
  TLoginData,
  TRegisterData,
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';

export const fetchGetUser = createAsyncThunk('authUser/fetchGetUser', (async) =>
  getUserApi()
);

export const userAuth = createAsyncThunk(
  'authUser/userAuth',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(fetchGetUser()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

export const loginUser = createAsyncThunk(
  'authUser/loginUser',
  async (loginData: TLoginData, { rejectWithValue }) => {
    const response = await loginUserApi(loginData);
    if (!response?.success) {
      return rejectWithValue(response);
    }
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const registerUser = createAsyncThunk(
  'authUser/registerUser',
  async (userData: TRegisterData, { rejectWithValue }) => {
    const response = await registerUserApi(userData);

    if (!response?.success) {
      return rejectWithValue(response);
    }
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const updateUser = createAsyncThunk(
  'authUser/updateUser',
  async (user: TRegisterData, { rejectWithValue }) => {
    const response = await updateUserApi(user);

    if (!response.success) {
      return rejectWithValue(null);
    }
    return response;
  }
);

export const logoutUser = createAsyncThunk(
  'authUser/logoutUser',
  async (_, { rejectWithValue }) => {
    const response = await logoutApi();

    if (!response.success) {
      return rejectWithValue(null);
    }

    return response;
  }
);

export const forgotPassword = createAsyncThunk(
  'authUser/forgotPassword',
  async (data: { email: string }) => forgotPasswordApi(data)
);

export const resetPassword = createAsyncThunk(
  'authUser/resetPassword',
  async (data: { password: string; token: string }) => resetPasswordApi(data)
);

interface IAuthUserState {
  userData: TUser | null;
  isAuthChecked: boolean;
  requestLoginUser: boolean;
  registerError?: string;
  loginError?: string;
  updateError?: string;
}

export const initialState: IAuthUserState = {
  userData: null,
  isAuthChecked: false,
  requestLoginUser: false
};

const authSlice = createSlice({
  name: 'authUser',
  initialState: initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  selectors: {
    authUserData: (state) => state.userData,
    authUserChecked: (state) => state.isAuthChecked,
    authRequestLoginUser: (state) => state.requestLoginUser,
    authRegisterError: (state) => state.registerError,
    authLoginError: (state) => state.loginError,
    authUpdateError: (state) => state.updateError
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.requestLoginUser = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isAuthChecked = true;
        state.requestLoginUser = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isAuthChecked = true;
        state.loginError = 'Ошибка в получении доступа к личному кабинету';
        state.requestLoginUser = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.requestLoginUser = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.requestLoginUser = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.registerError = 'Ошибка в регистристрации пользователя';
        state.requestLoginUser = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.requestLoginUser = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.requestLoginUser = false;
        state.userData = null;
        localStorage.clear();
        deleteCookie('accessToken');
      })
      .addCase(logoutUser.rejected, (state) => {
        state.requestLoginUser = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.requestLoginUser = true;
        state.userData = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.requestLoginUser = false;
        state.userData = action.payload.user;
      })
      .addCase(updateUser.rejected, (state) => {
        state.requestLoginUser = false;
        state.updateError = 'Ошибка в обновлении данных';
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
      });
  }
});

export const authUserReducer = authSlice.reducer;
export const {
  authUserData,
  authUserChecked,
  authRequestLoginUser,
  authRegisterError,
  authLoginError,
  authUpdateError
} = authSlice.selectors;
export const { authChecked } = authSlice.actions;
export const authUserSliceName = authSlice.name;
