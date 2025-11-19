import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ContestFilters } from "../../Types";

const initialState: {
  isContestFilters: ContestFilters;
  FullFestSubjectFilter: string;
  SolutionFilter: string;
  SolutionCurrentQuestion: number;
} = {
  isContestFilters: {
    entry: null,
    spots: null,
    prizePool: null,
    contestType: "",
  },
  FullFestSubjectFilter: "",
  SolutionFilter: "all",
  SolutionCurrentQuestion: 1,
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
    setSolutionFilter: (state, action) => {
      state.SolutionFilter = action.payload;
    },
    setCurrentSolutionQuestion: (state, action) => {
      state.SolutionCurrentQuestion = action.payload;
    },
  },
});

export const {
  setContestFilters,
  setFullFestSubjectFilter,
  setSolutionFilter,
  setCurrentSolutionQuestion,
} = FilterSlice.actions;
export default FilterSlice.reducer;
