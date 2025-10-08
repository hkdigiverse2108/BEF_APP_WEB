import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

const EliminationSkill = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue);

  const ColumnChart: ApexOptions = {
    chart: {
      height: 350,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },

    legend: {
      show: false,
    },
    series: [
      {
        name: "Your Correct Elimination Accuracy",
        data: [44, 55, 57, 56],
      },
      {
        name: "Right Answer Accuracy After Elimination",
        data: [76, 85, 101, 98],
      },
    ],
    xaxis: {
      categories: ["100% Sure", "Logic Play", "Intuition Hit play", "Blind fire"],
    },
    fill: {
      opacity: 1,
    },
    colors: ["#fe690b", "#037b3d"],
  };

  const chartOptions = (color: string): ApexOptions => ( {
    chart: {
      type: "radialBar",
      sparkline: { enabled: true },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: "60%",
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "20px",
            fontWeight: 600,
            color: "#000",
            formatter: (val: number) => `${val}%`,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0,
        shade: "light",
      },
    },
    colors: [color],
    stroke: {
      lineCap: "round",
    },
  });

  return (
    <>
      {/* Header */}
      <div className="relative pl-4 mb-6">
        <div className="w-1 h-full bg-green-500 rounded-full absolute left-0 top-0" />
        <h2 className="text-xl font-bold text-gray-800">Polity</h2>
        <p className="text-sm text-gray-500 font-semibold">Elimination Skill Report</p>
      </div>

      <Tabs className="horizontal-tabs" orientation="horizontal" variant="scrollable" value={tabIndex} onChange={handleChange}>
        <Tab label="50 - 50" />
        <Tab label="1-OPT eliminate" />
      </Tabs>

      {/* 50-50 Tab */}
      <div hidden={tabIndex !== 0}>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 pt-6">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 pt-6">
            <div className="flex flex-col items-center">
              <ReactApexChart options={chartOptions("#fe690b")} series={[60]} type="radialBar" height={250} />
              <p className="mt-2 font-semibold">Your Correct Elimination Accuracy</p>
            </div>

            <div className="flex flex-col items-center">
              <ReactApexChart options={chartOptions("#037b3d")} series={[10]} type="radialBar" height={250} />
              <p className="mt-2 font-semibold">Right Answer Accuracy After Elimination</p>
            </div>
          </div>
          <div className="pt-6">
            <div className="flex flex-col items-center w-full">
              <div className="w-full">
                <ReactApexChart options={ColumnChart} series={ColumnChart.series} type={ColumnChart.chart?.type} height={350} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EliminationSkill;
