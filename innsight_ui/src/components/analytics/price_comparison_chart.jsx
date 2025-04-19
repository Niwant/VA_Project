// File: price_comparison_chart.tsx
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import React from "react";

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function PriceComparisonChart() {
  const data = {
    labels: ["Your Hotel", "Hotel A", "Hotel B", "Hotel C"],
    datasets: [
      {
        label: "Avg. Price ($) Per Night",
        data: [120, 110, 135, 125],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return <Bar data={data} options={options} />;
}
