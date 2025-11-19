import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CourseFooterShow: false,
  WorkshopFooterShow: false,
};

const FooterShowSlice = createSlice({
  name: "footerShowSlice",
  initialState: initialState,
  reducers: {
    setCourseFooterShow: (state, action) => {
      state.CourseFooterShow = action.payload;
    },
    setWorkshopFooterShow: (state, action) => {
      state.WorkshopFooterShow = action.payload;
    },
  },
});

export const { setCourseFooterShow, setWorkshopFooterShow } =
  FooterShowSlice.actions;

export default FooterShowSlice.reducer;
