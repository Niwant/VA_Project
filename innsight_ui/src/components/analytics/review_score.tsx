import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
  } from "chart.js"
  import { Line } from "react-chartjs-2"
  import { use, useMemo } from "react"
  import { useEffect, useState } from "react"
  import aiAPi from "@/api/aiAPi"

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )
  
  // Mock review data
  /* const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  
  const averageRatings = [4.2, 4.4, 4.5, 4.1, 4.6, 4.3, 4.7, 4.8, 4.5, 4.4, 4.2, 4.6]
  const samplePoints = [ // optional: individual reviews or outliers
    { x: "Feb", y: 3.5 },
    { x: "Mar", y: 5.0 },
    { x: "Apr", y: 2.8 },
    { x: "May", y: 5.0 },
    { x: "Jul", y: 4.9 },
  ]
   */
  export default function ReviewScoreChart(props) {
    console.log("Hotel props:", props)
    const [data, setData] = useState([])
 
   useEffect(() => {
     fetchInquiryData()
   }, [])
 
   const fetchInquiryData = async () => {
     try {
       const response = await aiAPi.review_score(props.hotel)
       console.log("Review Score data:", response)
       // Assuming the response is in the format [{ month: "Jan", review_score: 352 }, ...]
       setData(response)
     } catch (error) {
       console.error("Error fetching inquiry data:", error)
     }
   }
    const chartData = useMemo(() => ({
      labels: Object.keys(data),
      datasets: [
        {
          type: "line",
          label: "Avg. Review Score",
          data: Object.values(data),
          borderColor: "rgb(59, 130, 246)",
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          tension: 0.3,
          fill: true,
          pointRadius: 5,
        },
      ],
    }), [data])
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: (context) =>
              context.dataset.type === "scatter"
                ? `Guest Rating: ${context.raw.y}`
                : `Avg. Score: ${context.raw}`,
          },
        },
      },
      scales: {
        y: {
          min: 0,
          max: 5,
          ticks: {
            stepSize: 0.5,
          },
        },
      },
    }
  
    return <Line data={chartData} options={options} />
  }
  