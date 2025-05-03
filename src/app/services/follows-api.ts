import { EPathGlobal } from "@/enums";
import { api } from "./api";

type TFollowData = {
  followingId: string;
};

export const followsApi = api.injectEndpoints({
  endpoints: builder => ({
    follow: builder.mutation<void, TFollowData>({
      query: body => ({
        url: EPathGlobal.FOLLOW,
        method: "POST",
        body,
      }),
    }),
    unfollow: builder.mutation<void, string>({
      query: followingId => ({
        url: `${EPathGlobal.UNFOLLOW}/${followingId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useFollowMutation, useUnfollowMutation } = followsApi;

export const {
  endpoints: { follow, unfollow },
} = followsApi;
