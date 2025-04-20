import { createListenerMiddleware } from "@reduxjs/toolkit";
import { usersApi } from "../app/services/users-api";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: usersApi.endpoints.login.matchFulfilled,
  effect: async (action, listtenerApi) => {
    listtenerApi.cancelActiveListeners();

    const token = action.payload.accessToken;

    if (token) {
      localStorage.setItem("token", token);
    }
  },
});
