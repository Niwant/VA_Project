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
import React, { use } from "react";
import aiAPI from "../../api/aiAPI";
import { useEffect , useState,useMemo} from "react";
import {useHotelContext} from "@/context/Hotels.js";

Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function SentimentComparisonChart(props) {
  const [data, setData] = useState([]);
  const { hotels } = useHotelContext();

  console.log("hotels", props.hotel);

  useEffect(() => {
    fetchData();
  }
  , []);

  const fetchData = async () => {
    const response = await aiAPI.sentiment_review(props.hotel, hotels);
    console.log(response);
    setData(response);
  }

  const chartData = useMemo(() => {
    if (
      !data ||
      typeof data !== "object" ||
      !Array.isArray(data.labels) ||
      !Array.isArray(data.datasets)
    ) {
      return {
        labels: [],
        datasets: [],
      };
    }

    return {
      labels: data.labels,
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        // Ensure consistent formatting and a fallback background color if missing
        backgroundColor: dataset.backgroundColor || "rgba(75, 192, 192, 0.6)",
      })),
    };
  }, [data]);

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

  return <Radar data={chartData} options={options} />;
}
