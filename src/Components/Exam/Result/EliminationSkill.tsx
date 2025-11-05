import { Tab, Tabs } from "@mui/material";
import { useState, type FC } from "react";
import ReactApexChart from "react-apexcharts";
import { EliminationSkillBarChart, EliminationSkillRadialBarCharts } from "../../../Data";
import type { Sec3Type } from "../../../Types";

const EliminationSkill: FC<{ data: Sec3Type }> = ({ data }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue);
  const metrics = data?.eliminationReport?.qaTypeMetrics?.[0];

  const eliminationReport = tabIndex === 0 ? metrics?.fiftyFifty : metrics?.oneEliminate;
  const RightEliminatedYes = tabIndex === 0 ? metrics?.fiftyRightEliminatedYes : metrics?.oneEliminateCorrectEliminationYes;
  const TotalQuestions = tabIndex === 0 ? metrics?.totalFiftyQuestions : metrics?.totalOneEliminateQuestions;
  const RightChosenAfterEliminationYes = tabIndex === 0 ? metrics?.fiftyRightChosenAfterEliminationYes : metrics?.oneEliminateRightAnswerFromCorrectEliminationYes;

  const qa = data?.eliminationReport?.qa;

  const chartCorrectSeries = tabIndex === 0 ? [qa?.["100%Sure"]?.fiftyFifty?.correctPercentage ?? 0, qa?.logicPlay?.fiftyFifty?.correctPercentage ?? 0, qa?.intuitionHit?.fiftyFifty?.correctPercentage ?? 0, qa?.blindFire?.fiftyFifty?.correctPercentage ?? 0] : [qa?.["100%Sure"]?.oneEliminate?.correctPercentage ?? 0, qa?.logicPlay?.oneEliminate?.correctPercentage ?? 0, qa?.intuitionHit?.oneEliminate?.correctPercentage ?? 0, qa?.blindFire?.oneEliminate?.correctPercentage ?? 0];

  const chartIncorrectSeries = tabIndex === 0 ? [qa?.["100%Sure"]?.fiftyFifty?.incorrectPercentage ?? 0, qa?.logicPlay?.fiftyFifty?.incorrectPercentage ?? 0, qa?.intuitionHit?.fiftyFifty?.incorrectPercentage ?? 0, qa?.blindFire?.fiftyFifty?.incorrectPercentage ?? 0] : [qa?.["100%Sure"]?.oneEliminate?.incorrectPercentage ?? 0, qa?.logicPlay?.oneEliminate?.incorrectPercentage ?? 0, qa?.intuitionHit?.oneEliminate?.incorrectPercentage ?? 0, qa?.blindFire?.oneEliminate?.incorrectPercentage ?? 0];

  const dynamicBarSeries = [
    {
      name: "Your Correct Elimination Accuracy",
      data: (chartCorrectSeries as number[]).map((item) => Math.round(item)),
    },
    {
      name: "Right Answer Accuracy After Elimination",
      data: (chartIncorrectSeries as number[]).map((item) => Math.round(item)),
    },
  ];

  return (
    <>
      <div className="relative pl-4 mb-6">
        <div className="w-1 h-full bg-success-light rounded-full absolute left-0 top-0" />
        <h2 className="text-xl font-bold text-gray-800">Polity</h2>
        <p className="text-sm text-gray-500 font-semibold">Elimination Skill Report</p>
      </div>

      <Tabs className="horizontal-tabs" orientation="horizontal" variant="scrollable" value={tabIndex} onChange={handleChange}>
        <Tab label="50 - 50" />
        <Tab label="1-OPT eliminate" />
      </Tabs>

      <div hidden={tabIndex !== 0}>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 pt-6">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 pt-6">
            <div className="flex flex-col items-center">
              <ReactApexChart options={EliminationSkillRadialBarCharts("#FE6E13", { left: RightEliminatedYes, right: TotalQuestions })} series={[Math.round(eliminationReport?.correctPercentage)]} type="radialBar" height={250} />
              <p className="mt-2 font-semibold">Your Correct Elimination Accuracy</p>
            </div>

            <div className="flex flex-col items-center">
              <ReactApexChart options={EliminationSkillRadialBarCharts("#288F66", { left: RightChosenAfterEliminationYes, right: RightEliminatedYes })} series={[Math.round(eliminationReport?.incorrectPercentage)]} type="radialBar" height={250} />
              <p className="mt-2 font-semibold">Right Answer Accuracy After Elimination</p>
            </div>
          </div>
          <div className="pt-6">
            <div className="flex flex-col items-center w-full">
              <div className="w-full">
                <ReactApexChart options={EliminationSkillBarChart} series={dynamicBarSeries} type={EliminationSkillBarChart.chart?.type} height={350} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div hidden={tabIndex !== 1}>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 pt-6">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 pt-6">
            <div className="flex flex-col items-center">
              <ReactApexChart options={EliminationSkillRadialBarCharts("#FE6E13", { left: RightEliminatedYes, right: TotalQuestions })} series={[Math.round(eliminationReport?.correctPercentage)]} type="radialBar" height={250} />
              <p className="mt-2 font-semibold">Your Correct Elimination Accuracy</p>
            </div>

            <div className="flex flex-col items-center">
              <ReactApexChart options={EliminationSkillRadialBarCharts("#288F66", { left: RightChosenAfterEliminationYes, right: RightEliminatedYes })} series={[Math.round(eliminationReport?.incorrectPercentage)]} type="radialBar" height={250} />
              <p className="mt-2 font-semibold">Right Answer Accuracy After Elimination</p>
            </div>
          </div>
          <div className="pt-6">
            <div className="flex flex-col items-center w-full">
              <div className="w-full">
                <ReactApexChart options={EliminationSkillBarChart} series={dynamicBarSeries} type={EliminationSkillBarChart.chart?.type} height={350} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EliminationSkill;
