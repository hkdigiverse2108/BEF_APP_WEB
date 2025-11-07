import { Progress } from "antd";
import ReactApexChart from "react-apexcharts";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { AiPoweredRadialBarChart } from "../../../Data";
import { ImagePath } from "../../../Constants";
import type { AttemptType, QaTypeMetricsType } from "../../../Types";
import type { FC } from "react";

const ChartCell = ({ color, value, label }: { color: string; value: number; label: string }) => (
  <div className="flex justify-center items-center gap-2">
    <div className="relative flex justify-center items-center">
      <ReactApexChart options={AiPoweredRadialBarChart(color)} series={[value || 0]} type="radialBar" height={150} width={150} />
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

const AiPowered: FC<{ data: QaTypeMetricsType }> = ({ data }) => {
  const { direct, fiftyFifty, oneEliminate } = data?.["100%Sure"] ?? {};

  const calcPercent = (correct?: number, total?: number) => (total && total > 0 ? Math.round((correct! / total) * 100) : 0);

  const sumCorrectTotal = (...items: AttemptType[]) => {
    const totalCorrect = items.reduce((a, b) => a + (b?.correct ?? 0), 0);
    const totalTotal = items.reduce((a, b) => a + (b?.total ?? 0), 0);
    return totalTotal > 0 ? Math.round((totalCorrect / totalTotal) * 100) : 0;
  };

  const rows = [
    {
      title: "100% Sure",
      value: sumCorrectTotal(direct, fiftyFifty, oneEliminate),
      color: "#39B627",
      direct: { label: `${direct?.correct || 0}/${direct?.total || 0}`, value: calcPercent(direct?.correct, direct?.total) },
      fiftyFifty: { label: `${fiftyFifty?.correct || 0}/${fiftyFifty?.total || 0}`, value: calcPercent(fiftyFifty?.correct, fiftyFifty?.total) },
      oneEliminate: { label: `${oneEliminate?.correct || 0}/${oneEliminate?.total || 0}`, value: calcPercent(oneEliminate?.correct, oneEliminate?.total) },
    },
    {
      title: "Logic play",
      value: sumCorrectTotal(data?.logicPlay?.direct, data?.logicPlay?.fiftyFifty, data?.logicPlay?.oneEliminate),
      color: "#009951",
      direct: { label: `${data?.logicPlay?.direct?.correct || 0}/${data?.logicPlay?.direct?.total || 0}`, value: calcPercent(data?.logicPlay?.direct?.correct, data?.logicPlay?.direct?.total) },
      fiftyFifty: { label: `${data?.logicPlay?.fiftyFifty?.correct || 0}/${data?.logicPlay?.fiftyFifty?.total || 0}`, value: calcPercent(data?.logicPlay?.fiftyFifty?.correct, data?.logicPlay?.fiftyFifty?.total) },
      oneEliminate: { label: `${data?.logicPlay?.oneEliminate?.correct || 0}/${data?.logicPlay?.oneEliminate?.total || 0}`, value: calcPercent(data?.logicPlay?.oneEliminate?.correct, data?.logicPlay?.oneEliminate?.total) },
    },
    {
      title: "Intuition Hit",
      value: sumCorrectTotal(data?.intuitionHit?.direct, data?.intuitionHit?.fiftyFifty, data?.intuitionHit?.oneEliminate),
      color: "#F5D01C",
      direct: { label: `${data?.intuitionHit?.direct?.correct || 0}/${data?.intuitionHit?.direct?.total || 0}`, value: calcPercent(data?.intuitionHit?.direct?.correct, data?.intuitionHit?.direct?.total) },
      fiftyFifty: { label: `${data?.intuitionHit?.fiftyFifty?.correct || 0}/${data?.intuitionHit?.fiftyFifty?.total || 0}`, value: calcPercent(data?.intuitionHit?.fiftyFifty?.correct, data?.intuitionHit?.fiftyFifty?.total) },
      oneEliminate: { label: `${data?.intuitionHit?.oneEliminate?.correct || 0}/${data?.intuitionHit?.oneEliminate?.total || 0}`, value: calcPercent(data?.intuitionHit?.oneEliminate?.correct, data?.intuitionHit?.oneEliminate?.total) },
    },
    {
      title: "Blind fire",
      value: sumCorrectTotal(data?.blindFire?.direct, data?.blindFire?.fiftyFifty, data?.blindFire?.oneEliminate),
      color: "#F24914",
      direct: { label: `${data?.blindFire?.direct?.correct || 0}/${data?.blindFire?.direct?.total || 0}`, value: calcPercent(data?.blindFire?.direct?.correct, data?.blindFire?.direct?.total) },
      fiftyFifty: { label: `${data?.blindFire?.fiftyFifty?.correct || 0}/${data?.blindFire?.fiftyFifty?.total || 0}`, value: calcPercent(data?.blindFire?.fiftyFifty?.correct, data?.blindFire?.fiftyFifty?.total) },
      oneEliminate: { label: `${data?.blindFire?.oneEliminate?.correct || 0}/${data?.blindFire?.oneEliminate?.total || 0}`, value: calcPercent(data?.blindFire?.oneEliminate?.correct, data?.blindFire?.oneEliminate?.total) },
    },
  ];

  const calcFinalScore = (attempt: AttemptType, correctWeight = 2.0, wrongWeight = 0.67): number => {
    const correct = attempt?.correct ?? 0;
    const total = attempt?.total ?? 0;
    const wrong = total - correct;
    const score = correct * correctWeight - wrong * wrongWeight;
    return Number(score.toFixed(2));
  };

  const TotalFearSkips = calcFinalScore(data?.fearDriverSkip?.direct) + calcFinalScore(data?.fearDriverSkip?.fiftyFifty) + calcFinalScore(data?.fearDriverSkip?.oneEliminate);

  const cards = [
    { title: "Fear Skips", bottomValue: TotalFearSkips, bottomText: "Total", textColor: "text-success", barColor: "bg-black", bg: "bg-primary-light text-black min-w-[200px]", bottomIcon: <IoMdArrowDropup /> },
    { topText: `${data?.fearDriverSkip?.direct?.correct || 0}/${data?.fearDriverSkip?.direct?.total || 0}`, bottomValue: calcFinalScore(data?.fearDriverSkip?.direct), bottomText: "Marks Chance", textColor: "text-success", barColor: "bg-orange-500", bg: "bg-input-box", bottomIcon: <IoMdArrowDropup /> },
    { topText: `${data?.fearDriverSkip?.fiftyFifty?.correct || 0}/${data?.fearDriverSkip?.fiftyFifty?.total || 0}`, bottomValue: calcFinalScore(data?.fearDriverSkip?.fiftyFifty), bottomText: "Marks Chance", textColor: "text-red-600", barColor: "bg-orange-500", bg: "bg-input-box", bottomIcon: <IoMdArrowDropdown /> },
    { topText: `${data?.fearDriverSkip?.oneEliminate?.correct || 0}/${data?.fearDriverSkip?.oneEliminate?.total || 0}`, bottomValue: calcFinalScore(data?.fearDriverSkip?.oneEliminate), bottomText: "Marks Chance", textColor: "text-success", barColor: "bg-orange-500", bg: "bg-input-box", bottomIcon: <IoMdArrowDropup /> },
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
                <td className="px-4 w-1/4">
                  <ChartCell color={"#FF9500"} value={row?.direct?.value} label={row?.direct?.label} />
                </td>
                <td className="px-4 w-1/4">
                  <ChartCell color={"#F0788C"} value={row?.fiftyFifty?.value} label={row?.fiftyFifty?.label} />
                </td>
                <td className="px-4 w-1/4">
                  <ChartCell color={"#B482DC"} value={row?.oneEliminate?.value} label={row?.oneEliminate?.label} />
                </td>
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
                      <h3 className={`text-2xl font-extrabold flex items-center ${Number(card.bottomValue) >= 0.1 ? "text-success" : "text-danger"}`}>
                        {Number(card.bottomValue) >= 0.1 ? <IoMdArrowDropup /> : <IoMdArrowDropdown />} {card.bottomValue}
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
