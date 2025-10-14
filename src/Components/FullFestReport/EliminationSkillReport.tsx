import ReactApexChart from "react-apexcharts";
import { FormSelect } from "../../Attribute/FormFields";
import { EliminationSkillRadialBarChart, LanguageOptions } from "../../Data";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";

const EliminationSkillReport = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue);
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="relative px-4">
          <div className="w-1 h-[100%] bg-success rounded-full absolute left-0 top-0" />
          <h2 className="text-xl font-bold ">Elimination Skill Report</h2>
        </div>
        <div className="flex justify-end question-section">
          <FormSelect name="Language" placeholder="Subject" options={LanguageOptions} className="!m-0" value="english" />
        </div>
      </div>
      <div className="pt-5 lg:w-2/4 mx-auto">
        <Tabs className="horizontal-tabs" orientation="horizontal" variant="scrollable" value={tabIndex} onChange={handleChange}>
          <Tab label="50 - 50" />
          <Tab label="1-OPT eliminate" />
        </Tabs>
        <div hidden={tabIndex !== 0}>
          <div className="pt-6">
            <div className="bg-input-box rounded-xl grid gap-4 grid-cols-1 md:grid-cols-2 ">
              <div className="flex flex-col items-center p-4">
                <ReactApexChart options={EliminationSkillRadialBarChart("#FE6E13")} series={[60]} type="radialBar" height={250} />
                <p className="mt-2 font-semibold text-center">Your Correct Elimination Accuracy</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <ReactApexChart options={EliminationSkillRadialBarChart("#288F66")} series={[10]} type="radialBar" height={250} />
                <p className="mt-2 font-semibold text-center">Right Answer Accuracy After Elimination</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 pt-5">
        <div className="bg-input-box rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="h-full relative py-6 ps-4 flex items-center gap-2">
            <div className="w-1 h-[70%] bg-orange-500 rounded-r absolute left-0 top-1/2 -translate-y-1/2" />
            <div className="text-left">
              <h3 className="text-2xl font-bold">100% Sure</h3>
              <p className="text-sm font-semibold mt-1 capitalize text-neutral-500">Questions answered with complete confidence and accuracy.</p>
            </div>
          </div>
          <div className="p-3 grid grid-cols-2">
            <div className="">
              <ReactApexChart options={EliminationSkillRadialBarChart("#FE6E13")} series={[60]} type="radialBar" height={250} />
              <p className="mt-2 font-semibold text-xs text-center text-neutral-500">Elimination Skill Accuracy</p>
            </div>
            <div className="">
              <ReactApexChart options={EliminationSkillRadialBarChart("#288F66")} series={[60]} type="radialBar" height={250} />
              <p className="mt-2 font-semibold text-xs text-center text-neutral-500">Right Answer Accuracy</p>
            </div>
          </div>
        </div>
        <div className="bg-input-box rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="h-full relative py-6 ps-4 flex items-center gap-2">
            <div className="w-1 h-[70%] bg-orange-500 rounded-r absolute left-0 top-1/2 -translate-y-1/2" />
            <div className="text-left">
              <h3 className="text-2xl font-bold">LogicPlay</h3>
              <p className="text-sm font-semibold mt-1 capitalize text-neutral-500">Questions answered with complete confidence and accuracy.</p>
            </div>
          </div>
          <div className="p-3 grid grid-cols-2">
            <div className="">
              <ReactApexChart options={EliminationSkillRadialBarChart("#FE6E13")} series={[60]} type="radialBar" height={250} />
              <p className="mt-2 font-semibold text-xs text-center text-neutral-500">Elimination Skill Accuracy</p>
            </div>
            <div className="">
              <ReactApexChart options={EliminationSkillRadialBarChart("#288F66")} series={[60]} type="radialBar" height={250} />
              <p className="mt-2 font-semibold text-xs text-center text-neutral-500">Right Answer Accuracy</p>
            </div>
          </div>
        </div>
        <div className="bg-input-box rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="h-full relative py-6 ps-4 flex items-center gap-2">
            <div className="w-1 h-[70%] bg-orange-500 rounded-r absolute left-0 top-1/2 -translate-y-1/2" />
            <div className="text-left">
              <h3 className="text-2xl font-bold">IntuitionHit</h3>
              <p className="text-sm font-semibold mt-1 capitalize text-neutral-500">Questions answered with complete confidence and accuracy.</p>
            </div>
          </div>
          <div className="p-3 grid grid-cols-2">
            <div className="">
              <ReactApexChart options={EliminationSkillRadialBarChart("#FE6E13")} series={[60]} type="radialBar" height={250} />
              <p className="mt-2 font-semibold text-xs text-center text-neutral-500">Elimination Skill Accuracy</p>
            </div>
            <div className="">
              <ReactApexChart options={EliminationSkillRadialBarChart("#288F66")} series={[60]} type="radialBar" height={250} />
              <p className="mt-2 font-semibold text-xs text-center text-neutral-500">Right Answer Accuracy</p>
            </div>
          </div>
        </div>
        <div className="bg-input-box rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="h-full relative py-6 ps-4 flex items-center gap-2">
            <div className="w-1 h-[70%] bg-orange-500 rounded-r absolute left-0 top-1/2 -translate-y-1/2" />
            <div className="text-left">
              <h3 className="text-2xl font-bold">BlindFire</h3>
              <p className="text-sm font-semibold mt-1 capitalize text-neutral-500">Questions answered with complete confidence and accuracy.</p>
            </div>
          </div>
          <div className="p-3 grid grid-cols-2">
            <div className="">
              <ReactApexChart options={EliminationSkillRadialBarChart("#FE6E13")} series={[60]} type="radialBar" height={250} />
              <p className="mt-2 font-semibold text-xs text-center text-neutral-500">Elimination Skill Accuracy</p>
            </div>
            <div className="">
              <ReactApexChart options={EliminationSkillRadialBarChart("#288F66")} series={[60]} type="radialBar" height={250} />
              <p className="mt-2 font-semibold text-xs text-center text-neutral-500">Right Answer Accuracy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EliminationSkillReport;
