import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js"
  import { Bar } from "react-chartjs-2"
  import { useMemo } from "react"
  
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
  
  const data = [
    { month: "Jan", inquiries: 352 },
    { month: "Feb", inquiries: 237 },
    { month: "Mar", inquiries: 266 },
    { month: "Apr", inquiries: 249 },
    { month: "May", inquiries: 253 },
    { month: "Jun", inquiries: 278 },
    { month: "Jul", inquiries: 295 },
    { month: "Aug", inquiries: 310 },
    { month: "Sep", inquiries: 230 },
    { month: "Oct", inquiries: 244 },
    { month: "Nov", inquiries: 216 },
    { month: "Dec", inquiries: 288 },
  ]
  
  export default function InquiryChart() {
    const chartData = useMemo(() => ({
      labels: data.map((d) => d.month),
      datasets: [
        {
          label: "Inquiries",
          data: data.map((d) => d.inquiries),
          backgroundColor: "rgba(16, 185, 129, 0.6)", // Tailwind green-500
          borderRadius: 4,
        },
      ],
    }), [])
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    }
  
    return <Bar data={chartData} options={options} />
  }
  