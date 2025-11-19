import { Tab, Tabs } from "@mui/material";
import { Progress } from "antd";
import { useState, type FC } from "react";
import type { QaType, Sec2Type } from "../../../Types";

const CompareCompetitor: FC<{ data: Sec2Type; subjectName: string }> = ({
  data,
  subjectName,
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) =>
    setTabIndex(newValue);

  const compare = [
    {
      title: "correct",
      color: "bg-success",
      items: [
        { items: "You", value: data?.compareWithCompetitor?.you?.correct },
        {
          items: "Others",
          value: data?.compareWithCompetitor?.others?.correct,
        },
        {
          items: "Toppers",
          value: data?.compareWithCompetitor?.toppers?.correct,
        },
      ],
    },
    {
      title: "incorrect",
      color: "bg-primary",
      items: [
        { items: "You", value: data?.compareWithCompetitor?.you?.incorrect },
        {
          items: "Others",
          value: data?.compareWithCompetitor?.others?.incorrect,
        },
        {
          items: "Toppers",
          value: data?.compareWithCompetitor?.toppers?.incorrect,
        },
      ],
    },
    {
      title: "Skip",
      color: "bg-gold",
      items: [
        { items: "You", value: data?.compareWithCompetitor?.you?.skipped },
        {
          items: "Others",
          value: data?.compareWithCompetitor?.others?.skipped,
        },
        {
          items: "Toppers",
          value: data?.compareWithCompetitor?.toppers?.skipped,
        },
      ],
    },
    {
      title: "Accuracy",
      color: "bg-purple-dark",
      items: [
        { items: "You", value: data?.compareWithCompetitor?.you?.accuracy },
        {
          items: "Others",
          value: data?.compareWithCompetitor?.others?.accuracy,
        },
        {
          items: "Toppers",
          value: data?.compareWithCompetitor?.toppers?.accuracy,
        },
      ],
    },
  ];

  const qaTypeLabels: { key: QaType; title: string }[] = [
    { key: "100%Sure", title: "100% Sure" },
    { key: "logicPlay", title: "Logic Play" },
    { key: "intuitionHit", title: "Intuition Hit Play" },
    { key: "blindFire", title: "Blind Fire" },
    { key: "50-50", title: "50-50" },
    { key: "1-OPT Eliminate", title: "1-OPT Eliminate" },
    { key: "fearDriverSkip", title: "Fear Driver Skip" },
    { key: "skip", title: "Skip" },
  ];

  const qaReport = data?.qaTypeStrategyReport ?? {};

  const aiSections = qaTypeLabels?.map(({ key, title }) => {
    const item = qaReport[key];
    return {
      title,
      you: item?.you?.accuracy ?? 0,
      others: item?.others?.accuracy ?? 0,
      toppers: item?.toppers?.accuracy ?? 0,
    };
  });

  const sections = Object.values(data?.subtopicWiseReport || {})?.map(
    (item) => ({
      title: item?.subtopicName,
      you: item?.you?.accuracy ?? 0,
      others: item?.others?.accuracy ?? 0,
      toppers: item?.toppers?.accuracy ?? 0,
    })
  );

  const currentSections = tabIndex === 0 ? sections : aiSections;

  return (
    <>
      <div className="relative pl-4 mb-6">
        <div className="w-1 h-full bg-success-light rounded-full absolute left-0 top-0" />
        <h2 className="text-xl font-semibold text-gray-800">
          Compare Competitor
        </h2>
        <p className="text-sm text-gray-500 font-normal">
          {/* let's compare with your Competitor */}
          {subjectName}
        </p>
      </div>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 pb-6">
        {compare?.map(({ title, color, items }, i) => (
          <div key={i} className="rounded-lg shadow-lg">
            <div
              className={`${color} px-4 py-2 rounded-t-lg text-lg text-white flex justify-between`}
            >
              <h3>{title}</h3>
            </div>
            <div className="px-3 sm:px-8 py-4 rounded-b-lg">
              <ul className="list-disc space-y-2">
                {items?.map((item, j) => (
                  <li key={j} className="flex justify-between w-full">
                    <span>{item.items}</span>
                    <span>{item.value || 0}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-6">
        <Tabs
          className="horizontal-tabs"
          orientation="horizontal"
          variant="scrollable"
          value={tabIndex}
          onChange={handleChange}
        >
          <Tab label="Sub wise" />
          <Tab label="Strategy wise" />
        </Tabs>
        <div className="tab-panels w-full">
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 pt-6">
            {currentSections?.map((item, i) => (
              <div
                key={i}
                className="rounded-lg shadow-lg border border-card-border"
              >
                <div className="px-4 py-2 rounded-t-lg text-lg text-black flex justify-between bg-input-box border-b border-card-border">
                  <h3>{item.title}</h3>
                </div>
                <div className="px-4 py-4 rounded-b-lg">
                  <ul className="space-y-2">
                    <li>
                      <Progress
                        percent={item.you}
                        percentPosition={{ align: "center", type: "inner" }}
                        strokeColor={"#288F66"}
                        strokeWidth={20}
                      />
                    </li>
                    <li>
                      <Progress
                        percent={item.others}
                        percentPosition={{ align: "center", type: "inner" }}
                        strokeColor={"#FE6E13"}
                        strokeWidth={20}
                        className="others"
                      />
                    </li>
                    <li>
                      <Progress
                        percent={item.toppers}
                        percentPosition={{ align: "center", type: "inner" }}
                        strokeColor={"#2d1067"}
                        strokeWidth={20}
                      />
                    </li>
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

export default CompareCompetitor;
