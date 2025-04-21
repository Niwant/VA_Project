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
import React, { use } from "react";
import aiAPI from "../../api/aiAPI";
import { useEffect , useState,useMemo} from "react";
import {useHotelContext} from "@/context/Hotels.js";

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function PriceComparisonChart(props) {
  const [data, setData] = useState(null);
  const { hotels } = useHotelContext();
  
  useEffect(() => {
    fetchData();
  }
  , []);

  const fetchData = async () => {
     const response = await aiAPI.hotel_price_comparison(hotels ,props.hotel );
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
  };

  return <Bar data={chartData} options={options} />;
}
