import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ContestFilters } from "../../Types";

const initialState: { isContestFilters: ContestFilters } = {
  isContestFilters: {
    entry: null,
    spots: null,
    prizePool: null,
    contestType: "",
  },
};

const FilterSlice = createSlice({
  name: "Filter",
  initialState,
  reducers: {
    setContestFilters: (state, action: PayloadAction<ContestFilters>) => {
      state.isContestFilters = action.payload;
    },
  },
});

export const { setContestFilters } = FilterSlice.actions;
export default FilterSlice.reducer;
