import { TLike } from "../types";
import { api } from "./api";

type TLikeData = {
  postId: string;
};

export const likesApi = api.injectEndpoints({
  endpoints: builder => ({
    addLike: builder.mutation<TLike, TLikeData>({
      query: postId => ({
        url: "/likes/add",
        method: "POST",
        body: postId,
      }),
    }),
    removeLike: builder.mutation<void, string>({
      query: id => ({
        url: `/likes/remove/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useAddLikeMutation, useRemoveLikeMutation } = likesApi;

export const {
  endpoints: { addLike, removeLike },
} = likesApi;
