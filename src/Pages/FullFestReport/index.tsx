import { Tab, Tabs, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { FaDiscord } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { GiTrophy } from "react-icons/gi";
import { IoIosCloseCircle } from "react-icons/io";
import { TbBookmarkFilled } from "react-icons/tb";
import { useGetApiQuery } from "../../Api/CommonApi";
import SectionHeader from "../../Components/Common/SectionHeader";
import AIPoweredReportAnalysis from "../../Components/FullFestReport/AIPoweredReportAnalysis";
import EliminationSkillReport from "../../Components/FullFestReport/EliminationSkillReport";
import MistakeMapReport from "../../Components/FullFestReport/MistakeMapReport";
import MyWinning from "../../Components/FullFestReport/MyWinning";
import Summary from "../../Components/FullFestReport/Summary";
import { URL_KEYS } from "../../Constants";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { setFullFestSubjectFilter } from "../../Store/Slices/FilterSlice";
import type { FullFestReportApiResponse } from "../../Types";

const FullFestReport = () => {
  const [tabIndex, setTabIndex] = useState(1);
  const dispatch = useAppDispatch();

  const { FullFestSubjectFilter } = useAppSelector((state) => state.filter);

  const { data, isLoading , isFetching} = useGetApiQuery<FullFestReportApiResponse>({
    url: `${URL_KEYS.FULL_FEST.FULL_FEST}${FullFestSubjectFilter ? `?subjectFilter=${FullFestSubjectFilter}` : ""}`,
  });
  

  const Sec1 = data?.data?.sec1;
  const Sec2 = data?.data?.sec2;
  const Sec3 = data?.data?.sec3;
  const isVerySmall = useMediaQuery("(max-width: 484px)");
  const isMedium = useMediaQuery("(max-width: 1032px)");

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    dispatch(setFullFestSubjectFilter(""));
    setTabIndex(newValue);
  };
  const tabData = [
    { title: "My Winning", icon: <GiTrophy className="text-xl" /> },
    {
      title: "AI Powered Report Analysis",
      icon: <FaDiscord className="text-xl" />,
    },
    { title: "Summary", icon: <TbBookmarkFilled className="text-xl" /> },
    {
      title: "Elimination Skill Report",
      icon: <FaEarthAmericas className="text-xl" />,
    },
    {
      title: "Mistake Map Report",
      icon: <IoIosCloseCircle className="text-xl" />,
    },
  ];

  return (
    <div className="sub-container">
      <section className="mb-6 sm:mb-7">
        <SectionHeader title="Full Fest Report" />
        <p className="mt-2 max-w-xl text-xs sm:text-sm text-muted-foreground">Performance center</p>
      </section>
      <div>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          variant="scrollable"
          orientation={isVerySmall ? "vertical" : "horizontal"}
          className="fest-tabs"
          slotProps={{ indicator: { style: { display: "none" } } }}
          sx={{
            "& .MuiTabs-flexContainer": {
              flexDirection: isVerySmall ? "column" : "row",
              flexWrap: "wrap",
              gap: "8px",
            },
          }}
        >
          {tabData.map((item, idx) => (
            <Tab
              key={idx}
              disableRipple
              onClick={() => {
                setTabIndex(idx);
                dispatch(setFullFestSubjectFilter(""));
              }}
              label={
                <span className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.title}</span>
                </span>
              }
              sx={{
                textTransform: "none",
                width: isVerySmall ? "100%" : isMedium ? "calc(50% - 16px)" : "auto",
              }}
            />
          ))}
        </Tabs>
        <div className="w-full pt-10">
          <div hidden={tabIndex !== 0}>
            <MyWinning MyWinningData={Sec3?.myWinningList} tabIndex={tabIndex} isLoading={isLoading || isFetching} />
          </div>
          <div hidden={tabIndex !== 1}>
            <AIPoweredReportAnalysis data={Sec1} isLoading={isLoading || isFetching} TabIndex={tabIndex} />
          </div>
          <div hidden={tabIndex !== 2}>
            <Summary AttemptingStrategyWise={Sec1?.subjectSummary} SubWise={Sec2?.qaTypeSummary} isLoading={isLoading || isFetching} />
          </div>
          <div hidden={tabIndex !== 3}>
            <EliminationSkillReport EliminationSkill={Sec2?.firstPoweredReport} TabIndex={tabIndex} isLoading={isLoading || isFetching} />
          </div>
          <div hidden={tabIndex !== 4}>
            <MistakeMapReport MistakeMapReport={Sec3?.mistakeMapReport} isLoading={isLoading || isFetching} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullFestReport;
