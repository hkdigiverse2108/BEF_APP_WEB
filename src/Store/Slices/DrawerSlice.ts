import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSubjectDrawer: { open: false, id: "" },
  isSubtopicDrawer: { open: false, id: "" },
  isConfirmationDrawer: false,
  isEndTestDrawer: false,
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
      state.isSubjectDrawer = { open: false, id: "" };
    },
    setConfirmationDrawer: (state) => {
      state.isConfirmationDrawer = !state.isConfirmationDrawer;
    },
    setEndTestDrawer: (state) => {
      state.isEndTestDrawer = !state.isEndTestDrawer;
    },
  },
});

export const { setSubjectDrawer, setSubtopicDrawer, setConfirmationDrawer, setEndTestDrawer } = DrawerSlice.actions;
export default DrawerSlice.reducer;
