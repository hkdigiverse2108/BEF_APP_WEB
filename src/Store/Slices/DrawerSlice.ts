import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSubjectDrawer: { open: false, id: "" },
  isSubtopicDrawer: { open: false, contest: {} },
  isConfirmationDrawer: { open: false, data: {} },
  isEndTestDrawer: false,
  isMenuDrawer: false,
};

const DrawerSlice = createSlice({
  name: "Drawer",
  initialState,
  reducers: {
    setSubjectDrawer: (state, actions) => {
      state.isSubjectDrawer = actions.payload;
    },
    setSubtopicDrawer: (state, actions) => {
      // console.log(actions.payload);
      state.isSubtopicDrawer = actions.payload;
      // console.log(state.isSubtopicDrawer);
    },
    setConfirmationDrawer: (state, actions) => {
      state.isConfirmationDrawer = actions.payload;
    },
    setEndTestDrawer: (state) => {
      state.isEndTestDrawer = !state.isEndTestDrawer;
    },
    setMenuDrawer: (state) => {
      state.isMenuDrawer = !state.isMenuDrawer;
    },
  },
});

export const { setSubjectDrawer, setSubtopicDrawer, setConfirmationDrawer, setEndTestDrawer, setMenuDrawer } = DrawerSlice.actions;
export default DrawerSlice.reducer;
