import { EPathGlobal } from "@/enums";
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
        url: EPathGlobal.LOGIN,
        method: "POST",
        body: userData,
      }),
    }),
    registration: builder.mutation<TResponseData, TUserAuthData>({
      query: userData => ({
        url: EPathGlobal.REGISTRATION,
        method: "POST",
        body: userData,
      }),
    }),
    editUserProfile: builder.mutation<TUser, TUpdatedUserData>({
      query: ({ userData, id }) => ({
        url: `${EPathGlobal.EDIT_PROFILE}/${id}`,
        method: "PUT",
        body: userData,
      }),
    }),
    current: builder.query<TUser, void>({
      query: () => ({
        url: EPathGlobal.CURRENT_USER,
        method: "GET",
      }),
    }),
    getUserById: builder.query<TUser, string>({
      query: id => ({
        url: `${EPathGlobal.SINGLE_USER}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useEditUserProfileMutation,
  useCurrentQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useLazyCurrentQuery
} = usersApi;

export const {
  endpoints: { login, registration, editUserProfile, current, getUserById },
} = usersApi;
