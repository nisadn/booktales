import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwt_decode from "jwt-decode";

type Account = {
    username: string;
    role: string;
    token: string;
}

type Token = {
  exp: any;
  iss: string;
}

export interface AuthState {
  isLogin: boolean;
  account: Account;
  token: Token;
}

const initialState: AuthState = {
  isLogin: false,
  account: {
    username: '',
    role: '',
    token: '',
  },
  token: {
    exp: null,
    iss: '',
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Account>) => {
      state.isLogin = true;
      state.account = action.payload;
      state.token = jwt_decode(action.payload.token);
    },
    logout: (state) => {
      state.isLogin = false;
      state.account= {
        username: '',
        role: '',
        token: '',
      },
      state.token= {
        exp: null,
        iss: '',
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer