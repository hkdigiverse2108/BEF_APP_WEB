import { useState, type FC } from "react";
import { FormSelect } from "../../Attribute/FormFields";
import { LanguageOptions } from "../../Data";
import { Tab, Tabs } from "@mui/material";
import type { SubjectSummaryItem, SubjectSummaryType } from "../../Types";

const Summary: FC<{ AttemptingStrategyWise: SubjectSummaryType; SubWise: SubjectSummaryType }> = ({ AttemptingStrategyWise, SubWise }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue);
  const allowedTypes = ["skip", "fearDriverSkip"];

  const getFilteredTypes = (data: SubjectSummaryItem[] | undefined, allowed = allowedTypes): string[] => {
    return data?.filter((item) => !allowed.includes(item?.type))?.map((item) => item?.type) ?? [];
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
      <div className="flex justify-between items-center">
        <div className="relative px-4">
          <div className="w-1 h-[100%] bg-success rounded-full absolute left-0 top-0" />
          <h2 className="text-xl font-bold ">Summary</h2>
        </div>
        <div className="flex justify-end question-section">
          <FormSelect name="Language" placeholder="Subject" options={LanguageOptions} className="!m-0" value="english" />
        </div>
      </div>
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
                      <li key={j}>{item}</li>
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
