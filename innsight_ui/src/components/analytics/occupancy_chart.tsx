import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js"
  import { Line } from "react-chartjs-2"
  import { use, useMemo } from "react"
  import { useEffect, useState } from "react"
  import aiAPi from "@/api/aiAPi"

  ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend)
  
  /* const data = [
    { month: "Jan", occupancy: 85 },
    { month: "Feb", occupancy: 72 },
    { month: "Mar", occupancy: 90 },
    { month: "Apr", occupancy: 78 },
    { month: "May", occupancy: 92 },
    { month: "Jun", occupancy: 88 },
    { month: "Jul", occupancy: 94 },
    { month: "Aug", occupancy: 96 },
    { month: "Sep", occupancy: 80 },
    { month: "Oct", occupancy: 83 },
    { month: "Nov", occupancy: 75 },
    { month: "Dec", occupancy: 89 },
  ] */
  
  export default function OccupancyChart() {
    const [data, setData] = useState([])
 
    useEffect(() => {
      fetchInquiryData()
    }, [])
  
    const fetchInquiryData = async () => {
      try {
        const response = await aiAPi.occupancy_chart()
        console.log("Occupancy data:", response)
        // Assuming the response is in the format [{ month: "Jan", occupancy: 352 }, ...]
        setData(response)
      } catch (error) {
        console.error("Error fetching occupancy data:", error)
      }
    }
  
    const chartData = useMemo(() => ({
      labels: Object.keys(data),
      datasets: [
        {
          label: "Occupancy Rate (%)",
          data: Object.values(data),
          borderColor: "rgb(234, 88, 12)", // Tailwind orange-600
          backgroundColor: "rgba(234, 88, 12, 0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    }), [data])
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: (value) => `${value}%`,
          },
        },
      },
    }
  
    return <Line data={chartData} options={options} />
  }
  