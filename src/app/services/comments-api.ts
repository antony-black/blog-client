import { EPathGlobal } from "@/enums";
import { TComment } from "../types";
import { api } from "./api";

export type TCommentData = {
  content: string;
  postId: string;
};

export const commentsApi = api.injectEndpoints({
  endpoints: builder => ({
    createComment: builder.mutation<TComment, TCommentData>({
      query: commentData => ({
        url: EPathGlobal.CREATE_COMMENT,
        method: "POST",
        body: commentData,
      }),
    }),
    removeComment: builder.mutation<void, string>({
      query: id => ({
        url: `${EPathGlobal.REMOVE_COMMENT}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useCreateCommentMutation, useRemoveCommentMutation } = commentsApi;

export const {
  endpoints: { createComment, removeComment },
} = commentsApi;
