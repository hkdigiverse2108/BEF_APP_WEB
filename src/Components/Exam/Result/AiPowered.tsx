import { Progress } from "antd";
import ReactApexChart from "react-apexcharts";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { AiPoweredRadialBarChart } from "../../../Data";
import { ImagePath } from "../../../Constants";

const ChartCell = ({ color, value, label }: { color: string; value: number; label: string }) => (
  <div className="flex justify-center items-center gap-2">
    <div className="relative flex justify-center items-center">
      <ReactApexChart options={AiPoweredRadialBarChart(color)} series={[value]} type="radialBar" height={150} width={150} />
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">{label}</span>
    </div>
    <span className="text-lg font-bold">{value}%</span>
  </div>
);

const ProgressCell = ({ title, value, color }: { title: string; value: number; color: string }) => (
  <td className="py-4 px-4 font-semibold text-gray-700">
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center text-sm font-bold">
        <span className="text-xl">{title}</span>
        <span>{value}%</span>
      </div>
      <Progress percent={value} showInfo={false} strokeColor={color} strokeWidth={10} />
    </div>
  </td>
);

const AiPowered = () => {
  const rows = [
    { title: "100% Sure", value: 88, color: "#39B627", label: "2/2" },
    { title: "Logic play", value: 75, color: "#009951", label: "2/3" },
    { title: "Intuition Hit", value: 50, color: "#F5D01C", label: "1/2" },
    { title: "Blind fire", value: 0, color: "#F24914", label: "0/2" },
  ];

  const chartColors = ["#FF9500", "#F0788C", "#B482DC"];

  const cards = [
    { title: "Fear Skips", bottomValue: "11.33", bottomText: "Total", textColor: "text-success", barColor: "bg-black", bg: "bg-primary-light text-black min-w-[200px]", bottomIcon: <IoMdArrowDropdown /> },
    { topText: "5/6", bottomValue: "5/6", bottomText: "Marks Chance", textColor: "text-success", barColor: "bg-orange-", bg: "bg-input-box", bottomIcon: <IoMdArrowDropdown /> },
    { topText: "0/3", bottomValue: "2", bottomText: "Marks Chance", textColor: "text-red-600", barColor: "bg-orange-500", bg: "bg-input-box", bottomIcon: <IoMdArrowDropup /> },
    { topText: "5/6", bottomValue: "4", bottomText: "Marks Chance", textColor: "text-success", barColor: "bg-orange-500", bg: "bg-input-box", bottomIcon: <IoMdArrowDropdown /> },
  ];

  return (
    <>
      {/* Header */}
      <div className="relative pl-4 mb-6">
        <div className="w-1 h-full bg-success-light rounded-full absolute left-0 top-0" />
        <h2 className="text-xl font-bold text-gray-800">Polity</h2>
        <p className="text-sm text-gray-500 font-semibold">AI Powered Report Analysis</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="border-b border-card-border text-gray-700 text-xl font-bold text-center">
            <tr>
              <th className="py-3 px-4">Progress</th>
              <th className="py-3 px-4">Direct</th>
              <th className="py-3 px-4">50-50</th>
              <th className="py-3 px-4">1-Opt Eliminate</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-card-border">
                <ProgressCell title={row.title} value={row.value} color={row.color} />
                {chartColors.map((c, j) => (
                  <td key={j} className="px-4 w-1/4">
                    <ChartCell color={c} value={row.value} label={row.label} />
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              {cards.map((card, i) => (
                <td key={i} className="px-4">
                  <div className={`relative ${card.bg} rounded-xl p-5 grid grid-cols-1 gap-1 h-36 my-5 overflow-hidden`}>
                    <div className={`w-1 h-[60%] ${card.barColor} rounded-r absolute left-0 top-1/2 -translate-y-1/2`} />
                    {i === 0 && <img className="absolute bottom-0 right-0 object-cover w-32" src={`${ImagePath}result/Objects.png`} />}
                    <div className={`text-left border-b-2 ${i === 0 ? "border-white/50" : "border-card-border"}`}>
                      {card?.title && <p className={`${i === 0 ? "text-2xl" : "text-base"} font-bold mt-1 uppercase`}>{card?.title}</p>}
                      {card.topText && <h3 className="text-3xl font-extrabold">{card.topText}</h3>}
                    </div>
                    {card.bottomText && (
                      <h3 className={`text-2xl font-extrabold flex items-center ${card.textColor}`}>
                        {card.bottomIcon} {card.bottomValue}
                        <span className={`text-sm ${i === 0 ? "text-black" : "text-neutral-500"} ps-2`}>{card.bottomText}</span>
                      </h3>
                    )}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AiPowered;
