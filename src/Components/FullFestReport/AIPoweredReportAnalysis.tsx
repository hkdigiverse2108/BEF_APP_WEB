import { Skeleton } from "antd";
import { useEffect, useState, type FC } from "react";
import ReactApexChart from "react-apexcharts";
import { EliminationSkillRadialBarChart } from "../../Data";
import type { FirstPoweredReportType, FullFestReportSec1Type } from "../../Types";
import FullFestSubjectFilter from "./FullFestSubjectFilter";

const AIPoweredReportAnalysis: FC<{
  data: FullFestReportSec1Type;
  isLoading: boolean;
  TabIndex: number;
}> = ({ data, isLoading, TabIndex }) => {
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
  const firstPoweredList = data?.firstPoweredReport ?? [];
  const skipDareNumber = (value: number | undefined) => Number((value ?? 0).toFixed(2));
  const SubjectReport: FC<{ item: FirstPoweredReportType; title: string; description: string }> = ({ item, title, description }) => (
    <div className="bef-card grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="h-full relative py-6 ps-4 flex items-center gap-2">
        <div className="w-1 h-[70%] bg-primary rounded-r absolute left-0 top-1/2 -translate-y-1/2" />
        <div className="text-left">
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground">{title}</h3>
          <p className="text-xs sm:text-sm font-medium mt-1 capitalize text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="p-3">
        <ReactApexChart options={EliminationSkillRadialBarChart("#F68122")} series={[Math.round(showChart ? item?.average : 0) || 0]} type="radialBar" height={250} />
      </div>
    </div>
  );

  const SkipDareReportMessage = (value: number) => {
    const PositiveMessage = `By daring you will increase ${value} marks.`;
    const NegativeMessage = ` By skipping you will save  ${value} marks.`;
    const NoData = `No Data Available.`;

    if (value > 0) {
      return PositiveMessage;
    } else if (value < 0) {
      return NegativeMessage;
    } else {
      return NoData;
    }
  };

  return (
    <div className="grid grid-cols-1 gap-5 sm:gap-7 xl:grid-cols-[1.22fr_0.78fr]">
      <div>
        <FullFestSubjectFilter title="AI Powered Report Analysis" filter={false} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 pt-5">
          {isLoading ? (
            [...Array(4)].map((_, i) => <Skeleton.Node key={i} active style={{ width: "100%", height: 140, borderRadius: 12 }} />)
          ) : (
            <>
              {SubjectReport({ item: firstPoweredList[0], title: "100% Sure", description: "Overall progress showing answers solved with total clarity and accuracy" })}
              {SubjectReport({ item: firstPoweredList[1], title: "Logic Play", description: "Reflects how often logic guided correct solutions till now" })}
              {SubjectReport({ item: firstPoweredList[2], title: "Intuition Hit", description: "Indicates how intuition helped across previous tests" })}
              {SubjectReport({ item: firstPoweredList[3], title: "Blind Fire", description: "Highlights risky attempts across all past tests" })}
            </>
          )}
        </div>
      </div>
      <div>
        <FullFestSubjectFilter title="Skip/Dare Report" filter={true} />
        <div className="grid grid-cols-1 gap-3 pt-5">
          <h3 className="font-heading text-base sm:text-lg font-bold text-foreground">50 - 50</h3>
          {isLoading ? (
            <Skeleton.Node active style={{ width: "100%", height: 45, borderRadius: 8 }} />
          ) : (
            <div className="h-full relative p-3 ps-5 rounded-xl border border-border bg-secondary">
              <div className="w-1 h-[50%] bg-gradient-to-b from-primary to-accent rounded-r absolute left-0 top-1/2 -translate-y-1/2" />
              <div className="text-left">
                <p className="text-sm sm:text-base font-normal capitalize text-muted-foreground">{SkipDareReportMessage(Math.abs(skipDareNumber(SkipDareReport?.fiftyFifty)))}</p>
              </div>
            </div>
          )}
          <h3 className="font-heading text-base sm:text-lg font-bold text-foreground">Direct</h3>
          {isLoading ? (
            <Skeleton.Node active style={{ width: "100%", height: 45, borderRadius: 8 }} />
          ) : (
            <div className="h-full relative p-3 ps-5 rounded-xl border border-border bg-secondary">
              <div className="w-1 h-[50%] bg-gradient-to-b from-primary to-accent rounded-r absolute left-0 top-1/2 -translate-y-1/2" />
              <div className="text-left">
                <p className="text-sm sm:text-base font-normal capitalize text-muted-foreground">{SkipDareReportMessage(Math.abs(skipDareNumber(SkipDareReport?.direct)))}</p>
              </div>
            </div>
          )}

          <h3 className="font-heading text-base sm:text-lg font-bold text-foreground">1-OPT eliminate</h3>
          {isLoading ? (
            <Skeleton.Node active style={{ width: "100%", height: 45, borderRadius: 8 }} />
          ) : (
            <div className="h-full relative p-3 ps-5 rounded-xl border border-border bg-secondary">
              <div className="w-1 h-[50%] bg-gradient-to-b from-primary to-accent rounded-r absolute left-0 top-1/2 -translate-y-1/2" />
              <div className="text-left">
                <p className="text-sm sm:text-base font-normal capitalize text-muted-foreground">{SkipDareReportMessage(Math.abs(skipDareNumber(SkipDareReport?.oneEliminate)))}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIPoweredReportAnalysis;
