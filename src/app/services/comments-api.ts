import { TComment } from "../types";
import { api } from "./api";

type TCommentData = {
  content: string;
};

export const commentsApi = api.injectEndpoints({
  endpoints: builder => ({
    createComment: builder.mutation<TComment, TCommentData>({
      query: commentData => ({
        url: "/comments/create",
        method: "POST",
        body: commentData,
      }),
    }),
    removeComment: builder.mutation<void, string>({
      query: id => ({
        url: `/comments/remove/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useCreateCommentMutation, useRemoveCommentMutation } = commentsApi;

export const {
  endpoints: { createComment, removeComment },
} = commentsApi;
