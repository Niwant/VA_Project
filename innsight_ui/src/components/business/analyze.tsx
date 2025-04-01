import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  import RevenueChart from "../analytics/revenue_chart"
  import PriceChart from "../analytics/price_chart"
  import InquiryChart from "../analytics/inquiry_chart"
  import OccupancyChart from "../analytics/occupancy_chart"
import ReviewScoreChart from "../analytics/review_score"
//   import CancellationChart from "../components/analytics/CancellationChart"
  
  export default function AnalyzePage() {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">📊 Hotel Analytics</h1>
          <p className="text-muted-foreground">A detailed overview of your performance and trends</p>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Over Time</CardTitle>
              <CardDescription>Total revenue from bookings each month</CardDescription>
            </CardHeader>
            <CardContent>
              <RevenueChart />
            </CardContent>
          </Card>
  
          <Card>
            <CardHeader>
              <CardTitle>Avg. Price Per Night</CardTitle>
              <CardDescription>Track pricing changes throughout the year</CardDescription>
            </CardHeader>
            <CardContent>
            <PriceChart  /> 
            </CardContent>
          </Card>
  
          <Card>
            <CardHeader>
              <CardTitle>Inquiries by Month</CardTitle>
              <CardDescription>Understand interest across the seasons</CardDescription>
            </CardHeader>
            <CardContent>
              <InquiryChart />
            </CardContent>
          </Card>
  
          <Card>
            <CardHeader>
              <CardTitle>Occupancy Rate</CardTitle>
              <CardDescription>Monthly % of rooms occupied</CardDescription>
            </CardHeader>
            <CardContent>
              <OccupancyChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Review Score</CardTitle>
              <CardDescription>Monthly Review Score</CardDescription>
            </CardHeader>
            <CardContent>
             <ReviewScoreChart />
            </CardContent>
          </Card>
  
          {/* <Card>
            <CardHeader>
              <CardTitle>Cancellation Rate</CardTitle>
              <CardDescription>What % of bookings were cancelled</CardDescription>
            </CardHeader>
            <CardContent>
              <CancellationChart />
            </CardContent>
          </Card> */}
        </div>
      </div>
    )
  }
  