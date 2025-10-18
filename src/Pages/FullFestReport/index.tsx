import { Tab, Tabs } from "@mui/material";
import { CardHeader } from "../../Components/Common/CardHeader";
import { useState } from "react";
import MyWinning from "../../Components/FullFestReport/MyWinning";
import AIPoweredReportAnalysis from "../../Components/FullFestReport/AIPoweredReportAnalysis";
import EliminationSkillReport from "../../Components/FullFestReport/EliminationSkillReport";
import Summary from "../../Components/FullFestReport/Summary";
import MistakeMapReport from "../../Components/FullFestReport/MistakeMapReport";

const FullFestReport = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue);
  return (
    <div className="sub-container pt-8">
      <CardHeader title="Full Fest Report" />
      <hr className="text-card-border my-4" />
      <div>
        <Tabs orientation="horizontal" variant="scrollable" value={tabIndex} onChange={handleChange} allowScrollButtonsMobile>
          <Tab label="My Winning" />
          <Tab label="AI Powered Report Analysis" />
          <Tab label="Summary" />
          <Tab label="Elimination Skill Report" />
          <Tab label="Mistake Map Report" />
        </Tabs>
        <div className="w-full pt-10">
          <div hidden={tabIndex !== 0}>
            <MyWinning />
          </div>
          <div hidden={tabIndex !== 1}>
            <AIPoweredReportAnalysis />
          </div>
          <div hidden={tabIndex !== 2}>
            <Summary />
          </div>
          <div hidden={tabIndex !== 3}>
            <EliminationSkillReport />
          </div>
          <div hidden={tabIndex !== 4}>
            <MistakeMapReport />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullFestReport;
