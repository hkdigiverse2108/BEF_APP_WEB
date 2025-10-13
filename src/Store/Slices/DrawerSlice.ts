import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSubjectDrawer: { open: false, id: "" },
  isSubtopicDrawer: { open: false, contest: {} },
  isConfirmationDrawer: { open: false, data: {} },
  isEndTestDrawer: false,
  isMenuDrawer: false,
  isFeedbackModal: false,
  isSupportModal: false,
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
    setFeedbackModal: (state) => {
      state.isFeedbackModal = !state.isFeedbackModal;
    },
    setSupportModal: (state) => {
      state.isSupportModal = !state.isSupportModal;
    },
  },
});

export const { setSubjectDrawer, setSubtopicDrawer, setConfirmationDrawer, setEndTestDrawer, setMenuDrawer, setFeedbackModal, setSupportModal } = DrawerSlice.actions;
export default DrawerSlice.reducer;
