import type { FC } from "react";
import { FormSelect } from "../../Attribute/FormFields";
import { LanguageOptions } from "../../Data";
import type { MistakeMapReportType } from "../../Types";
import FullFestSubjectFilter from "./FullFestSubjectFilter";

const MistakeMapReport: FC<{ MistakeMapReport: MistakeMapReportType[] }> = ({
  MistakeMapReport,
}) => {
  const formatType = (str: string) => {
    return str
      .replace(/([A-Z])/g, " $1")
      .trim()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };
  return (
    <div>
      {/* <div className="flex justify-between items-center">
        <div className="relative px-4">
          <div className="w-1 h-[100%] bg-success rounded-full absolute left-0 top-0" />
          <h2 className="text-xl font-semibold ">Mistake Map Report</h2>
        </div>
        <div className="flex justify-end question-section">
          <FormSelect
            name="Language"
            placeholder="Subject"
            options={LanguageOptions}
            className="!m-0"
            value="english"
          />
        </div>
      </div> */}
      <FullFestSubjectFilter title="Mistake Map Report" filter={true} />

      <div className="pt-5">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 w-full">
          {MistakeMapReport?.map((item, i) => (
            <div key={i} className="rounded-lg shadow-lg bg-white">
              <div
                className={`px-4 py-2 font-semibold rounded-t-lg text-lg text-white flex justify-between capitalize ${
                  i === 0
                    ? "bg-danger-dark"
                    : i === 1
                    ? "bg-danger"
                    : i === 2
                    ? "bg-warning"
                    : i === 3
                    ? "bg-success"
                    : "bg-success-light"
                }`}
              >
                <h3>{formatType(item?.whyFalse)}</h3>
                <p>{item?.total}</p>
              </div>
              {/* <div className="rounded-b-lg overflow-hidden">
                <ul className="list-disc space-y-2 h-100 max-h-100 overflow-y-auto overflow-x-hidden">
                  {items.map((item, j) => (
                    <li key={j} className="flex justify-between w-full border-b border-card-border p-3 sm:px-4 m-0">
                      <span>{item.items}</span>
                      <span>{item.value}</span>
                    </li>
                  ))}
                  {items.length === 0 && (
                    <li className="flex justify-center items-center h-100 w-full p-3 sm:px-4">
                      <Empty />
                    </li>
                  )}
                </ul>
              </div> */}
            </div>
          ))}
          {/* {compare.map(({ title, color, items, value }, i) => (
            <div key={i} className="rounded-lg shadow-lg bg-white">
              <div className={`${color} px-4 py-2 rounded-t-lg text-lg text-white flex justify-between capitalize`}>
                <h3>{title}</h3>
                <p>{value}</p>
              </div>
              <div className="rounded-b-lg overflow-hidden">
                <ul className="list-disc space-y-2 h-100 max-h-100 overflow-y-auto overflow-x-hidden">
                  {items.map((item, j) => (
                    <li key={j} className="flex justify-between w-full border-b border-card-border p-3 sm:px-4 m-0">
                      <span>{item.items}</span>
                      <span>{item.value}</span>
                    </li>
                  ))}
                  {items.length === 0 && (
                    <li className="flex justify-center items-center h-100 w-full p-3 sm:px-4">
                      <Empty />
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default MistakeMapReport;
