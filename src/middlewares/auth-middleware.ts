import { createListenerMiddleware } from "@reduxjs/toolkit";
import { usersApi } from "../app/services/users-api";

export const listenerMiddleware = createListenerMiddleware();

const ACCESS_TOKEN: string = "accessToken";

listenerMiddleware.startListening({
  matcher: usersApi.endpoints.login.matchFulfilled,
  effect: async (action, listtenerApi) => {
    listtenerApi.cancelActiveListeners();

    const accessToken = action.payload.accessToken;

    if (accessToken) {
      localStorage.setItem(ACCESS_TOKEN, accessToken);
    }
  },
});
