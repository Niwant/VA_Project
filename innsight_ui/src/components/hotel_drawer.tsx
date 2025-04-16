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
  import { Bar } from "react-chartjs-2";
  import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
  } from "chart.js";
  import { ScrollArea } from "@/components/ui/scroll-area";
  
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  
  export function HotelDrawer({ hotel, onClose }: any) {
    if (!hotel) return null;
  
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
      datasets: hotel?.nearby_places?.map((place) => ({
        label: `${place.name}`,
        data: place?.transportations?.map((t) =>
          parseInt(t.duration.replace(/[^\d]/g, ""))
        ),
        backgroundColor: "#fbbf24",
      })),
    };
  
    return (
       <Drawer open={!!hotel} onOpenChange={(open) => !open && onClose()}>
        <DrawerContent className="h-[80vh] overflow-y-auto rounded-t-2xl px-4 pt-4">
          <DrawerHeader className="flex items-start justify-between">
            <div>
              <DrawerTitle>{hotel?.name}</DrawerTitle>
              <DrawerDescription>{hotel?.gps_coordinates?.latitude}, {hotel?.gps_coordinates?.longitude}</DrawerDescription>
              <p className="text-sm text-muted-foreground">
                Check-in: {hotel?.check_in_time} | Check-out: {hotel?.check_out_time}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X />
            </Button>
          </DrawerHeader>
  
          <ScrollArea className="h-[calc(80vh-6rem)] pr-4 space-y-6">
            {/* Hotel Images */}
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
  
            <div className="flex flex-wrap gap-4  mt-12">
  {/* Rate Bar Chart */}
  {hotel?.total_rate && (
    <Card className="w-[600px]">
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

  {/* Transportation Durations */}
  {hotel?.nearby_places?.length > 0 && (
    <Card className="w-[600px]">
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
</div>

            {/* Amenities */}
            <div>
              <h3 className="text-lg font-medium">Included Amenities</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {hotel?.amenities?.map((a: string) => (
                  <span key={a} className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-xs">
                    {a}
                  </span>
                ))}
              </div>
              <h3 className="text-lg font-medium mt-4">Excluded Amenities</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {hotel?.excluded_amenities?.map((a: string) => (
                  <span key={a} className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-xs">
                    {a}
                  </span>
                ))}
              </div>
            </div>
  
            {/* Essential Info */}
            <div>
              <h3 className="text-lg font-medium mb-1">Quick Facts</h3>
              <ul className="list-disc ml-5 text-sm text-muted-foreground">
                {hotel?.essential_info?.map((info: string, idx: number) => (
                  <li key={idx}>{info}</li>
                ))}
              </ul>
            </div>
  
            {/* Booking Link */}
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
  