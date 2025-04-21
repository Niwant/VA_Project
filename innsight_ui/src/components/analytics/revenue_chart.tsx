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
  import { use, useMemo } from "react"
  import aiAPi from "@/api/aiAPi"
  import { useEffect, useState } from "react"
  import { useHotelContext } from "@/context/Hotels"

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
 /*  const data = [
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
  ] */
  
  export default function RevenueChart(props) {
    const [data, setData] = useState([])
    const { reviewData, setReviewData } = useHotelContext()
    useEffect(() => {
      fetchInquiryData()
    }, [])
  
    const fetchInquiryData = async () => {
      try { 
        const response = await aiAPi.revenue(props.hotel)
        console.log("Revenue data:", response)
        // Assuming the response is in the format [{ month: "Jan", revenue: 352 }, ...]
        setData(response)
        setReviewData({revenue: response, ...reviewData})
      } catch (error) {
        console.error("Error fetching revenue data:", error)
      }
    }
  
    const chartData = useMemo(() => ({
      labels:  Object.keys(data),
      datasets: [
        {
          label: "Revenue",
          data:  Object.values(data),
          borderColor: "rgb(59, 130, 246)", // Tailwind blue-500
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          tension: 0.3,
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
          ticks: {
            callback: (value) => `$${value}`,
          },
        },
      },
    }
  
    return <Line data={chartData} options={options} />
  }
  