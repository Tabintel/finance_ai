import { AUTH_URL } from "@/constants";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        method: "POST",
        credentials: "include",
        body: data,
        url: `${AUTH_URL}/login`,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        method: "POST",
        body: data,
        credentials: "include",
        url: `${AUTH_URL}/register`,
      }),
    }),
    logout: builder.mutation({
      query: (data) => ({
        method: "POST",
        body: data,
        url: `${AUTH_URL}/logout`,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
} = userApiSlice;
