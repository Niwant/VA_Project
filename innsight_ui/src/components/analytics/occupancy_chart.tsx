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
  import { useMemo } from "react"
  
  ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend)
  
  const data = [
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
  ]
  
  export default function OccupancyChart() {
    const chartData = useMemo(() => ({
      labels: data.map((d) => d.month),
      datasets: [
        {
          label: "Occupancy Rate (%)",
          data: data.map((d) => d.occupancy),
          borderColor: "rgb(234, 88, 12)", // Tailwind orange-600
          backgroundColor: "rgba(234, 88, 12, 0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    }), [])
  
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
  