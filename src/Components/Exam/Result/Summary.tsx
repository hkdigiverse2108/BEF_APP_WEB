import { Tab, Tabs } from "@mui/material";
import { useState, type FC, type SyntheticEvent } from "react";
import type { AttemptType, QaTypeSubtopicItem, Sec1Type } from "../../../Types";

const Summary: FC<{ data: Sec1Type }> = ({ data }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const QaTypeMetrics = data?.polity?.qaTypeMetrics;

  const handleChange = (_event: SyntheticEvent, newValue: number) => setTabIndex(newValue);

  const sections = [
    { title: "Very Weak", color: "bg-danger-dark", range: "0% - 20%", items: data?.qaSubtopicSummary?.["Very Weak"]?.map((item) => item.subjectName) },
    { title: "Weak", color: "bg-danger", range: "20% - 40%", items: data?.qaSubtopicSummary?.Weak?.map((item) => item.subjectName) },
    { title: "Average", color: "bg-warning", range: "40% - 60%", items: data?.qaSubtopicSummary?.Average?.map((item) => item.subjectName) },
    { title: "Strong", color: "bg-success", range: "60% - 80%", items: data?.qaSubtopicSummary?.Strong?.map((item) => item.subjectName) },
    { title: "Very Strong", color: "bg-success-light", range: "80% - 100%", items: data?.qaSubtopicSummary?.["Very Strong"]?.map((item) => item.subjectName) },
  ];

  const sumCorrectTotal = (...items: AttemptType[]) => {
    const totalCorrect = items.reduce((a, b) => a + (b?.correct ?? 0), 0);
    const totalTotal = items.reduce((a, b) => a + (b?.total ?? 0), 0);
    return totalTotal > 0 ? Math.round((totalCorrect / totalTotal) * 100) : 0;
  };

  const direct = sumCorrectTotal(QaTypeMetrics?.["100%Sure"]?.direct, QaTypeMetrics?.logicPlay?.direct, QaTypeMetrics?.intuitionHit?.direct, QaTypeMetrics?.blindFire?.direct);
  const fiftyFifty = sumCorrectTotal(QaTypeMetrics?.["100%Sure"]?.fiftyFifty, QaTypeMetrics?.logicPlay?.fiftyFifty, QaTypeMetrics?.intuitionHit?.fiftyFifty, QaTypeMetrics?.blindFire?.fiftyFifty);
  const oneEliminate = sumCorrectTotal(QaTypeMetrics?.["100%Sure"]?.oneEliminate, QaTypeMetrics?.logicPlay?.oneEliminate, QaTypeMetrics?.intuitionHit?.oneEliminate, QaTypeMetrics?.blindFire?.oneEliminate);

  const allowedTypes = ["skip", "fearDriverSkip"];

  const getFilteredTypes = (data: QaTypeSubtopicItem[] | undefined, allowed = allowedTypes): string[] => {
    // return data?.filter((item) => !allowed.includes(item.type))?.map((item) => item.type) ?? [];
    return data?.filter((item) => item.type?.trim() && !allowed.includes(item.type))?.map((item) => item.type) ?? [];
  };

  const getBand = (value: number) => {
    if (value <= 20) return "Very Weak";
    if (value <= 40) return "Weak";
    if (value <= 60) return "Average";
    if (value <= 80) return "Strong";
    return "Very Strong";
  };

  const extraBySection: Record<string, string[]> = { "Very Weak": [], Weak: [], Average: [], Strong: [], "Very Strong": [] };

  extraBySection[getBand(direct)].push("Direct");
  extraBySection[getBand(fiftyFifty)].push("50-50");
  extraBySection[getBand(oneEliminate)].push("1 -Opt Elimination");

  const aiSections = [
    { title: "Very Weak", color: "bg-danger-dark", range: "0% - 20%", items: [...getFilteredTypes(data?.qaTypeSummaryReport?.["Very Weak"]), ...extraBySection["Very Weak"]] },
    { title: "Weak", color: "bg-danger", range: "20% - 40%", items: [...getFilteredTypes(data?.qaTypeSummaryReport?.Weak), ...extraBySection["Weak"]] },
    { title: "Average", color: "bg-warning", range: "40% - 60%", items: [...getFilteredTypes(data?.qaTypeSummaryReport?.Average), ...extraBySection["Average"]] },
    { title: "Strong", color: "bg-success", range: "60% - 80%", items: [...getFilteredTypes(data?.qaTypeSummaryReport?.Strong), ...extraBySection["Strong"]] },
    { title: "Very Strong", color: "bg-success-light", range: "80% - 100%", items: [...getFilteredTypes(data?.qaTypeSummaryReport?.["Very Strong"]), ...extraBySection["Very Strong"]] },
  ];

  const currentSections = tabIndex === 0 ? sections : aiSections;
  const formatType = (str: string) => {
    return str
      .replace(/([A-Z])/g, " $1")
      .trim()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <>
      <div className="relative pl-4 mb-6">
        <div className="w-1 h-full bg-success-light rounded-full absolute left-0 top-0" />
        <h2 className="text-xl font-semibold text-gray-800">Polity</h2>
        <p className="text-sm text-gray-500 font-normal">Summary</p>
      </div>
      <div>
        <Tabs className="horizontal-tabs" orientation="horizontal" variant="scrollable" value={tabIndex} onChange={handleChange}>
          <Tab label="Sub wise" />
          <Tab label="Attempting Strategy wise" />
        </Tabs>
        <div className="tab-panels w-full">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 pt-6">
            {currentSections?.map(({ title, color, range, items }, i) => (
              <div key={i} className="rounded-lg shadow-lg">
                <div className={`${color} px-4 py-2 rounded-t-lg text-lg text-white flex justify-between`}>
                  <h3>{title}</h3>
                  <p>{range}</p>
                </div>
                <div className="px-8 py-4 rounded-b-lg">
                  <ul className="list-disc space-y-2">
                    {items?.map((item, j) => (
                      <li key={j} className="capitalize">
                        {formatType(item)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;
