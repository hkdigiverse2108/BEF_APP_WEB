import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSubjectDrawer: { open: false, id: "" },
  isSubtopicDrawer: { open: false, id: "" },
};

const DrawerSlice = createSlice({
  name: "Drawer",
  initialState,
  reducers: {
    setSubjectDrawer: (state, actions) => {
      state.isSubjectDrawer = actions.payload;
    },
    setSubtopicDrawer: (state, actions) => {
      state.isSubtopicDrawer = actions.payload;
    },
  },
});

export const { setSubjectDrawer, setSubtopicDrawer } = DrawerSlice.actions;
export default DrawerSlice.reducer;
