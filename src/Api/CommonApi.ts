import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseQueryWithAuth } from "./BaseQueryApi";

export const CommonApi = createApi({
  reducerPath: "api",
  baseQuery: BaseQueryWithAuth,
  endpoints: (builder) => ({
    GetApi: builder.query({
      query: ({ url }) => ({
        url,
        method: "GET",
      }),
    }),
    PostApi: builder.mutation({
      query: ({ url, data }) => ({
        url,
        method: "POST",
        body: data,
      }),
    }),
    DeleteApi: builder.mutation({
      query: ({ url }) => ({
        url,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetApiQuery, usePostApiMutation, useDeleteApiMutation } = CommonApi;
