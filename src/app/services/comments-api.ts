import { api } from "./api";

import { EMethodsNames, EPathGlobal } from "@/enums";
import { TComment } from "../types";

export type TCommentData = {
  content: string;
  postId: string;
};

export const commentsApi = api.injectEndpoints({
  endpoints: builder => ({
    createComment: builder.mutation<TComment, TCommentData>({
      query: commentData => ({
        url: EPathGlobal.CREATE_COMMENT,
        method: EMethodsNames.POST,
        body: commentData,
      }),
    }),
    removeComment: builder.mutation<void, string>({
      query: id => ({
        url: `${EPathGlobal.REMOVE_COMMENT}/${id}`,
        method: EMethodsNames.DELETE,
      }),
    }),
  }),
});

export const { useCreateCommentMutation, useRemoveCommentMutation } = commentsApi;

export const {
  endpoints: { createComment, removeComment },
} = commentsApi;
