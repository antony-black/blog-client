import { createSlice } from "@reduxjs/toolkit";
import { TUser } from "../app/types";
import { usersApi } from "../app/services/users-api";
import { RootState } from "../app/store";

type TInitialUser = (TUser & { accessToken: string }) | null;

interface IInitState {
  user: TInitialUser;

  isAuth: boolean;
}

const initialState: IInitState = {
  user: null,
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addMatcher(usersApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
      })
      .addMatcher(
        usersApi.endpoints.registration.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
          // state.isAuth = true;
        },
      )
      .addMatcher(
        usersApi.endpoints.current.matchFulfilled,
        (state, action) => {
          const accessToken = state.user?.accessToken || "";
          state.user = { ...action.payload, accessToken };
          state.isAuth = true;
        },
      );
  },
});

export const { logout } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectAuth = (state: RootState) => state.auth.isAuth;

export default authSlice.reducer;
