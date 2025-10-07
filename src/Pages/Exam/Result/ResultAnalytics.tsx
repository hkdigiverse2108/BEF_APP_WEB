import React from "react";
import { Progress } from "antd";
// import { ResponsiveContainer, RadialBarChart, RadialBar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { BsFillBarChartFill, BsGraphUp } from "react-icons/bs";

// This single-file React component renders a full Result Analytics UI that
// resembles the uploaded screenshot. It uses Tailwind for styling, AntD for
// linear progress bars, and Recharts for the gauge + bar chart visuals. You
// can split into smaller components if needed.

const OverviewCard: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex flex-col justify-between h-36">
    <div className="flex items-start justify-between">
      <div className="text-2xl">{icon}</div>
      <div className="w-1 h-12 bg-orange-500 rounded-l" />
    </div>
    <div className="text-left">
      <h3 className="text-xl font-bold">{value}</h3>
      <p className="text-sm text-gray-500 mt-1 uppercase">{label}</p>
    </div>
  </div>
);

const SmallStat: React.FC<{ title: string; subtitle?: string; value: string }> = ({ title, subtitle, value }) => (
  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
    <p className="text-sm text-gray-600">{title}</p>
    <div className="flex items-center justify-between mt-2">
      <h3 className="font-bold text-lg">{value}</h3>
      {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
    </div>
  </div>
);

const ProgressRow: React.FC<{ title: string; percent: number }> = ({ title, percent }) => (
  <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
    <div className="w-full md:w-1/3">
      <p className="text-sm font-medium text-gray-700">{title}</p>
    </div>
    <div className="w-full md:flex-1">
      <Progress percent={percent} showInfo={false} strokeColor={{ "0%": "#10B981", "100%": "#FE690B" }} />
    </div>
    <div className="w-28 text-right text-sm text-gray-600">{percent}%</div>
  </div>
);

const radialData = [{ name: "CorrectElim", value: 60, fill: "#FF8A00" }];

const barData = [
  { name: "100% Sure", you: 100, other: 90 },
  { name: "Logic Play", you: 100, other: 90 },
  { name: "Intuition Hit", you: 100, other: 90 },
  { name: "Blind Fire", you: 100, other: 90 },
];

const ResultAnalytics: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-64 sticky top-6 self-start">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-black text-white rounded p-2">🔍</div>
                <h4 className="font-bold">Overview</h4>
              </div>
              <nav className="space-y-2">
                {["Overview", "AI Powered Report Analysis", "Summary", "Compare Competitor", "Elimination Skill Report", "Leaderboard"].map((item) => (
                  <button key={item} className="w-full text-left py-2 px-3 rounded-md hover:bg-gray-100 flex items-center gap-3 text-sm">
                    <span className="w-2 h-2 bg-black rounded-full" />
                    <span>{item}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <header className="mb-4">
              <h1 className="text-2xl font-bold flex items-center gap-3">
                <BsFillBarChartFill /> Result
              </h1>
              <p className="text-sm text-gray-500 mt-1">Summary of marks scored in the test attempted on Sep 17, 6:45 PM</p>
            </header>

            {/* Overview Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              <OverviewCard icon={"📊"} label="Total Marks Scored" value="53.3 / 100 Marks" />
              <OverviewCard icon={"✅"} label="Correct" value="30 Marks" />
              <OverviewCard icon={"❌"} label="Incorrect" value="10 Marks" />
              <OverviewCard icon={"❓"} label="Unanswered" value="10 Marks" />
              <OverviewCard icon={"🏆"} label="Rank" value="1000" />
              <OverviewCard icon={"⏱️"} label="Time" value="00:27:30" />
            </section>

            <div className="border-t border-gray-200 my-6" />

            {/* AI Powered Report Analysis */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <BsGraphUp /> Polity - AI Powered Report Analysis
                </h2>
                <p className="text-sm text-gray-500">Detailed attempt strategy & insights</p>
              </div>

              <div className="space-y-6">
                <ProgressRow title="100% Sure" percent={88} />
                <ProgressRow title="Logic play" percent={73} />
                <ProgressRow title="Intuition Hit" percent={29} />
                <ProgressRow title="Blind fire" percent={29} />

                {/* circular mini stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <div className="w-20">
                      {/* <RadialBarChart innerRadius="80%" outerRadius="100%" data={radialData} barCategoryGap={0} startAngle={180} endAngle={-180} width={120} height={120}>
                        <RadialBar minAngle={15} clockWise dataKey="value" cornerRadius={10} />
                      </RadialBarChart> */}
                    </div>
                    <div>
                      <p className="text-sm font-medium">5/5</p>
                      <h3 className="font-bold text-xl">88%</h3>
                      <p className="text-xs text-gray-400">Accuracy</p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-gray-100">
                    <p className="text-sm text-gray-500">Fear Skips</p>
                    <h3 className="text-2xl font-bold text-orange-500 mt-2">11.33</h3>
                    <p className="text-sm text-gray-400 mt-1">Total</p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <SmallStat title="Good Skips" value="5/6 Correct" subtitle={"+9.33 Marks Saved"} />
                    <SmallStat title="Missed Opportunities" value="0/3 Correct" subtitle={"-2 Marks Lost"} />
                    <SmallStat title="Smart Skips" value="2/2 Strategic" subtitle={"+4 Marks Saved"} />
                  </div>
                </div>

                <div className="text-center mt-2 text-sm font-semibold">
                  NET IMPACT : <span className="text-orange-600">+11.33 MARKS</span>
                </div>
              </div>
            </section>

            {/* Summary Subject-wise */}
            <section className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold mb-4">Polity - Summary</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="mb-4 flex gap-2">
                    <button className="px-4 py-2 bg-black text-white rounded">Sub wise</button>
                    <button className="px-4 py-2 bg-white border rounded">Attempting Strategy wise</button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                      <p className="text-sm font-semibold text-red-700">Very Weak</p>
                      <p className="text-xs text-gray-500">0% - 20%</p>
                      <ul className="text-sm mt-2 text-gray-700">
                        <li>Judiciary</li>
                        <li>Executive</li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                      <p className="text-sm font-semibold text-yellow-700">Average</p>
                      <p className="text-xs text-gray-500">40% - 60%</p>
                      <ul className="text-sm mt-2 text-gray-700">
                        <li>FD</li>
                        <li>Constitutional Body</li>
                      </ul>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                      <p className="text-sm font-semibold text-orange-700">Weak</p>
                      <p className="text-xs text-gray-500">20% - 40%</p>
                      <ul className="text-sm mt-2 text-gray-700">
                        <li>President & Governor</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                      <p className="text-sm font-semibold text-green-700">Strong</p>
                      <p className="text-xs text-gray-500">60% - 80%</p>
                      <ul className="text-sm mt-2 text-gray-700">
                        <li>FR</li>
                        <li>DPSP</li>
                      </ul>
                    </div>

                    <div className="bg-green-600 text-white p-4 rounded-xl border border-green-700 col-span-full">
                      <p className="text-sm font-semibold">Very Strong</p>
                      <p className="text-xs">80% - 100%</p>
                      <p className="mt-2">Preamble</p>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/3">
                  <h4 className="text-sm font-medium text-gray-600">Let's Compare With Your Competitor</h4>
                  <div className="grid grid-cols-1 gap-3 mt-3">
                    <div className="bg-white rounded-xl p-3 border shadow-sm">
                      <p className="text-sm text-gray-500">Correct</p>
                      <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                        <div className="p-2 bg-green-50 rounded">
                          You
                          <br />
                          <span className="font-bold">20</span>
                        </div>
                        <div className="p-2 bg-gray-50 rounded">
                          Others
                          <br />
                          <span className="font-bold">30</span>
                        </div>
                        <div className="p-2 bg-gray-50 rounded">
                          Toppers
                          <br />
                          <span className="font-bold">40</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-3 border shadow-sm">
                      <p className="text-sm text-gray-500">Incorrect</p>
                      <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                        <div className="p-2 bg-orange-50 rounded">
                          You
                          <br />
                          <span className="font-bold">10</span>
                        </div>
                        <div className="p-2 bg-gray-50 rounded">
                          Others
                          <br />
                          <span className="font-bold">10</span>
                        </div>
                        <div className="p-2 bg-gray-50 rounded">
                          Toppers
                          <br />
                          <span className="font-bold">05</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-3 border shadow-sm">
                      <p className="text-sm text-gray-500">Skip</p>
                      <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                        <div className="p-2 bg-yellow-50 rounded">
                          You
                          <br />
                          <span className="font-bold">15</span>
                        </div>
                        <div className="p-2 bg-gray-50 rounded">
                          Others
                          <br />
                          <span className="font-bold">10</span>
                        </div>
                        <div className="p-2 bg-gray-50 rounded">
                          Toppers
                          <br />
                          <span className="font-bold">05</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Attempting Strategy Comparison Grid */}
            <section className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Attempting Strategy wise</h3>
                <p className="text-sm text-gray-500">You vs Others vs Topper</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {["100% Sure", "Logic Play", "Intuition Hit Play", "Blind Fire", "Direct", "50-50", "Lopt 1-OPT Eliminate", "Fear Skip"].map((title) => (
                  <div key={title} className="bg-white p-4 rounded-xl border shadow-sm">
                    <p className="text-sm font-medium">{title}</p>
                    <div className="mt-3 space-y-2">
                      <div className="text-xs text-gray-500">You</div>
                      <Progress percent={30} showInfo={false} />
                      <div className="text-xs text-gray-500">Others</div>
                      <Progress percent={80} showInfo={false} />
                      <div className="text-xs text-gray-500">Topper</div>
                      <Progress percent={100} showInfo={false} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Elimination Skill Report */}
            <section className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-12">
              <h3 className="text-lg font-bold mb-4">Polity - Elimination Skill Report</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                <div className="md:col-span-2 bg-white p-4 rounded-xl border shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-xl p-6 text-center">
                      <p className="text-sm text-gray-500">Your Correct Elimination Accuracy</p>
                      <h3 className="text-4xl font-bold text-orange-500 mt-3">60%</h3>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6 text-center">
                      <p className="text-sm text-gray-500">Right Answer Accuracy After Elimination</p>
                      <h3 className="text-4xl font-bold text-green-600 mt-3">10%</h3>
                    </div>
                  </div>

                  <div className="mt-6 bg-white p-4 rounded-xl border shadow-sm">
                    <p className="text-sm font-medium mb-3">1-OPT ELIMINATE (Bar Comparison)</p>
                    {/* <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={barData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="you" stackId="a" />
                        <Bar dataKey="other" stackId="a" />
                      </BarChart>
                    </ResponsiveContainer> */}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border shadow-sm">
                  <p className="text-sm font-medium mb-3">Quick Insights</p>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Use 1-OPT elimination more often for 40%+ accuracy.</li>
                    <li>• Convert fear-skips into smart-skips where possible.</li>
                    <li>• Focus on improving Logic Play timing.</li>
                  </ul>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ResultAnalytics;

// import { Layout, Menu, Card, Progress, Table, Tabs } from 'antd';
// import {
//   CheckCircleOutlined,
//   CloseCircleOutlined,
//   BarChartOutlined,
//   ClockCircleOutlined,
//   TrophyOutlined,
//   PieChartOutlined,
// } from '@ant-design/icons';
// import { useState } from 'react';
// // import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// const { Sider, Content } = Layout;
// const { TabPane } = Tabs;

// const overviewData = [
//   { title: 'Total Marks Scored', value: '53.3 / 100', icon: <BarChartOutlined /> },
//   { title: 'Correct', value: '30 Marks', icon: <CheckCircleOutlined /> },
//   { title: 'Incorrect', value: '10 Marks', icon: <CloseCircleOutlined /> },
//   { title: 'Unanswered', value: '10 Marks', icon: <ClockCircleOutlined /> },
//   { title: 'Rank', value: '1000', icon: <TrophyOutlined /> },
//   { title: 'Time', value: '00:27:30', icon: <ClockCircleOutlined /> },
// ];

// const aiReport = [
//   { key: '1', type: '100% Sure', accuracy: 88 },
//   { key: '2', type: 'Logic Play', accuracy: 73 },
//   { key: '3', type: 'Intuition Hit', accuracy: 29 },
//   { key: '4', type: 'Blind Fire', accuracy: 29 },
// ];

// const eliminationData = [
//   { name: '100% Sure', value: 100 },
//   { name: 'Logic Play', value: 90 },
//   { name: 'Intuition Hit', value: 80 },
//   { name: 'Blind Fire', value: 85 },
// ];

// const ResultAnalytics = () => {
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <Layout className="min-h-screen">
//       <Sider collapsible collapsed={collapsed} onCollapse={(v) => setCollapsed(v)} theme="dark">
//         <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
//           <Menu.Item key="1" icon={<PieChartOutlined />}>Overview</Menu.Item>
//           <Menu.Item key="2" icon={<BarChartOutlined />}>AI Report</Menu.Item>
//           <Menu.Item key="3" icon={<BarChartOutlined />}>Summary</Menu.Item>
//           <Menu.Item key="4" icon={<BarChartOutlined />}>Compare Competitor</Menu.Item>
//           <Menu.Item key="5" icon={<BarChartOutlined />}>Elimination Skill</Menu.Item>
//           <Menu.Item key="6" icon={<TrophyOutlined />}>Leaderboard</Menu.Item>
//         </Menu>
//       </Sider>

//       <Layout>
//         <Content className="p-6 bg-gray-50 overflow-y-auto">
//           {/* Overview Section */}
//           <h2 className="text-2xl font-bold mb-4">Overview</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//             {overviewData.map((item) => (
//               <Card key={item.title} className="text-center shadow-md">
//                 <div className="text-3xl mb-2">{item.icon}</div>
//                 <h3 className="font-semibold text-lg">{item.title}</h3>
//                 <p className="text-gray-500 text-sm">{item.value}</p>
//               </Card>
//             ))}
//           </div>

//           {/* AI Powered Report Analysis */}
//           <h2 className="text-2xl font-bold mb-4">AI Powered Report Analysis</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
//             {aiReport.map((row) => (
//               <Card key={row.key} className="shadow-sm">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="font-medium">{row.type}</span>
//                   <span className="text-gray-600">{row.accuracy}%</span>
//                 </div>
//                 <Progress percent={row.accuracy} strokeColor="#52c41a" showInfo={false} />
//               </Card>
//             ))}
//           </div>

//           {/* Summary */}
//           <h2 className="text-2xl font-bold mb-4">Summary</h2>
//           <Tabs defaultActiveKey="1">
//             <TabPane tab="Sub Wise" key="1">
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 <Card className="bg-red-100 border-l-4 border-red-500">Very Weak: Judiciary</Card>
//                 <Card className="bg-orange-100 border-l-4 border-orange-500">Weak: President & Governor</Card>
//                 <Card className="bg-yellow-100 border-l-4 border-yellow-500">Average: FD</Card>
//                 <Card className="bg-green-100 border-l-4 border-green-500">Strong: FR</Card>
//                 <Card className="bg-green-200 border-l-4 border-green-600">Very Strong: Preamble</Card>
//               </div>
//             </TabPane>
//             <TabPane tab="Attempting Strategy Wise" key="2">
//               <p>Strategy-based analytics coming soon...</p>
//             </TabPane>
//           </Tabs>

//           {/* Compare Competitor */}
//           <h2 className="text-2xl font-bold mt-8 mb-4">Compare with Competitor</h2>
//           <Table
//             pagination={false}
//             bordered
//             columns={[
//               { title: 'Category', dataIndex: 'category' },
//               { title: 'You', dataIndex: 'you' },
//               { title: 'Others', dataIndex: 'others' },
//               { title: 'Toppers', dataIndex: 'toppers' },
//             ]}
//             dataSource={[
//               { key: '1', category: 'Correct', you: 20, others: 30, toppers: 40 },
//               { key: '2', category: 'Incorrect', you: 15, others: 10, toppers: 5 },
//               { key: '3', category: 'Skipped', you: 15, others: 10, toppers: 5 },
//             ]}
//           />

//           {/* Elimination Skill Report */}
//           <h2 className="text-2xl font-bold mt-8 mb-4">Elimination Skill Report</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Card className="text-center">
//               <h3 className="font-semibold mb-2">Your Correct Elimination Accuracy</h3>
//               <Progress type="circle" percent={60} strokeColor="#fa8c16" />
//             </Card>
//             <Card className="text-center">
//               <h3 className="font-semibold mb-2">Right Answer Accuracy After Elimination</h3>
//               <Progress type="circle" percent={10} strokeColor="#52c41a" />
//             </Card>
//           </div>

//           <div className="mt-10 bg-white rounded-xl p-4 shadow-md">
//             <h3 className="font-semibold mb-4">Elimination Comparison</h3>
//             {/* <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={eliminationData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="value" fill="#1890ff" radius={[6, 6, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer> */}
//           </div>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default ResultAnalytics;
