import { Tab, Tabs } from "@mui/material";
import { useState, type FC } from "react";
import { Empty } from "antd";
import type { SubjectSummaryItem, SubjectSummaryType } from "../../Types";
import FullFestSubjectFilter from "./FullFestSubjectFilter";
import { Skeleton } from "antd";

const Summary: FC<{
  AttemptingStrategyWise: SubjectSummaryType;
  SubWise: SubjectSummaryType;
  isLoading: boolean;
}> = ({ AttemptingStrategyWise, SubWise, isLoading }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue);
  const allowedTypes = ["skip", "fearDriverSkip"];

  const formatType = (str: string) => {
    if (!str) return "";

    const formatted = str
      .replace(/([A-Z])/g, " $1")
      .trim()
      .replace(/\b\w/g, (c) => c.toUpperCase());

    if (formatted === "One Eliminate") return "1 - Opt Elimination";
    if (formatted === "Fifty Fifty") return "50 - 50";

    return formatted;
  };

  const getFilteredTypes = (data: SubjectSummaryItem[] | undefined, allowed = allowedTypes): string[] => {
    return data?.filter((item) => item.type?.trim() && !allowed.includes(item.type))?.map((item) => formatType(item.type)) ?? [];
  };

  const aiSections = [
    { title: "Very Weak", color: "bg-danger-dark", range: "0% - 20%", items: [...getFilteredTypes(SubWise?.["Very Weak"])] },
    { title: "Weak", color: "bg-danger", range: "20% - 40%", items: [...getFilteredTypes(SubWise?.Weak)] },
    { title: "Average", color: "bg-warning", range: "40% - 60%", items: [...getFilteredTypes(SubWise?.Average)] },
    { title: "Strong", color: "bg-success", range: "60% - 80%", items: [...getFilteredTypes(SubWise?.Strong)] },
    { title: "Very Strong", color: "bg-success-light", range: "80% - 100%", items: [...getFilteredTypes(SubWise?.["Very Strong"])] },
  ];

  const Sections = [
    { title: "Very Weak", color: "bg-danger-dark", range: "0% - 20%", items: AttemptingStrategyWise?.["Very Weak"]?.map((item) => item?.subjectName) },
    { title: "Weak", color: "bg-danger", range: "20% - 40%", items: AttemptingStrategyWise?.Weak?.map((item) => item?.subjectName) },
    { title: "Average", color: "bg-warning", range: "40% - 60%", items: AttemptingStrategyWise?.Average?.map((item) => item?.subjectName) },
    { title: "Strong", color: "bg-success", range: "60% - 80%", items: AttemptingStrategyWise?.Strong?.map((item) => item?.subjectName) },
    { title: "Very Strong", color: "bg-success-light", range: "80% - 100%", items: AttemptingStrategyWise?.["Very Strong"]?.map((item) => item?.subjectName) },
  ];
  const currentSections = tabIndex === 0 ? Sections : aiSections;
  const totalItems = currentSections.reduce((sum, s) => sum + (s.items?.length || 0), 0);

  return (
    <div>
      <FullFestSubjectFilter title="Summary" filter={true} />
      <div className="pt-5">
        <Tabs className="fest-tabs w-fit" orientation="horizontal" variant="scrollable" value={tabIndex} onChange={handleChange}>
          <Tab label="Sub wise" />
          <Tab label="Attempting Strategy wise" />
        </Tabs>
        <div className="tab-panels w-full">
          {totalItems === 0 && !isLoading ? (
            <div className="flex justify-center items-center w-full py-10">
              <Empty description="No summary data yet. Play a contest to generate your report." />
            </div>
          ) : (
          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 pt-6">
            {currentSections.map(({ title, color, range, items }, i) => (
              <div key={i} className="bef-card">
                <div className={`${color} px-4 py-2.5 text-base sm:text-lg text-white flex justify-between gap-2`}>
                  <h3 className="font-heading font-bold truncate">{title}</h3>
                  <p className="text-xs sm:text-sm font-semibold whitespace-nowrap">{range}</p>
                </div>
                <div className="px-6 sm:px-8 py-4">
                  <ul className="list-disc space-y-2 skeleton text-sm text-muted-foreground">
                    {isLoading ? (
                      <Skeleton active paragraph={{ rows: 1 }}/>
                    ) : (
                      items?.map((item, j) => (
                        <li key={j} className="capitalize">
                          {item}
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summary;
