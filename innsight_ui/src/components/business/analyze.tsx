import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import RevenueChart from "../analytics/revenue_chart";
import PriceChart from "../analytics/price_chart";
import InquiryChart from "../analytics/inquiry_chart";
import OccupancyChart from "../analytics/occupancy_chart";
import ReviewScoreChart from "../analytics/review_score";
import { Button } from "@/components/ui/button";
import hotel_summarize from "@/api/aiAPi";
import React from "react";
import { useParams } from "react-router-dom";

// Placeholder charts
import PriceComparisonChart from "../analytics/price_comparison_chart.jsx";
import SentimentComparisonChart from "../analytics/sentiment_comparison_chart.jsx";
import { useHotelContext } from "@/context/Hotels.js";

export default function AnalyzePage() {
  const [summary, setSummary] = React.useState<string>("");
  const [events, setEvents] = React.useState<string[]>([]);
  const {id} = useParams();
  const {hotels } = useHotelContext();
  const hotel = hotels.find((hotel) => hotel.property_token === id)
  console.log("Hotel:", hotel);

  const Summarize = async () => {
    console.log("Summarizing...");
    const summary = await hotel_summarize.hotel_summarize();

    setSummary(summary);
  };

  

  const fetchNearbyEvents = async () => {
    // You’ll replace this with real SerpAPI call
    const mockedEvents = [
      "🎉 Local Food Fest – Expected footfall spike",
      "🎸 Jazz Concert – Booking surge predicted",
      "🏀 Regional Basketball Finals – High traveler volume",
    ];
    setEvents(mockedEvents);
  };

  React.useEffect(() => {
    fetchNearbyEvents();
   
  }, []);

  return (
    <div className="p-6 space-y-6 pointer-events-auto h-[95vh] w-full overflow-y-auto">
      <div>
        <h1 className="text-3xl font-bold">📊 Hotel Analytics</h1>
        <p className="text-muted-foreground">
          A detailed overview of your performance and trends
        </p>
      </div>

      <div className="flex items-center">
        <Button className="mr-4" onClick={Summarize}>
          <span className="text-sm">Summarize</span>
        </Button>
        {summary && (
          <div className="text-sm text-muted-foreground">
            <p>{summary}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
            <CardDescription>Total revenue from bookings each month</CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueChart hotel={hotel}/>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Avg. Price Per Night</CardTitle>
            <CardDescription>Track pricing changes throughout the year</CardDescription>
          </CardHeader>
          <CardContent>
            <PriceChart hotel={hotel}/>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inquiries by Month</CardTitle>
            <CardDescription>Understand interest across the seasons</CardDescription>
          </CardHeader>
          <CardContent>
            <InquiryChart hotel={hotel}/>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Occupancy Rate</CardTitle>
            <CardDescription>Monthly % of rooms occupied</CardDescription>
          </CardHeader>
          <CardContent>
            <OccupancyChart hotel={hotel}/>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Review Score</CardTitle>
            <CardDescription>Monthly Review Score</CardDescription>
          </CardHeader>
          <CardContent>
            <ReviewScoreChart hotel={hotel}/>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events Impact</CardTitle>
            <CardDescription>
              Events that may increase demand around your hotel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc ml-5 text-sm text-muted-foreground space-y-1">
              {events.map((event, idx) => (
                <li key={idx}>{event}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Local Price Comparison</CardTitle>
            <CardDescription>
              How your hotel pricing compares with nearby listings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PriceComparisonChart hotel={hotel}/>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Competitor Review Sentiments</CardTitle>
            <CardDescription>
              See how your service compares to others
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SentimentComparisonChart hotel={hotel}/>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Recommendation</CardTitle>
            <CardDescription>
              Suggestions based on current trends and events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              📈 Consider running promotions between May 5–10 due to the Jazz Concert
              and spike in bookings last year.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
