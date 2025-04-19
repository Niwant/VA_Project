// File: sentiment_comparison_chart.tsx
import { Radar } from "react-chartjs-2";
import {
    Chart,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import React from "react";

Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function SentimentComparisonChart() {
  const data = {
    labels: ["Cleanliness", "Location", "Service", "Value", "Facilities"],
    datasets: [
      {
        label: "Your Hotel",
        data: [4.5, 4.2, 3.8, 4.0, 4.1],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Competitor Avg",
        data: [4.2, 4.3, 4.1, 3.9, 4.0],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
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
    scales: {
      r: {
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return <Radar data={data} options={options} />;
}
