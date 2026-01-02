import { Tab, Tabs } from "@mui/material";
import { useState, type SyntheticEvent } from "react";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { useLocation } from "react-router-dom";
import { useGetApiQuery } from "../../../Api/CommonApi";
import { CardHeader } from "../../../Components/Common/CardHeader";
import AiPowered from "../../../Components/Exam/Result/AiPowered";
import CompareCompetitor from "../../../Components/Exam/Result/CompareCompetitor";
import EliminationSkill from "../../../Components/Exam/Result/EliminationSkill";
import Leaderboard from "../../../Components/Exam/Result/Leaderboard";
import Overview from "../../../Components/Exam/Result/Overview";
import ResultBanner from "../../../Components/Exam/Result/ResultBanner";
import Summary from "../../../Components/Exam/Result/Summary";
import { URL_KEYS } from "../../../Constants";
import type { ResultApiResponse } from "../../../Types";

const Result = () => {
  const [isOpen, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const qaFilter = params.get("qaFilter");
  const contestFilter = params.get("contestFilter");

  const { data, isLoading } = useGetApiQuery<ResultApiResponse>({
    url: `${URL_KEYS.REPORT.REPORT}${search}`,
  });
  const { data: ContestData, isLoading: isLoadingContest } = useGetApiQuery({
    url: `${URL_KEYS.QA.ALL}?page=1&limit=1&contestFilter=completed&qaFilter=${qaFilter}`,
  });

  const Contest = ContestData?.data.contest_type_data[0];
  const ContestSubject = Contest?.subjectId;

  const ResultData = data?.data;
  const OverviewData = ResultData?.sec1?.polity;
  const SummaryData = ResultData?.sec1;
  const compareWithCompetitorData = ResultData?.sec2;
  const eliminationReportTypeData = ResultData?.sec3;

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    setOpen(false);
  };

  return (
    <div className="sub-container pt-4 md:pt-8 result">
      <CardHeader title="Result" />
      <span className="border-t border-card-border flex w-full my-4" />
      <ResultBanner contest={Contest} qaId={qaFilter ?? ""} contestId={contestFilter ?? ""} loading={isLoadingContest} />

      {/* Mobile Toggle Button */}
      <div className="flex justify-start mt-3">
        <button onClick={() => setOpen(!isOpen)} className="2xl:hidden cursor-pointer p-1 flex justify-center items-center rounded-xl w-10 sm:w-12 h-10 sm:h-12 bg-input-box">
          <HiOutlineBars3BottomRight className="text-xl sm:text-2xl" />
        </button>
      </div>

      {/* Sidebar Drawer / Tab Section */}
      <div className="mx-auto pt-6">
        <div className="flex flex-col md:flex-row 2xl:gap-7">
          <div className="!sticky !top-32 !self-start max-2xl:z-50">
            <div onClick={() => setOpen(false)} className="max-2xl:hidden 2xl:!flex 2xl:items-start max-2xl:before:fixed max-2xl:before:bg-black max-2xl:before:opacity-40 max-2xl:before:inset-0 max-2xl:before:z-50" style={{ display: isOpen ? "block" : "none" }}>
              <div onClick={(e) => e.stopPropagation()} className=" p-6 2xl:gap-x-10 max-2xl:space-y-3 max-2xl:fixed 2xl:w-100 2xl:rounded-xl bg-input-box max-2xl:bg-[#ffffff] max-2xl:top-0 max-2xl:right-0 max-2xl:px-5 max-2xl:py-4 max-2xl:h-full max-2xl:shadow-md max-2xl:overflow-auto max-2xl:z-50">
                <div className="mb-6 hidden max-2xl:block">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Result</h3>
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
              <Overview data={OverviewData} isLoading={isLoading} contest={Contest} />
            </div>
            <div hidden={tabIndex !== 1}>
              <AiPowered data={OverviewData} subjectName={ContestSubject?.name} TabIndex={tabIndex}/>
            </div>
            <div hidden={tabIndex !== 2}>
              <Summary data={SummaryData} subjectName={ContestSubject?.name} />
            </div>
            <div hidden={tabIndex !== 3}>
              <CompareCompetitor data={compareWithCompetitorData} subjectName={ContestSubject?.name} TabIndex={tabIndex} />
            </div>
            <div hidden={tabIndex !== 4}>
              <EliminationSkill data={eliminationReportTypeData} subjectName={ContestSubject?.name} TabIndex={tabIndex} />
            </div>
            <div hidden={tabIndex !== 5}>
              <Leaderboard contest={Contest?.contestId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
