import { TComment } from "../types";
import { api } from "./api";

type TCommentData = {
  content: string;
};

export const commentsApi = api.injectEndpoints({
  endpoints: builder => ({
    create: builder.mutation<TComment, TCommentData>({
      query: commentData => ({
        url: "/create",
        method: "POST",
        body: commentData,
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

export const { useCreateMutation, useRemoveMutation } = commentsApi;

export const {
  endpoints: { create, remove },
} = commentsApi;
