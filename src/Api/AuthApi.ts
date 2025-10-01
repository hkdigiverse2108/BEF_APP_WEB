import { createApi } from "@reduxjs/toolkit/query/react";
import { URL_KEYS } from "../Constants";
import { RawBaseQuery } from "./BaseQueryApi";

export const AuthApi = createApi({
  reducerPath: "authApi",
  baseQuery: RawBaseQuery,

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: URL_KEYS.AUTH.LOGIN,
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: URL_KEYS.AUTH.REGISTER,
        method: "POST",
        body: data,
      }),
    }),
    
    resetPassword: builder.mutation({
      query: (data) => ({
        url: URL_KEYS.AUTH.RESET_PASSWORD,
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: URL_KEYS.AUTH.FORGOT_PASSWORD,
        method: "POST",
        body: data,
      }),
    }),
    // resendOtp: builder.mutation({
    //   query: (data) => ({
    //     url: URL_KEYS.AUTH.RESEND_OTP,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),

    verifyOtp: builder.mutation({
      query: (otp) => ({
        url: URL_KEYS.AUTH.VERIFY_OTP,
        method: "POST",
        body: otp,
      }),
    }),
    // resetPasswordAdmin: builder.mutation({
    //   query: (data) => ({
    //     url: URL_KEYS.AUTH.RESET_PASSWORD_ADMIN,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
  }),
});

export const { useLoginMutation, useRegisterMutation , useResetPasswordMutation, useForgotPasswordMutation, useVerifyOtpMutation } = AuthApi;
