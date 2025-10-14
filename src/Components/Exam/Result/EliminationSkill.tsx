import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { EliminationSkillBarChart, EliminationSkillRadialBarChart } from "../../../Data";

const EliminationSkill = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue);

  return (
    <>
      {/* Header */}
      <div className="relative pl-4 mb-6">
        <div className="w-1 h-full bg-success-light rounded-full absolute left-0 top-0" />
        <h2 className="text-xl font-bold text-gray-800">Polity</h2>
        <p className="text-sm text-gray-500 font-semibold">Elimination Skill Report</p>
      </div>

      <Tabs className="horizontal-tabs" orientation="horizontal" variant="scrollable" value={tabIndex} onChange={handleChange}>
        <Tab label="50 - 50" />
        <Tab label="1-OPT eliminate" />
      </Tabs>

      {/* 50-50 Tab */}
      <div hidden={tabIndex !== 0}>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 pt-6">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 pt-6">
            <div className="flex flex-col items-center">
              <ReactApexChart options={EliminationSkillRadialBarChart("#FE6E13")} series={[60]} type="radialBar" height={250} />
              <p className="mt-2 font-semibold">Your Correct Elimination Accuracy</p>
            </div>

            <div className="flex flex-col items-center">
              <ReactApexChart options={EliminationSkillRadialBarChart("#288F66")} series={[10]} type="radialBar" height={250} />
              <p className="mt-2 font-semibold">Right Answer Accuracy After Elimination</p>
            </div>
          </div>
          <div className="pt-6">
            <div className="flex flex-col items-center w-full">
              <div className="w-full">
                <ReactApexChart options={EliminationSkillBarChart} series={EliminationSkillBarChart.series} type={EliminationSkillBarChart.chart?.type} height={350} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EliminationSkill;
