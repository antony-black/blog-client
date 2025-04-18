import { TPost } from "../types";
import { api } from "./api";

type TPostData = {
  content: string;
};

export const postsApi = api.injectEndpoints({
  endpoints: builder => ({
    create: builder.mutation<TPost, TPostData>({
      query: postData => ({
        url: "/create",
        method: "POST",
        body: postData,
      }),
    }),
    getAll: builder.query<TPost[], void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
    getById: builder.query<TPost, string>({
      query: id => ({
        url: `/${id}`,
        method: "GET",
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

export const {
  useCreateMutation,
  useGetAllQuery,
  useGetByIdQuery,
  useRemoveMutation,
  useLazyGetAllQuery,
  useLazyGetByIdQuery
} = postsApi;

export const {
  endpoints: { create, getById, getAll, remove },
} = postsApi;
