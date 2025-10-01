import { createApi } from "@reduxjs/toolkit/query/react";
import { RawBaseQuery } from "./BaseQueryApi";

export const CommonGlobalApi = createApi({
    reducerPath: "Globalapi",
    baseQuery: RawBaseQuery,
    endpoints: (builder) => ({
        GetGlobalApi: builder.query({
            query: ({ url }) => ({
                url,
                method: "GET"
            })
        }),
        PostGlobalApi: builder.mutation({
            query: ({ url, data }) => ({
                url,
                method: "POST",
                body: data
            })
        }),
        DeleteGlobalApi: builder.mutation({
            query: ({ url }) => ({
                url,
                method: "DELETE"
            })
        })
    })
})

export const { useGetGlobalApiQuery, usePostGlobalApiMutation, useDeleteGlobalApiMutation } = CommonGlobalApi;