import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

import { RootState } from "../store";

import { BASE_URL } from "@/constants";
import { ELocalStorageKeys } from "@/enums";

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api`,
  prepareHeaders: (headers, { getState }) => {
    const accessToken =
      (getState() as RootState).auth.accessToken ||
      localStorage.getItem(ELocalStorageKeys.ACCESS_TOKEN);

      console.log("accessToken being used:", accessToken); 

    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 });

export const api = createApi({
  reducerPath: "blogServerApi",
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
