import { createSlice } from "@reduxjs/toolkit";
import { TUser } from "../app/types";
import { usersApi } from "../app/services/users-api";
import { RootState } from "../app/store";

type TInitialUser = TUser | null;

interface IInitState {
  user: TInitialUser;
  isAuth: boolean;
  users: TInitialUser[] | [];
  current: TInitialUser | null;
  accessToken?: string;
}

const initialState: IInitState = {
  user: null,
  isAuth: false,
  users: [],
  current: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
    resetUser: state => {
      state.user = null;
    },
    setToken: (state, action) => {
      state.accessToken = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addMatcher(usersApi.endpoints.login.matchFulfilled, (state, action) => {
        // state.user = action.payload;
        state.accessToken = action.payload.accessToken;
        state.isAuth = true;
      })
      .addMatcher(
        usersApi.endpoints.current.matchFulfilled,
        (state, action) => {
          state.current = action.payload;
          state.isAuth = true;
        },
      )
      .addMatcher(
        usersApi.endpoints.getById.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
        },
      );
  },
});

export const { logout, resetUser, setToken } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectCurrent= (state: RootState) => state.auth.current;
export const selectAuth = (state: RootState) => state.auth.isAuth;

export default authSlice.reducer;
