import { useState } from "react";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { CardHeader } from "../../../Components/Common/CardHeader";
import AiPowered from "../../../Components/Exam/Result/AiPowered";
import Overview from "../../../Components/Exam/Result/Overview";
import ResultBanner from "../../../Components/Exam/Result/ResultBanner";

import { Tab, Tabs } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import Summary from "../../../Components/Exam/Result/Summary";
import CompareCompetitor from "../../../Components/Exam/Result/CompareCompetitor";
import EliminationSkill from "../../../Components/Exam/Result/EliminationSkill";

const Result = () => {
  const [isOpen, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(4);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue);

  return (
    <div className="min-h-screen p-4 md:p-8 result">
      <CardHeader title="Result" />
      <span className="border-t border-card-border flex w-full my-4" />
      <ResultBanner />

      {/* Mobile Toggle Button */}
      <div className="flex justify-start mt-3">
        <button onClick={() => setOpen(!isOpen)} className="2xl:hidden cursor-pointer p-1 flex justify-center items-center rounded-xl w-10 sm:w-12 h-10 sm:h-12 bg-input-box">
          <HiOutlineBars3BottomRight className="text-xl sm:text-2xl" />
        </button>
      </div>

      {/* Sidebar Drawer / Tab Section */}
      <div className="mx-auto py-6">
        <div className="flex flex-col md:flex-row 2xl:gap-7">
          <div className="!sticky !top-6 !self-start z-50">
            <div onClick={() => setOpen(false)} className="max-2xl:hidden 2xl:!flex 2xl:items-start max-2xl:before:fixed max-2xl:before:bg-black max-2xl:before:opacity-40 max-2xl:before:inset-0 max-2xl:before:z-50" style={{ display: isOpen ? "block" : "none" }}>
              <div onClick={(e) => e.stopPropagation()} className=" p-6 2xl:gap-x-10 max-2xl:space-y-3 max-2xl:fixed 2xl:w-100 rounded-xl bg-input-box max-2xl:bg-[#ffffff] max-2xl:top-0 max-2xl:right-0 max-2xl:px-5 max-2xl:py-4 max-2xl:h-full max-2xl:shadow-md max-2xl:overflow-auto z-50">
                <div className="mb-6 hidden max-2xl:block">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">Result</h3>
                    <button id="toggleClose" onClick={() => setOpen(!isOpen)} className=" z-[100] rounded-xl bg-input-box w-9 h-9 flex items-center justify-center cursor-pointer">
                      <RxCross2 className="w-5 h-5" />
                    </button>
                  </div>
                  <span className="border-t border-card-border flex w-full my-4" />
                </div>
                <Tabs orientation="vertical" variant="scrollable" value={tabIndex} onChange={handleChange}>
                  <Tab label="Overview" />
                  <Tab label="AI Powered Report Analysis" />
                  <Tab label="Summary" />
                  <Tab label="Compare Competitor" />
                  <Tab label="Elimination Skill Report" />
                  <Tab label="Leaderboard" />
                </Tabs>
              </div>
            </div>
          </div>

          {/* Tab Panels */}
          <div className="tab-panels w-full">
            <div hidden={tabIndex !== 0}>
              <Overview />
            </div>
            <div hidden={tabIndex !== 1}>
              <AiPowered />
            </div>
            <div hidden={tabIndex !== 2}>
              <Summary />
            </div>
            <div hidden={tabIndex !== 3}>
              <CompareCompetitor />
            </div>
            <div hidden={tabIndex !== 4}>
              <EliminationSkill />
            </div>
            <div hidden={tabIndex !== 5}>Content of Tab</div>
          </div>
        </div>
      </div>
      {/* <ResultAnalytics /> */}
    </div>
  );
};

export default Result;
