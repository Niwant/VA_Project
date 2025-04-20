// components/hotel_drawer.tsx
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Bar, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
} from "chart.js";
import { ScrollArea } from "@/components/ui/scroll-area";
import PriceChart from "./analytics/price_chart";
import RatingsChart from "./analytics/rating_chart";
import PriceComparisonChart from "./analytics/price_comparison_chart";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement
);

export function HotelDrawer({ hotel, onClose }: any) {
  if (!hotel) return null;
  console.log("Hotel data:", hotel);
  const rateChart = {
    labels: ["Before Taxes", "After Taxes"],
    datasets: [
      {
        label: "Total Stay Cost (USD)",
        data: [
          hotel?.total_rate?.extracted_before_taxes_fees,
          hotel?.total_rate?.extracted_lowest,
        ],
        backgroundColor: ["#60A5FA", "#34D399"],
      },
    ],
  };

  const transportData = {
    labels: hotel?.nearby_places?.map((place) => place.name),
    datasets: [
      {
        label: "Transport Time (min)",
        data: hotel?.nearby_places?.map((place) =>
          Math.min(
            ...place?.transportations?.map((t) =>
              parseInt(t.duration.replace(/[^\d]/g, ""))
            )
          )
        ),
        backgroundColor: "#fbbf24",
      },
    ],
  };

  const reviewChartData = {
    labels: hotel?.reviews_breakdown?.map((item) => item.name),
    datasets: [
      {
        label: "% Positive Reviews",
        data: hotel?.reviews_breakdown?.map(
          (item) => (item.positive / item.total_mentioned) * 100
        ),
        backgroundColor: [
          "#34D399",
          "#60A5FA",
          "#FBBF24",
          "#C084FC",
          "#F87171",
          "#A3E635",
        ],
      },
    ],
  };

  const pros = ["Excellent central location", "Friendly and helpful staff"];
  const cons = ["Bathrooms could be improved", "Breakfast quality is inconsistent"];
  const quote =
    "If you love boutique stays with creative flair and plan to explore central Paris on foot — this one’s a gem.";

  return (
    <Drawer open={!!hotel} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-[80vh] overflow-y-auto rounded-t-2xl px-4 pt-4">
        <DrawerHeader className="flex items-start justify-between">
          <div>
            <DrawerTitle>{hotel?.name}</DrawerTitle>
            <DrawerDescription>
              {hotel?.gps_coordinates?.latitude}, {hotel?.gps_coordinates?.longitude}
            </DrawerDescription>
            <p className="text-sm text-muted-foreground">
              Check-in: {hotel?.check_in_time} | Check-out: {hotel?.check_out_time}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X />
          </Button>
        </DrawerHeader>

        <ScrollArea className="h-[calc(70vh-6rem)] pr-4 space-y-6">
          <blockquote className="italic text-sm text-muted-foreground border-l-4 pl-4 border-gray-300">
            “{quote}”
          </blockquote>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Guest Highlights</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 text-sm gap-2">
              <div>
                <h4 className="font-semibold text-green-700 mb-1">Pros</h4>
                <ul className="list-disc list-inside space-y-1">
                  {pros.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 mb-1">Cons</h4>
                <ul className="list-disc list-inside space-y-1">
                  {cons.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2 overflow-x-auto">
            {hotel?.images?.slice(0, 5).map((img, idx) => (
              <img
                key={idx}
                src={img.thumbnail}
                alt={`image-${idx}`}
                className="w-40 h-24 object-cover rounded-md"
              />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {hotel?.total_rate && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Rate Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="h-[200px]">
                  <Bar
                    data={rateChart}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                    }}
                  />
                </CardContent>
              </Card>
            )}

            {hotel?.nearby_places?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Nearby Transport Times</CardTitle>
                </CardHeader>
                <CardContent className="h-[200px]">
                  <Bar
                    data={transportData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                    }}
                  />
                </CardContent>
              </Card>
            )}

            {hotel?.reviews_breakdown?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Review Sentiment %</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <PolarArea
                    data={reviewChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "right",
                          labels: { color: "#4B5563" },
                        },
                      },
                    }}
                  />
                </CardContent>
              </Card>
            )}

            {hotel?.reviews_breakdown?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Ratings Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="h-[200px]">
                  <RatingsChart data={hotel?.ratings} />
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Price Comparison Chart</CardTitle>
              </CardHeader>
              <CardContent className="h-[200px]">
                <PriceComparisonChart hotel={hotel} />
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-lg font-medium">Included Amenities</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {hotel?.amenities?.map((a: string) => (
                <span
                  key={a}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-xs"
                >
                  {a}
                </span>
              ))}
            </div>
            {hotel?.excluded_amenities?.length > 0 && (
              <>
                <h3 className="text-lg font-medium mt-4">Excluded Amenities</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {hotel?.excluded_amenities?.map((a: string) => (
                    <span
                      key={a}
                      className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-xs"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          {hotel?.essential_info?.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-1">Quick Facts</h3>
              <ul className="list-disc ml-5 text-sm text-muted-foreground">
                {hotel?.essential_info?.map((info: string, idx: number) => (
                  <li key={idx}>{info}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4">
            <a href={hotel?.link} target="_blank" rel="noopener noreferrer">
              <Button variant="default" className="w-full">
                Book Now
              </Button>
            </a>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
