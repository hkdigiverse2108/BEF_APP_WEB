import { Tab, Tabs } from "@mui/material";
import { useState, useEffect, type SyntheticEvent } from "react";
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
import { URL_KEYS, REPORT_VIDEOS } from "../../../Constants";
import ModernVideoPlayer from "../../../Components/Common/ModernVideoPlayer";
import type { ResultApiResponse } from "../../../Types";

const Result = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);

  const [isOpen, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const qaFilter = params.get("qaFilter");
  const contestId = params.get("contestFilter") || params.get("contestId") || "";

  const { data, isLoading } = useGetApiQuery<ResultApiResponse>({
    url: `${URL_KEYS.REPORT.REPORT}${search}`,
  });
  const { data: ContestData, isLoading: isLoadingContest } = useGetApiQuery({
    url: `${URL_KEYS.QA.ALL}?page=1&limit=1` + (contestId ? `&contestId=${contestId}` : "") + (qaFilter ? `&qaFilter=${qaFilter}` : ""),
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
      <ResultBanner contest={Contest} qaId={qaFilter ?? ""} contestId={contestId} loading={isLoadingContest} />

      {/* Mobile Toggle & Jump to Report Row */}
      <div className="flex items-center gap-3 mt-3 2xl:hidden">
        <button
          type="button"
          onClick={() => setOpen(!isOpen)}
          title="Open Report Navigation Menu"
          aria-label="Open Report Navigation Menu"
          className="cursor-pointer flex justify-center items-center rounded-xl w-11 h-11 bg-[#124699] text-white shadow-md border border-[#124699] hover:bg-[#0e377a] active:scale-95 transition-all"
        >
          <HiOutlineBars3BottomRight className="text-2xl text-white" />
        </button>

        <button
          type="button"
          onClick={() => {
            document.getElementById("report-content-tabs")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#124699] to-[#F48224] text-white text-xs sm:text-sm font-bold shadow-md hover:opacity-95 active:scale-98 transition-all cursor-pointer"
        >
          <span>View Detailed Report</span>
          <span className="text-base">↓</span>
        </button>
      </div>

      {/* Sidebar Drawer / Tab Section */}
      <div id="report-content-tabs" className="mx-auto pt-6 scroll-mt-20">
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
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={tabIndex}
                  onChange={handleChange}
                  sx={{
                    "& .MuiTab-root": {
                      alignItems: "flex-start !important",
                      textAlign: "left !important",
                      justifyContent: "flex-start !important",
                      paddingLeft: "16px !important",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      fontSize: "13px",
                    },
                    "& .MuiTabs-indicator": {
                      left: 0,
                      width: "4px",
                      borderRadius: "0 4px 4px 0",
                      backgroundColor: "#124699",
                    },
                  }}
                >
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
              <div className="mb-6">
                <ModernVideoPlayer
                  key="ai"
                  src={REPORT_VIDEOS.ai.src}
                  title={REPORT_VIDEOS.ai.title}
                  subtitle={REPORT_VIDEOS.ai.subtitle}
                  badge={REPORT_VIDEOS.ai.badge}
                  points={REPORT_VIDEOS.ai.points}
                  bannerMode={true}
                />
              </div>
              <AiPowered data={OverviewData} subjectName={ContestSubject?.name} TabIndex={tabIndex} />
            </div>
            <div hidden={tabIndex !== 2}>
              <div className="mb-6">
                <ModernVideoPlayer
                  key="summary"
                  src={REPORT_VIDEOS.summary.src}
                  title={REPORT_VIDEOS.summary.title}
                  subtitle={REPORT_VIDEOS.summary.subtitle}
                  badge={REPORT_VIDEOS.summary.badge}
                  points={REPORT_VIDEOS.summary.points}
                  bannerMode={true}
                />
              </div>
              <Summary data={SummaryData} subjectName={ContestSubject?.name} />
            </div>
            <div hidden={tabIndex !== 3}>
              <div className="mb-6">
                <ModernVideoPlayer
                  key="compare"
                  src={REPORT_VIDEOS.compare.src}
                  title={REPORT_VIDEOS.compare.title}
                  subtitle={REPORT_VIDEOS.compare.subtitle}
                  badge={REPORT_VIDEOS.compare.badge}
                  points={REPORT_VIDEOS.compare.points}
                  bannerMode={true}
                />
              </div>
              <CompareCompetitor data={compareWithCompetitorData} subjectName={ContestSubject?.name} TabIndex={tabIndex} />
            </div>
            <div hidden={tabIndex !== 4}>
              <div className="mb-6">
                <ModernVideoPlayer
                  key="elimination"
                  src={REPORT_VIDEOS.elimination.src}
                  title={REPORT_VIDEOS.elimination.title}
                  subtitle={REPORT_VIDEOS.elimination.subtitle}
                  badge={REPORT_VIDEOS.elimination.badge}
                  points={REPORT_VIDEOS.elimination.points}
                  bannerMode={true}
                />
              </div>
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
