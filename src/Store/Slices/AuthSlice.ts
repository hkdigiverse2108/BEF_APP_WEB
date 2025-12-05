import { createSlice } from "@reduxjs/toolkit";
import { Storage, Stringify } from "../../Utils";
import { ImagePath, STORAGE_KEYS } from "../../Constants";

const StoredUser = JSON.parse(Storage.getItem(STORAGE_KEYS.USER) || "null");

const initialState = {
  token: "",
  user: StoredUser || null,
  genderWiseProfileImage: StoredUser?.gender === "male" ? `${ImagePath}user/User_Male.png` : `${ImagePath}user/User_Female.png`,
  isAuthenticated: !!Storage.getItem(STORAGE_KEYS.TOKEN),
  isResetPasswordModal: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SetUser(state, actions) {
      const user = actions.payload;
      state.token = user.token;
      state.user = user;
      state.isAuthenticated = true;
      state.genderWiseProfileImage = user?.gender === "male" ? `${ImagePath}user/User_Male.png` : `${ImagePath}user/User_Female.png`;
      Storage.setItem(STORAGE_KEYS.TOKEN, user?.token);
      Storage.setItem(STORAGE_KEYS.USER, Stringify(user));
    },
    LogOut(state) {
      state.token = "";
      state.user = null;
      state.isAuthenticated = false;
    },
    setResetPasswordModal: (state) => {
      state.isResetPasswordModal = !state.isResetPasswordModal;
    },
  },
});

export const { SetUser, LogOut, setResetPasswordModal } = authSlice.actions;
export default authSlice.reducer;
