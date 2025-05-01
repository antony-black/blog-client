import { api } from "./api";

type TFollowData = {
  followingId: string;
};

export const followsApi = api.injectEndpoints({
  endpoints: builder => ({
    follow: builder.mutation<void, TFollowData>({
      query: body => ({
        url: "/followers/follow",
        method: "POST",
        body,
      }),
    }),
    unfollow: builder.mutation<void, string>({
      query: followingId => ({
        url: `/followers/unfollow/${followingId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useFollowMutation, useUnfollowMutation } = followsApi;

export const {
  endpoints: { follow, unfollow },
} = followsApi;
