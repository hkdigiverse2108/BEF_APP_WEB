import type { FC } from "react";
import type { MistakeMapReportType } from "../../Types";
import FullFestSubjectFilter from "./FullFestSubjectFilter";
import { Empty, Skeleton } from "antd";

const MistakeMapReport: FC<{ MistakeMapReport: MistakeMapReportType[]; isLoading: boolean }> = ({ MistakeMapReport, isLoading }) => {
  const formatType = (str: string) => {
    return str
      .replace(/([A-Z])/g, " $1")
      .trim()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };
  return (
    <div>
      <FullFestSubjectFilter title="Mistake Map Report" filter={true} />

      <div className="pt-5">
        <div className={`grid gap-4 ${(MistakeMapReport?.length || 0) > 0 ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5" : "grid-cols-1"}  w-full `}>
          {isLoading ? (
            [...Array(5)].map((_, i) => <Skeleton.Node key={i} active style={{ width: "100%", height: 140, borderRadius: 12 }} />)
          ) : (MistakeMapReport?.length || 0) > 0 ? (
            MistakeMapReport?.map((item, i) => (
              <div key={i} className="bef-card">
                <div className={`px-4 py-2.5 font-heading font-bold text-base sm:text-lg text-white flex justify-between gap-2 capitalize ${i === 0 ? "bg-danger-dark" : i === 1 ? "bg-danger" : i === 2 ? "bg-warning" : i === 3 ? "bg-success" : "bg-success-light"}`}>
                  <h3>{formatType(item?.whyFalse)}</h3>
                  <p>{item?.total}</p>
                </div>
                <div className="overflow-hidden">
                  <ul className="list-disc space-y-2 max-h-100 overflow-y-auto overflow-x-hidden">
                    {item?.subtopicName?.map((item, j) => (
                      <li key={j} className="flex justify-between w-full border-b border-border p-3 sm:px-4 m-0 text-sm text-foreground">
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center w-full py-10">
              <Empty description="No mistakes recorded yet. Play a contest to see your mistake map." />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MistakeMapReport;
