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
import { use, useMemo } from "react"
import aiApi from "@/api/aiAPi"
import { useEffect, useState } from "react"
import { useHotelContext } from "@/context/Hotels"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

/* const data = [
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
] */

export default function InquiryChart(props) {
  const [data, setData] = useState([])
  const{reviewData, setReviewData} = useHotelContext()

  useEffect(() => {
    fetchInquiryData()
  }, [])

  const fetchInquiryData = async () => {
    try {
      const response = await aiApi.inquiry(props.hotel)
      console.log("Inquiry data:", response)
      // Assuming the response is in the format [{ month: "Jan", inquiries: 352 }, ...]
      setData(response)
      setReviewData({inquiry: response , ...reviewData})

    } catch (error) {
      console.error("Error fetching inquiry data:", error)
    }
  }

  const chartData = useMemo(() => ({
    labels: Object.keys(data),
    datasets: [
      {
        label: "Inquiries",
        data: Object.values(data),
        backgroundColor: "rgba(16, 185, 129, 0.6)", // Tailwind green-500
        borderRadius: 4,
      },
    ],
  }), [data])

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
