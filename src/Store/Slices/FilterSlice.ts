import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ContestFilters } from "../../Types";

const initialState: {
  isContestFilters: ContestFilters;
  FullFestSubjectFilter: string;
} = {
  isContestFilters: {
    entry: null,
    spots: null,
    prizePool: null,
    contestType: "",
  },
  FullFestSubjectFilter: "",
};

const FilterSlice = createSlice({
  name: "Filter",
  initialState,
  reducers: {
    setContestFilters: (state, action: PayloadAction<ContestFilters>) => {
      state.isContestFilters = action.payload;
    },
    setFullFestSubjectFilter: (state, action) => {
      state.FullFestSubjectFilter = action.payload;
    },
  },
});

export const { setContestFilters, setFullFestSubjectFilter } =
  FilterSlice.actions;
export default FilterSlice.reducer;
