import { TUser } from "../types";
import { api } from "./api";

type TResponseData = TUser & { accessToken: string };

type TUserAuthData = {
  name?: string;
  email: string;
  password: string;
};

type TUpdatedUserData = {
  userData: FormData;
  id: string;
};

export const usersApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<TResponseData, TUserAuthData>({
      query: userData => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
    }),
    registration: builder.mutation<TResponseData, TUserAuthData>({
      query: userData => ({
        url: "/registration",
        method: "POST",
        body: userData,
      }),
    }),
    update: builder.mutation<TUser, TUpdatedUserData>({
      query: ({ userData, id }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: userData,
      }),
    }),
    current: builder.query<TUser, void>({
      query: () => ({
        url: "/current",
        method: "GET",
      }),
    }),
    getById: builder.query<TUser, string>({
      query: id => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useUpdateMutation,
  useCurrentQuery,
  useGetByIdQuery,
  useLazyCurrentQuery
} = usersApi;

export const {
  endpoints: { login, registration, update, current, getById },
} = usersApi;
