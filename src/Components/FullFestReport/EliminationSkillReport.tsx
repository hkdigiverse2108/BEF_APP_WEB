import { Tab, Tabs } from "@mui/material";
import { useEffect, useState, type FC } from "react";
import ReactApexChart from "react-apexcharts";
import { EliminationSkillRadialBarChart } from "../../Data";
import type { Sec2FirstPoweredReportType } from "../../Types";
import FullFestSubjectFilter from "./FullFestSubjectFilter";

const EliminationSkillReport: FC<{ EliminationSkill: Sec2FirstPoweredReportType; TabIndex: number }> = ({ EliminationSkill, TabIndex }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [showChart, setShowChart] = useState(false);
  useEffect(() => {
    if (TabIndex === 3) {
      setShowChart(false);

      const timer = setTimeout(() => {
        setShowChart(true);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setShowChart(false);
    }
  }, [TabIndex]);

  const emptyQaTypeMetrics = {
    fiftyFifty: { correctPercentage: 0, incorrectPercentage: 0 },
    oneEliminate: { correctPercentage: 0, incorrectPercentage: 0 },
  };

  const emptyQa = {
    "100%Sure": emptyQaTypeMetrics,
    logicPlay: emptyQaTypeMetrics,
    intuitionHit: emptyQaTypeMetrics,
    blindFire: emptyQaTypeMetrics,
  };

  const Qa = showChart && EliminationSkill?.qa ? EliminationSkill.qa : emptyQa;

  const QaTypeMetrics = showChart && EliminationSkill?.qaTypeMetrics ? EliminationSkill.qaTypeMetrics : emptyQaTypeMetrics;

  const EliminationReport = tabIndex === 0 ? QaTypeMetrics?.fiftyFifty : QaTypeMetrics?.oneEliminate;

  const Sure = tabIndex === 0 ? Qa?.["100%Sure"]?.fiftyFifty : Qa?.["100%Sure"]?.oneEliminate;
  const LogicPlay = tabIndex === 0 ? Qa?.logicPlay?.fiftyFifty : Qa?.logicPlay?.oneEliminate;
  const IntuitionHit = tabIndex === 0 ? Qa?.intuitionHit?.fiftyFifty : Qa?.intuitionHit?.oneEliminate;
  const BlindFire = tabIndex === 0 ? Qa?.blindFire?.fiftyFifty : Qa?.blindFire?.oneEliminate;

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue);
  return (
    <div>
      <FullFestSubjectFilter title="Elimination Skill Report" filter={true} />
      <div className="pt-5 lg:w-2/4 mx-auto">
        <Tabs className="horizontal-tabs" orientation="horizontal" variant="scrollable" value={tabIndex} onChange={handleChange}>
          <Tab label="50 - 50" />
          <Tab label="1-OPT eliminate" />
        </Tabs>
        <div className="pt-6">
          <div className="bg-input-box rounded-xl grid gap-4 grid-cols-1 md:grid-cols-2 ">
            <div className="flex flex-col items-center p-4">
              <ReactApexChart options={EliminationSkillRadialBarChart("#FE6E13")} series={[Math.round(EliminationReport?.correctPercentage) || 0]} type="radialBar" height={250} />
              <p className="mt-2 font-normal text-center">Your Correct Elimination Accuracy</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <ReactApexChart options={EliminationSkillRadialBarChart("#288F66")} series={[Math.round(EliminationReport?.incorrectPercentage) || 0]} type="radialBar" height={250} />
              <p className="mt-2 font-normal text-center">Right Answer Accuracy After Elimination</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 pt-5">
        <div className="bg-input-box rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="h-full relative py-6 ps-4 flex items-center gap-2">
            <div className="w-1 h-[70%] bg-orange-500 rounded-r absolute left-0 top-1/2 -translate-y-1/2" />
            <div className="text-left">
              <h3 className="text-2xl font-semibold">100% Sure</h3>
              <p className="text-sm font-normal mt-1 capitalize text-neutral-500">Overall progress showing clear elimination of wrong options and how many times it led to the correct answer.</p>
            </div>
          </div>
          <div className="p-3 grid grid-cols-2">
            <div className="">
              <ReactApexChart options={EliminationSkillRadialBarChart("#FE6E13")} series={[Math.round(Sure?.correctPercentage) || 0]} type="radialBar" height={250} />
              <p className="mt-2 font-normal text-xs text-center text-neutral-500">Elimination Skill Accuracy</p>
            </div>
            <div className="">
              <ReactApexChart options={EliminationSkillRadialBarChart("#288F66")} series={[Math.round(Sure?.incorrectPercentage) || 0]} type="radialBar" height={250} />
              <p className="mt-2 font-normal text-xs text-center text-neutral-500">Right Answer Accuracy</p>
            </div>
          </div>
        </div>
        <div className="bg-input-box rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="h-full relative py-6 ps-4 flex items-center gap-2">
            <div className="w-1 h-[70%] bg-orange-500 rounded-r absolute left-0 top-1/2 -translate-y-1/2" />
            <div className="text-left">
              <h3 className="text-2xl font-semibold">Logic Play</h3>
              <p className="text-sm font-normal mt-1 capitalize text-neutral-500">Overall progress showing reasoning-based elimination and how many times it resulted in the correct answer.</p>
            </div>
          </div>
          <div className="p-3 grid grid-cols-2">
            <div className="">
              <ReactApexChart options={EliminationSkillRadialBarChart("#FE6E13")} series={[Math.round(LogicPlay?.correctPercentage) || 0]} type="radialBar" height={250} />
              <p className="mt-2 font-normal text-xs text-center text-neutral-500">Elimination Skill Accuracy</p>
            </div>
            <div className="">
              <ReactApexChart options={EliminationSkillRadialBarChart("#288F66")} series={[Math.round(LogicPlay?.incorrectPercentage) || 0]} type="radialBar" height={250} />
              <p className="mt-2 font-normal text-xs text-center text-neutral-500">Right Answer Accuracy</p>
            </div>
          </div>
        </div>
        <div className="bg-input-box rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="h-full relative py-6 ps-4 flex items-center gap-2">
            <div className="w-1 h-[70%] bg-orange-500 rounded-r absolute left-0 top-1/2 -translate-y-1/2" />
            <div className="text-left">
              <h3 className="text-2xl font-bold">Intuition Hit</h3>
              <p className="text-sm font-normal mt-1 capitalize text-neutral-500">Overall progress showing instinct-driven elimination and how many times it helped reach the correct answer.</p>
            </div>
          </div>
          <div className="p-3 grid grid-cols-2">
            <div className="">
              <ReactApexChart options={EliminationSkillRadialBarChart("#FE6E13")} series={[Math.round(IntuitionHit?.correctPercentage) || 0]} type="radialBar" height={250} />
              <p className="mt-2 font-normal text-xs text-center text-neutral-500">Elimination Skill Accuracy</p>
            </div>
            <div className="">
              <ReactApexChart options={EliminationSkillRadialBarChart("#288F66")} series={[Math.round(IntuitionHit?.incorrectPercentage) || 0]} type="radialBar" height={250} />
              <p className="mt-2 font-normal text-xs text-center text-neutral-500">Right Answer Accuracy</p>
            </div>
          </div>
        </div>
        <div className="bg-input-box rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="h-full relative py-6 ps-4 flex items-center gap-2">
            <div className="w-1 h-[70%] bg-orange-500 rounded-r absolute left-0 top-1/2 -translate-y-1/2" />
            <div className="text-left">
              <h3 className="text-2xl font-bold">Blind Fire</h3>
              <p className="text-sm font-semibold mt-1 capitalize text-neutral-500">Overall progress showing uncertain elimination attempts and how many times they still ended in the correct answer.</p>
            </div>
          </div>
          <div className="p-3 grid grid-cols-2">
            <div className="">
              <ReactApexChart options={EliminationSkillRadialBarChart("#FE6E13")} series={[Math.round(BlindFire?.correctPercentage) || 0]} type="radialBar" height={250} />
              <p className="mt-2 font-normal text-xs text-center text-neutral-500">Elimination Skill Accuracy</p>
            </div>
            <div className="">
              <ReactApexChart options={EliminationSkillRadialBarChart("#288F66")} series={[Math.round(BlindFire?.incorrectPercentage) || 0]} type="radialBar" height={250} />
              <p className="mt-2 font-normal text-xs text-center text-neutral-500">Right Answer Accuracy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EliminationSkillReport;
