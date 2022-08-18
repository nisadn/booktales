import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Account = {
    username: string;
    role: string;
    token: string;
}

export interface AuthState {
  isLogin: boolean;
  account: Account;
}

const initialState: AuthState = {
  isLogin: false,
  account: {
    username: '',
    role: '',
    token: '',
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Account>) => {
      state.isLogin = true;
      state.account = action.payload;
    },
    logout: (state) => {
      state.isLogin = false;
      state.account = {
        username: '',
        role: '',
        token: '',
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer