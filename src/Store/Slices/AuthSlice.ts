import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth() {},
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
