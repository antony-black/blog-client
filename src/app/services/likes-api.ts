import { EPathGlobal } from "@/enums";
import { TLike } from "../types";
import { api } from "./api";

type TLikeData = {
  postId: string;
};

export const likesApi = api.injectEndpoints({
  endpoints: builder => ({
    addLike: builder.mutation<TLike, TLikeData>({
      query: postId => ({
        url: EPathGlobal.ADD_LIKE,
        method: "POST",
        body: postId,
      }),
    }),
    removeLike: builder.mutation<void, string>({
      query: id => ({
        url: `${EPathGlobal.REMOVE_LIKE}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useAddLikeMutation, useRemoveLikeMutation } = likesApi;

export const {
  endpoints: { addLike, removeLike },
} = likesApi;
