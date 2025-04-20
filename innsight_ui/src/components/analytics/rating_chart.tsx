import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export default function RatingsChart({ data }) {
    console.log("Ratings data:", data)
    
  const chartData = {
    labels: data.map((item) => item.stars),
    datasets: [
      {
        label: 'Number of Ratings',
        data: data.map((item) => item.count),
        borderWidth: 1
      }
    ]
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 5 }
      }
    }
  }

  return (
    <div className="p-4">
      {/* <h3 className="text-lg font-semibold mb-2">Ratings Distribution</h3> */}
      <Bar data={chartData} options={options} />
    </div>
  )
}
