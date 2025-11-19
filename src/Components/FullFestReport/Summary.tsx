import { Tab, Tabs } from "@mui/material";
import { useState, type FC } from "react";
import type { SubjectSummaryItem, SubjectSummaryType } from "../../Types";
import FullFestSubjectFilter from "./FullFestSubjectFilter";

const Summary: FC<{
  AttemptingStrategyWise: SubjectSummaryType;
  SubWise: SubjectSummaryType;
}> = ({ AttemptingStrategyWise, SubWise }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue);
  const allowedTypes = ["skip", "fearDriverSkip"];

  const formatType = (str: string) => {
    return str
      ?.replace(/([A-Z])/g, " $1")
      .trim()
      .replace(/\b\w/g, (c) => c.toUpperCase());
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

  return (
    <div>
      <FullFestSubjectFilter title="Summary" filter={true} />
      <div className="pt-5">
        <Tabs className="horizontal-tabs xl:w-1/2 mx-auto" orientation="horizontal" variant="scrollable" value={tabIndex} onChange={handleChange}>
          <Tab label="Sub wise" />
          <Tab label="Attempting Strategy wise" />
        </Tabs>
        <div className="tab-panels w-full">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 pt-6">
            {currentSections.map(({ title, color, range, items }, i) => (
              <div key={i} className="rounded-lg shadow-lg bg-white">
                <div className={`${color} px-4 py-2 rounded-t-lg text-lg text-white flex justify-between`}>
                  <h3>{title}</h3>
                  <p>{range}</p>
                </div>
                <div className="px-8 py-4 rounded-b-lg">
                  <ul className="list-disc space-y-2">
                    {items?.map((item, j) => (
                      <li key={j} className="capitalize">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
