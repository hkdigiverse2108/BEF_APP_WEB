import { configureStore } from "@reduxjs/toolkit";
import { AuthApi } from "../Api";
import authReducer from "./Slices/AuthSlice";

export const Store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,

    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(AuthApi.middleware),
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
