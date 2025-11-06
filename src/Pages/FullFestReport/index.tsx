import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { FaDiscord } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { GiTrophy } from "react-icons/gi";
import { TbBookmarkFilled } from "react-icons/tb";
import { useGetApiQuery } from "../../Api/CommonApi";
import { CardHeader } from "../../Components/Common/CardHeader";
import AIPoweredReportAnalysis from "../../Components/FullFestReport/AIPoweredReportAnalysis";
import EliminationSkillReport from "../../Components/FullFestReport/EliminationSkillReport";
import MistakeMapReport from "../../Components/FullFestReport/MistakeMapReport";
import MyWinning from "../../Components/FullFestReport/MyWinning";
import Summary from "../../Components/FullFestReport/Summary";
import { URL_KEYS } from "../../Constants";
import type { FullFestReportApiResponse } from "../../Types";

const FullFestReport = () => {
  const [tabIndex, setTabIndex] = useState(1);
  const { data } = useGetApiQuery<FullFestReportApiResponse>({ url: URL_KEYS.FULL_FEST.FULL_FEST });
  const Sec1 = data?.data?.sec1;
  const Sec2 = data?.data?.sec2;
  const Sec3 = data?.data?.sec3;

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue);
  return (
    <div className="sub-container pt-8 pb-1">
      <CardHeader title="Full Fest Report" />
      <hr className="text-card-border my-4" />
      <div>
        <Tabs className="horizontal-more-tabs" orientation="horizontal" variant="scrollable" value={tabIndex} onChange={handleChange} allowScrollButtonsMobile>
          <Tab label="My Winning" icon={<GiTrophy />} iconPosition="start" />
          <Tab label="AI Powered Report Analysis" icon={<FaDiscord />} iconPosition="start" />
          <Tab label="Summary" icon={<TbBookmarkFilled />} iconPosition="start" />
          <Tab label="Elimination Skill Report" icon={<FaEarthAmericas />} iconPosition="start" />
          <Tab label="Mistake Map Report" icon={<CiCircleRemove />} iconPosition="start" />
        </Tabs>
        <div className="w-full pt-10">
          <div hidden={tabIndex !== 0}>
            <MyWinning />
          </div>
          <div hidden={tabIndex !== 1}>
            <AIPoweredReportAnalysis data={Sec1} />
          </div>
          <div hidden={tabIndex !== 2}>
            <Summary AttemptingStrategyWise={Sec1?.subjectSummary} SubWise={Sec2?.qaTypeSummary} />
          </div>
          <div hidden={tabIndex !== 3}>
            <EliminationSkillReport EliminationSkill={Sec2?.firstPoweredReport} />
          </div>
          <div hidden={tabIndex !== 4}>
            <MistakeMapReport MistakeMapReport={Sec3?.mistakeMapReport} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullFestReport;
