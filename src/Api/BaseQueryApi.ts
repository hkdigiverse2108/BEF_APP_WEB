import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HTTP_STATUS, STORAGE_KEYS } from "../Constants";
import { Storage } from "../Utils";

export const RawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers) => {
    const token = Storage.getItem(STORAGE_KEYS.Token);
    if (token) {
      headers.set("authorization", token);
      headers.set("Cache-Control", "no-cache");
      headers.set("Pragma", "no-cache");
    }
    return headers;
  },
});

export const BaseQueryWithAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  const result = await RawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === HTTP_STATUS.UNAUTHORIZED) {
    Storage.removeItem(STORAGE_KEYS.Token);
    // api.dispatch(logout());
  }

  return result;
};
