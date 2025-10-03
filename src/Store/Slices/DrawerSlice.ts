import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSubjectDrawer: { open: false, id: "" },
};

const DrawerSlice = createSlice({
  name: "Drawer",
  initialState,
  reducers: {
    setSubjectDrawer: (state,actions) => {
      state.isSubjectDrawer = actions.payload;
    },
  },
});

export const { setSubjectDrawer } = DrawerSlice.actions;
export default DrawerSlice.reducer;
