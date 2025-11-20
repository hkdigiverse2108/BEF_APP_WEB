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
        <div className={`grid gap-4 ${MistakeMapReport?.length !== 0 ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5" : "grid-cols-1"}  w-full `}>
          {isLoading ? (
            [...Array(5)].map((_, i) => <Skeleton.Node key={i} active style={{ width: "100%", height: 140, borderRadius: 10 }} />)
          ) : MistakeMapReport?.length !== 0 ? (
            MistakeMapReport?.map((item, i) => (
              <div key={i} className="rounded-lg shadow-lg bg-white">
                <div className={`px-4 py-2 font-semibold rounded-t-lg text-lg text-white flex justify-between capitalize ${i === 0 ? "bg-danger-dark" : i === 1 ? "bg-danger" : i === 2 ? "bg-warning" : i === 3 ? "bg-success" : "bg-success-light"}`}>
                  <h3>{formatType(item?.whyFalse)}</h3>
                  <p>{item?.total}</p>
                </div>
                <div className="rounded-b-lg overflow-hidden">
                  <ul className="list-disc space-y-2 max-h-100 overflow-y-auto overflow-x-hidden">
                    {item?.subtopicName?.map((item, j) => (
                      <li key={j} className="flex justify-between w-full border-b border-card-border p-3 sm:px-4 m-0">
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center w-full">
              <Empty />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MistakeMapReport;
