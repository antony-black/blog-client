import { api } from "./api";

import { EMethodsNames, EPathGlobal } from "@/enums";
import { TPost } from "../types";

export type TPostData = {
  content: string;
};

export const postsApi = api.injectEndpoints({
  endpoints: builder => ({
    createPost: builder.mutation<TPost, TPostData>({
      query: postData => ({
        url: EPathGlobal.CREATE_POST,
        method: EMethodsNames.POST,
        body: postData,
      }),
    }),
    getAllPosts: builder.query<TPost[], void>({
      query: () => ({
        url: EPathGlobal.ALL_POSTS,
        method: EMethodsNames.GET,
      }),
    }),
    getPostById: builder.query<TPost, string>({
      query: id => ({
        url: `${EPathGlobal.SINGLE_POST}/${id}`,
        method: EMethodsNames.GET,
      }),
    }),
    removePost: builder.mutation<void, string>({
      query: id => ({
        url: `${EPathGlobal.REMOVE_POST}/${id}`,
        method: EMethodsNames.DELETE,
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useRemovePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} = postsApi;

export const {
  endpoints: { createPost, getPostById, getAllPosts, removePost },
} = postsApi;
