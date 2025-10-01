import { createApi } from "@reduxjs/toolkit/query/react";
import { RawBaseQuery } from "./BaseQueryApi";

const commonApi = createApi({
    reducerPath: "api",
    baseQuery: RawBaseQuery,
    endpoints: (builder) => ({
        GetApi: builder.query({
            query: ({ url }) => ({
                url,
                method: "GET"
            })
        }),
        PostApi: builder.mutation({
            query: ({ url, data }) => ({
                url,
                method: "POST",
                body: data
            })
        }),
        DeleteApi: builder.mutation({
            query: ({ url }) => ({
                url,
                method: "DELETE"
            })
        })
    })
})

export const { useGetApiQuery, usePostApiMutation, useDeleteApiMutation } = commonApi;