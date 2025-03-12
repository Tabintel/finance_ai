/* eslint-disable no-unused-vars */
import { BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [
    "User",
  ],
  endpoints: (_builder) => ({}),
});
