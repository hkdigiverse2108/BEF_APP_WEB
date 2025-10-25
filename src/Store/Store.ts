import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/AuthSlice";
import DrawerSlice from "./Slices/DrawerSlice";
import FilterSlice from "./Slices/FilterSlice";
import { CommonApi, CommonGlobalApi } from "../Api";

export const Store = configureStore({
  reducer: {
    [CommonApi.reducerPath]: CommonApi.reducer,
    [CommonGlobalApi.reducerPath]: CommonGlobalApi.reducer,

    auth: authReducer,
    drawer: DrawerSlice,
    filter: FilterSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(CommonApi.middleware).concat(CommonGlobalApi.middleware),
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
