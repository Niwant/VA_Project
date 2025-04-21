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
  import { use, useMemo, useState } from "react"
  import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
  import { Card } from "@/components/ui/card"
  import aiAPi from "@/api/aiAPi"
  import { useEffect } from "react"
  
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
  
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    pricesByGuests: {
      "2 Guests": [120, 125, 130, 135, 128, 132],
      "4 Guests": [160, 165, 170, 180, 168, 175],
      "6 Guests": [200, 210, 220, 230, 215, 225],
    },
    pricesByRoomType: {
      Standard: [100, 110, 105, 108, 112, 115],
      Deluxe: [140, 145, 150, 148, 155, 160],
      Suite: [190, 195, 205, 210, 218, 225],
    },
  }
  
  export default function PriceChart(props) {
    const [mode, setMode] = useState("guests")
    const [data, setData] = useState({})
  
    useEffect(() => {
      fetchInquiryData()
    }, [])
    const fetchInquiryData = async () => {
      const response = await aiAPi.price_by_rooms(props.hotel)
      console.log("Price data:", response)
      setData(response)
    }


    const chartData = useMemo(() => {
      if (!data || Object.keys(data).length === 0 || !data.labels || !Array.isArray(data.labels)) {
        return {
          labels: [],
          datasets: [],
        };
      }
    
      const source =
        mode === "guests" ? data.pricesByGuests : data.pricesByRoomType;
    
      const datasets = source && typeof source === "object"
        ? Object.entries(source).map(([label, values]) => ({
            label,
            data: Array.isArray(values) ? values : [],
            backgroundColor: `rgba(${Math.floor(Math.random() * 200)}, ${
              Math.floor(Math.random() * 150) + 100
            }, ${Math.floor(Math.random() * 180)}, 0.6)`,
          }))
        : [];
    
      return {
        labels: data.labels,
        datasets,
      };
    }, [mode, data]);
    
  
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
  
    return (
      <div className="space-y-4">
        <ToggleGroup
          type="single"
          value={mode}
          onValueChange={(val) => val && setMode(val)}
          className="justify-center"
        >
          <ToggleGroupItem value="guests">👥 By Guests</ToggleGroupItem>
          <ToggleGroupItem value="room">🛏️ By Room Type</ToggleGroupItem>
        </ToggleGroup>
  
        <Bar data={chartData} options={options} />
      </div>
    )
  }
  