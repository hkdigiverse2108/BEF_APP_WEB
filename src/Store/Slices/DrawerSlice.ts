import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSubjectDrawer: { open: false, id: "" },
  isSubtopicDrawer: { open: false, contest: {} },
  isConfirmationDrawer: { open: false, data: {} },
  isEndTestDrawer: false,
  isMenuDrawer: false,
  isFeedbackModal: false,
  isSupportModal: false,
  isNavMenuDrawer: false,
  isInstructionsDrawer: false,
  isReportModal: false,
  isContestFilterDrawer: { open: false },
  isPurchaseDrawer: false,
  isPaymentConfirmModal: false,
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
    setNavMenuDrawer: (state, actions) => {
      state.isNavMenuDrawer = actions.payload;
    },
    setInstructionsDrawer: (state) => {
      state.isInstructionsDrawer = !state.isInstructionsDrawer;
    },
    setReportModal: (state) => {
      state.isReportModal = !state.isReportModal;
    },
    setContestFilterDrawer: (state, actions) => {
      state.isContestFilterDrawer = actions.payload;
    },
    setPurchaseDrawer: (state) => {
      state.isPurchaseDrawer = !state.isPurchaseDrawer;
    },
    setPaymentConfirmModal: (state) => {
      state.isPaymentConfirmModal = !state.isPaymentConfirmModal;
    },
  },
});

export const {
  setSubjectDrawer,
  setSubtopicDrawer,
  setConfirmationDrawer,
  setEndTestDrawer,
  setMenuDrawer,
  setFeedbackModal,
  setSupportModal,
  setNavMenuDrawer,
  setInstructionsDrawer,
  setReportModal,
  setContestFilterDrawer,
  setPurchaseDrawer,
  setPaymentConfirmModal,
} = DrawerSlice.actions;
export default DrawerSlice.reducer;
