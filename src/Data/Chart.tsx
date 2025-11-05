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
      track: {
        show: true,
        background: color || "#f5f5f5",
        opacity: 0.1,
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

export const EliminationSkillRadialBarCharts = (color: string, extra?: { left?: number; right?: number }): ApexOptions => ({
  chart: {
    type: "radialBar",
    sparkline: { enabled: true },
  },
  tooltip: {
    enabled: true,
    x: { show: false },
    marker: { show: false },
    custom: () => {
      const left = extra?.left ?? 0;
      const right = extra?.right ?? 0;
      return `
          <div style="
            background: ${color};
            color: #fff;
            padding: 6px 10px;
            font-weight: 600;
            font-family: inherit;
            font-size: 13px;
            opacity: 0.9;
          ">
            ${left} / ${right}
          </div>
        `;
    },
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      hollow: { size: "60%" },
      track: {
        show: true,
        background: color || "#f5f5f5",
        opacity: 0.1,
      },
      dataLabels: {
        name: { show: false },
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
    gradient: { shadeIntensity: 0, shade: "light" },
  },
  colors: [color],
  stroke: { lineCap: "round" },
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
  xaxis: {
    categories: ["100% Sure", "Logic Play", "Intuition Hit play", "Blind fire"],
  },
  fill: {},
  colors: ["#FE6E13", "#288F66"],
};
