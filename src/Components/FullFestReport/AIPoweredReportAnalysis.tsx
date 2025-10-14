import ReactApexChart from "react-apexcharts";
import { FormSelect } from "../../Attribute/FormFields";
import { EliminationSkillRadialBarChart, LanguageOptions } from "../../Data";

const AIPoweredReportAnalysis = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <div className="flex justify-between items-center">
          <div className="relative px-4">
            <div className="w-1 h-[100%] bg-success rounded-full absolute left-0 top-0" />
            <h2 className="text-xl font-bold ">AI Powered Report Analysis</h2>
          </div>
          <div className="flex justify-end question-section">
            <FormSelect name="Language" placeholder="Subject" options={LanguageOptions} className="!m-0" value="english" />
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
            <div className="p-3">
              <ReactApexChart options={EliminationSkillRadialBarChart("#288F66")} series={[60]} type="radialBar" height={250} />
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
            <div className="p-3">
              <ReactApexChart options={EliminationSkillRadialBarChart("#288F66")} series={[60]} type="radialBar" height={250} />
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
            <div className="p-3">
              <ReactApexChart options={EliminationSkillRadialBarChart("#288F66")} series={[60]} type="radialBar" height={250} />
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
            <div className="p-3">
              <ReactApexChart options={EliminationSkillRadialBarChart("#288F66")} series={[60]} type="radialBar" height={250} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <div className="relative px-4">
            <div className="w-1 h-[100%] bg-success rounded-full absolute left-0 top-0" />
            <h2 className="text-xl font-bold ">Skip/Dare Report</h2>
          </div>
          <div className="flex justify-end question-section">
            <FormSelect name="Language" placeholder="Subject" options={LanguageOptions} className="!m-0" value="english" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 pt-5">
          <h3 className="text-xl font-bold">100% Sure</h3>
          <div className="h-full relative p-3 ps-5 bg-input-box rounded-xl">
            <div className="w-1 h-[50%] bg-orange-500 rounded-r absolute left-0 top-1/2 -translate-y-1/2" />
            <div className="text-left">
              <p className="text-lg font-semibold capitalize text-neutral-500">Questions answered with complete confidence and accuracy.</p>
            </div>
          </div>
          <h3 className="text-xl font-bold">100% Sure</h3>
          <div className="h-full relative p-3 ps-5 bg-input-box rounded-xl">
            <div className="w-1 h-[50%] bg-orange-500 rounded-r absolute left-0 top-1/2 -translate-y-1/2" />
            <div className="text-left">
              <p className="text-lg font-semibold capitalize text-neutral-500">Questions answered with complete confidence and accuracy.</p>
            </div>
          </div>
          <h3 className="text-xl font-bold">100% Sure</h3>
          <div className="h-full relative p-3 ps-5 bg-input-box rounded-xl">
            <div className="w-1 h-[50%] bg-orange-500 rounded-r absolute left-0 top-1/2 -translate-y-1/2" />
            <div className="text-left">
              <p className="text-lg font-semibold capitalize text-neutral-500">Questions answered with complete confidence and accuracy.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPoweredReportAnalysis;
