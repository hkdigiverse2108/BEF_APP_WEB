/* eslint-disable react-refresh/only-export-components */
import type { ApexOptions } from "apexcharts";

export const AiPoweredRadialBarChart = (color: string): ApexOptions => ({
  chart: { height: 150, width: 150, type: "radialBar", sparkline: { enabled: true } },
  plotOptions: {
    radialBar: {
      hollow: { size: "30%" },
      track: { background: "#f0f0f0" },
      dataLabels: { show: false },
    },
  },
  colors: [color],
});

export const EliminationSkillRadialBarChart = (color: string): ApexOptions => ({
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

export const EliminationSkillBarChart: ApexOptions = {
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
  fill: {},
  colors: ["#fe690b", "#037b3d"],
};