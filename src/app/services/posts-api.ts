import { TPost } from "../types";
import { api } from "./api";

export type TPostData = {
  content: string;
};

export const postsApi = api.injectEndpoints({
  endpoints: builder => ({
    createPost: builder.mutation<TPost, TPostData>({
      query: postData => ({
        url: "/posts/create",
        method: "POST",
        body: postData,
      }),
    }),
    getAllPosts: builder.query<TPost[], void>({
      query: () => ({
        url: "/posts",
        method: "GET",
      }),
    }),
    getPostById: builder.query<TPost, string>({
      query: id => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
    }),
    removePost: builder.mutation<void, string>({
      query: id => ({
        url: `/posts/remove/${id}`,
        method: "DELETE",
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
  useLazyGetPostByIdQuery
} = postsApi;

export const {
  endpoints: { createPost, getPostById, getAllPosts, removePost },
} = postsApi;
