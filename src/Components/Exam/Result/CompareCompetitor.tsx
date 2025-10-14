import { Tab, Tabs } from "@mui/material";
import { Progress } from "antd";
import { useState } from "react";

const aiSections = [
  { title: "100% sure", you: 20, others: 30, toppers: 40 },
  { title: "Logic Play", you: 20, others: 30, toppers: 40 },
  { title: "Intuition Hit play", you: 20, others: 30, toppers: 40 },
  { title: "Blind fire", you: 20, others: 30, toppers: 40 },
  { title: "50-50", you: 20, others: 30, toppers: 40 },
  { title: "Lopt 1-OPT eliminate", you: 20, others: 30, toppers: 40 },
  { title: "fear skip", you: 20, others: 30, toppers: 40 },
];

const compare = [
  {
    title: "correct",
    color: "bg-success",
    items: [
      { items: "You", value: "20" },
      { items: "Others", value: "30" },
      { items: "Toppers", value: "40" },
    ],
  },
  {
    title: "incorrect",
    color: "bg-primary",
    items: [
      { items: "You", value: "20" },
      { items: "Others", value: "30" },
      { items: "Toppers", value: "40" },
    ],
  },
  {
    title: "Skip",
    color: "bg-gold",
    items: [
      { items: "You", value: "20" },
      { items: "Others", value: "30" },
      { items: "Toppers", value: "40" },
    ],
  },
  {
    title: "Correct",
    color: "bg-purple-dark",
    items: [
      { items: "You", value: "20" },
      { items: "Others", value: "30" },
      { items: "Toppers", value: "40" },
    ],
  },
];

const CompareCompetitor = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue);
  return (
    <>
      <div className="relative pl-4 mb-6">
        <div className="w-1 h-full bg-success-light rounded-full absolute left-0 top-0" />
        <h2 className="text-xl font-bold text-gray-800">Polity</h2>
        <p className="text-sm text-gray-500 font-semibold">let's compare with your Competitor</p>
      </div>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 pb-6">
        {compare.map(({ title, color, items }, i) => (
          <div key={i} className="rounded-lg shadow-lg">
            <div className={`${color} px-4 py-2 rounded-t-lg text-lg text-white flex justify-between`}>
              <h3>{title}</h3>
            </div>
            <div className="px-3 sm:px-8 py-4 rounded-b-lg">
              <ul className="list-disc space-y-2">
                {items.map((item, j) => (
                  <li key={j} className="flex justify-between w-full">
                    <span>{item.items}</span>
                    <span>{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-6">
        <Tabs className="horizontal-tabs" orientation="horizontal" variant="scrollable" value={tabIndex} onChange={handleChange}>
          <Tab label="Sub wise" />
          <Tab label="Attempting Strategy wise" />
        </Tabs>
        <div className="tab-panels w-full">
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 pt-6">
            {aiSections.map((item, i) => (
              <div key={i} className="rounded-lg shadow-lg border border-card-border">
                <div className="px-4 py-2 rounded-t-lg text-lg text-black flex justify-between bg-input-box border-b border-card-border">
                  <h3>{item.title}</h3>
                </div>
                <div className="px-4 py-4 rounded-b-lg">
                  <ul className="space-y-2">
                    <li>
                      <Progress percent={item.you} percentPosition={{ align: "center", type: "inner" }} strokeColor={"#288F66"} strokeWidth={20} />
                    </li>
                    <li>
                      <Progress percent={item.others} percentPosition={{ align: "center", type: "inner" }} strokeColor={"#FE6E13"} strokeWidth={20} className="others"/>
                    </li>
                    <li>
                      <Progress percent={item.toppers} percentPosition={{ align: "center", type: "inner" }} strokeColor={"#2d1067"} strokeWidth={20} />
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
