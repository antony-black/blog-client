import { TFollows } from "../types";
import { api } from "./api";

type TFollowData = {
  followingId: string;
};

export const followsApi = api.injectEndpoints({
  endpoints: builder => ({
    follow: builder.mutation<TFollows, TFollowData>({
      query: followingId => ({
        url: "/follow",
        method: "POST",
        body: followingId,
      }),
    }),
    unfollow: builder.mutation<TFollows, TFollowData>({
      query: followingId => ({
        url: "/follow",
        method: "POST",
        body: followingId,
      }),
    }),
  }),
});
