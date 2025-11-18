import { Skeleton } from "antd";
import { useEffect, useState, type FC } from "react";
import ReactApexChart from "react-apexcharts";
import { EliminationSkillRadialBarChart } from "../../Data";
import type { FirstPoweredReportType, FullFestReportSec1Type } from "../../Types";
import FullFestSubjectFilter from "./FullFestSubjectFilter";

const AIPoweredReportAnalysis: FC<{ data: FullFestReportSec1Type; isLoading: boolean; TabIndex: number }> = ({ data, isLoading, TabIndex }) => {
  const [showChart, setShowChart] = useState(false);
  useEffect(() => {
    if (TabIndex === 1) {
      setShowChart(false);

      const timer = setTimeout(() => {
        setShowChart(true);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setShowChart(false);
    }
  }, [TabIndex]);

  const SkipDareReport = data?.qaTypeSummary?.average;
  const SubjectReport: FC<{ item: FirstPoweredReportType; title: string }> = ({ item, title }) => (
    <div className="bg-input-box rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="h-full relative py-6 ps-4 flex items-center gap-2">
        <div className="w-1 h-[70%] bg-orange-500 rounded-r absolute left-0 top-1/2 -translate-y-1/2" />
        <div className="text-left">
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-sm font-semibold mt-1 capitalize text-neutral-500">Questions answered with complete confidence and accuracy.</p>
        </div>
      </div>
      <div className="p-3">
        <ReactApexChart options={EliminationSkillRadialBarChart("#288F66")} series={[Math.round(showChart ? item?.average : 0) || 0]} type="radialBar" height={250} />
      </div>
    </div>
  );
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <FullFestSubjectFilter title="AI Powered Report Analysis" filter={false} />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 pt-5">
          {isLoading ? (
            [...Array(4)].map((_, i) => <Skeleton.Node key={i} active style={{ width: "100%", height: 140, borderRadius: 15 }} />)
          ) : (
            <>
              {SubjectReport({
                item: data?.firstPoweredReport[0],
                title: "100% Sure",
              })}
              {SubjectReport({
                item: data?.firstPoweredReport[1],
                title: "Logic Play",
              })}
              {SubjectReport({
                item: data?.firstPoweredReport[2],
                title: "Intuition Hit",
              })}
              {SubjectReport({
                item: data?.firstPoweredReport[3],
                title: "Blind Fire",
              })}
            </>
          )}
        </div>
      </div>
      <div>
        <FullFestSubjectFilter title="Skip/Dare Report" filter={true} />
        <div className="grid grid-cols-1 gap-3 pt-5">
          <h3 className="text-xl font-semibold">50 - 50</h3>
          {isLoading ? (
            <Skeleton.Node active style={{ width: "100%", height: 45, borderRadius: 5 }} />
          ) : (
            <div className="h-full relative p-3 ps-5 bg-input-box rounded-xl">
              <div className="w-1 h-[50%] bg-orange-500 rounded-r absolute left-0 top-1/2 -translate-y-1/2" />
              <div className="text-left">
                <p className="text-lg font-normal capitalize text-neutral-500">Increase your dare to improve {SkipDareReport?.fiftyFifty.toFixed(2)} marks.</p>
              </div>
            </div>
          )}
          <h3 className="text-xl font-semibold">Direct</h3>
          {isLoading ? (
            <Skeleton.Node active style={{ width: "100%", height: 45, borderRadius: 5 }} />
          ) : (
            <div className="h-full relative p-3 ps-5 bg-input-box rounded-xl">
              <div className="w-1 h-[50%] bg-orange-500 rounded-r absolute left-0 top-1/2 -translate-y-1/2" />
              <div className="text-left">
                <p className="text-lg font-normal capitalize text-neutral-500">By skipping you will save {SkipDareReport?.direct.toFixed(2)} marks.</p>
              </div>
            </div>
          )}

          <h3 className="text-xl font-semibold">1-OPT eliminate</h3>
          {isLoading ? (
            <Skeleton.Node active style={{ width: "100%", height: 45, borderRadius: 5 }} />
          ) : (
            <div className="h-full relative p-3 ps-5 bg-input-box rounded-xl">
              <div className="w-1 h-[50%] bg-orange-500 rounded-r absolute left-0 top-1/2 -translate-y-1/2" />
              <div className="text-left">
                <p className="text-lg font-normal capitalize text-neutral-500">By daring you will increase {SkipDareReport?.oneEliminate.toFixed(2)} marks.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIPoweredReportAnalysis;
