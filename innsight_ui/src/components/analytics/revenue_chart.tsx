import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js"
  import { Line } from "react-chartjs-2"
  import { useMemo } from "react"
  
  // Register Chart.js components
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )
  
  // Mock data – replace with props or API later
  const data = [
    { month: "Jan", revenue: 46774 },
    { month: "Feb", revenue: 17947 },
    { month: "Mar", revenue: 39388 },
    { month: "Apr", revenue: 27354 },
    { month: "May", revenue: 53382 },
    { month: "Jun", revenue: 42938 },
    { month: "Jul", revenue: 48732 },
    { month: "Aug", revenue: 50822 },
    { month: "Sep", revenue: 41201 },
    { month: "Oct", revenue: 45110 },
    { month: "Nov", revenue: 37492 },
    { month: "Dec", revenue: 49204 },
  ]
  
  export default function RevenueChart() {
    const chartData = useMemo(() => ({
      labels: data.map((d) => d.month),
      datasets: [
        {
          label: "Revenue",
          data: data.map((d) => d.revenue),
          borderColor: "rgb(59, 130, 246)", // Tailwind blue-500
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          tension: 0.3,
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
          ticks: {
            callback: (value) => `$${value}`,
          },
        },
      },
    }
  
    return <Line data={chartData} options={options} />
  }
  