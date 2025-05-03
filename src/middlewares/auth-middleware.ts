import { createListenerMiddleware } from "@reduxjs/toolkit";

import { usersApi } from "@/app/services/users-api";

import { ELocalStorageKeys } from "@/enums";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: usersApi.endpoints.login.matchFulfilled,
  effect: async (action, listtenerApi) => {
    listtenerApi.cancelActiveListeners();

    const accessToken = action.payload.accessToken;

    if (accessToken) {
      localStorage.setItem(ELocalStorageKeys.ACCESS_TOKEN, accessToken);
    }
  },
});
