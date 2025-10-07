import { Tabs } from "antd";
import { CardHeader } from "../../../Components/Common/CardHeader";
import ResultBanner from "../../../Components/Exam/Result/ResultBanner";
import ResultAnalytics from "./ResultAnalytics";
import Overview from "../../../Components/Exam/Result/Overview";

const Result = () => {
  return (
    <div className="min-h-screen p-4 md:p-8 result">
      <CardHeader title="Result" />
      <span className="border-t border-card-border flex w-full my-4" />
      <ResultBanner />
      <div className="mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <Tabs
            className="w-full"
            tabPosition={"left"}
            tabBarStyle={{ border: 1 }}
            items={[
              {
                label: `Overview`,
                key: "overview",
                children: <Overview/>,
              },
              {
                label: `AI Powered Report Analysis`,
                key: "2",
                children: `Content of Tab `,
              },
              {
                label: `Summary`,
                key: "3",
                children: `Content of Tab `,
              },
              {
                label: `Compare Competitor`,
                key: "4",
                children: `Content of Tab `,
              },
              {
                label: `Elimination Skill Report`,
                key: "5",
                children: `Content of Tab `,
              },

              {
                label: `Leaderboard`,
                key: "6",
                children: `Content of Tab `,
              },
            ]}
          />
        </div>
      </div>
      <ResultAnalytics />
    </div>
  );
};

export default Result;
