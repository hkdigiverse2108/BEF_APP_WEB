import { createSlice } from "@reduxjs/toolkit";
import { Storage, Stringify } from "../../Utils";
import { STORAGE_KEYS } from "../../Constants";

const StoredUser = JSON.parse(Storage.getItem(STORAGE_KEYS.USER) || "null")

const initialState = {
  token: "",
  user: StoredUser || null,
  isAuthenticated: !!Storage.getItem(STORAGE_KEYS.TOKEN)
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SetUser(state, actions) {
      const user = actions.payload
      // console.log("user from store", user)
      state.token = user.token;
      state.user = user;
      state.isAuthenticated = true;
      Storage.setItem(STORAGE_KEYS.TOKEN, user?.token);
      Storage.setItem(STORAGE_KEYS.USER, Stringify(user));

    },
    LogOut(state) {
      state.token = "";
      state.user = null
      state.isAuthenticated = false;
      
      Storage.clear();
      window.location.reload()
    }
  },
});

export const { SetUser ,LogOut } = authSlice.actions;
export default authSlice.reducer;
