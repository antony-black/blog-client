import { TLike } from "../types";
import { api } from "./api";

type TLikeData = {
  postId: string;
};

export const likesApi = api.injectEndpoints({
  endpoints: builder => ({
    add: builder.mutation<TLike, TLikeData>({
      query: postId => ({
        url: "/add",
        method: "POST",
        body: postId,
      }),
    }),
    remove: builder.mutation<void, string>({
      query: id => ({
        url: `/remove/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useAddMutation, useRemoveMutation } = likesApi;

export const {
  endpoints: { add, remove },
} = likesApi;
