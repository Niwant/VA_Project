// // components/hotel_drawer.tsx
// import {
//   Drawer,
//   DrawerContent,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerDescription,
// } from "@/components/ui/drawer";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
// } from "@/components/ui/card";

// import aiAPi from "@/api/aiAPi";
// import { Button } from "@/components/ui/button";
// import { X } from "lucide-react";
// import { Bar, PolarArea } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
//   RadialLinearScale,
//   ArcElement,
// } from "chart.js";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import PriceChart from "./analytics/price_chart";
// import RatingsChart from "./analytics/rating_chart";
// import PriceComparisonChart from "./analytics/price_comparison_chart";
// import { useState, useEffect } from "react";
// import ReactMarkdown from "react-markdown";

// ChartJS.register(
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
//   RadialLinearScale,
//   ArcElement
// );

// export function HotelDrawer({ hotel, onClose }: any) {
//   const [summary, setSummary] = useState("");

//   useEffect(() => {
//     Summarize();
//   }, []);

//   const Summarize = async () => {
//     console.log("Summarizing...");
//     const summary = await aiAPi.hotel_summarize(hotel);
//     setSummary(summary);
//   };

//   if (!hotel) return null;
//   console.log("Hotel data:", hotel);
  
//   const rateChart = {
//     labels: ["Before Taxes", "After Taxes"],
//     datasets: [
//       {
//         label: "Total Stay Cost (USD)",
//         data: [
//           hotel?.total_rate?.extracted_before_taxes_fees,
//           hotel?.total_rate?.extracted_lowest,
//         ],
//         backgroundColor: ["#60A5FA", "#34D399"],
//       },
//     ],
//   };

//   const transportData = {
//     labels: hotel?.nearby_places?.map((place) => place.name),
//     datasets: [
//       {
//         label: "Transport Time (min)",
//         data: hotel?.nearby_places?.map((place) =>
//           Math.min(
//             ...place?.transportations?.map((t) =>
//               parseInt(t.duration.replace(/[^\d]/g, ""))
//             )
//           )
//         ),
//         backgroundColor: "#fbbf24",
//       },
//     ],
//   };

//   const reviewChartData = {
//     labels: hotel?.reviews_breakdown?.map((item) => item.name),
//     datasets: [
//       {
//         label: "% Positive Reviews",
//         data: hotel?.reviews_breakdown?.map(
//           (item) => (item.positive / item.total_mentioned) * 100
//         ),
//         backgroundColor: [
//           "#34D399",
//           "#60A5FA",
//           "#FBBF24",
//           "#C084FC",
//           "#F87171",
//           "#A3E635",
//         ],
//       },
//     ],
//   };

//   const quote =
//     "If you love boutique stays with creative flair and plan to explore central Paris on foot — this one’s a gem.";

//   return (
//     <Drawer open={!!hotel} onOpenChange={(open) => !open && onClose()}>
//   <DrawerContent className="overflow-hidden rounded-t-2xl px-6 pt-6 bg-white shadow-xl">
//     <DrawerHeader className="flex items-center justify-between bg-gray-800 text-white p-3 rounded-t-lg">
//       <div className="text-center w-full max-w-4xl">
//         <DrawerTitle className="text-2xl font-bold tracking-tight text-white">{hotel?.name}</DrawerTitle>
//         <p className="text-sm mt-2 text-white">
//           Check-in: {hotel?.check_in_time} | Check-out: {hotel?.check_out_time}
//         </p>
//       </div>
//       <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-2 right-2 text-white">
//         <X />
//       </Button>
//     </DrawerHeader>

//     <div className="overflow-y-auto flex flex-col h-[calc(100vh-230px)]"> {/* Adjusted height */}
//       <ScrollArea className="flex-grow pr-4 space-y-6 px-4 py-2">
//         <blockquote className="italic text-sm text-muted-foreground border-l-4 pl-4 border-gray-300 mb-2">
//           “{quote}”
//         </blockquote>

//         <Card className="w-full shadow-xl rounded-lg bg-gray-50 border border-gray-200">
//           <CardHeader className="bg-gray-100 p-4 rounded-t-lg">
//             <CardTitle className="text-base font-semibold">Guest Highlights</CardTitle>
//           </CardHeader>
//           <CardContent className="w-full text-sm gap-2 p-4">
//             <div className="w-full">
//               {summary && (
//                 <div className="text-sm text-muted-foreground">
//                   <ReactMarkdown>{summary}</ReactMarkdown>
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Image Gallery */}
//         <div className="flex gap-4 overflow-x-auto justify-evenly mt-4 mb-2">
//           {hotel?.images?.slice(0, 5).map((img, idx) => (
//             <img
//               key={idx}
//               src={img.thumbnail}
//               alt={`image-${idx}`}
//               className="w-40 h-24 object-cover rounded-lg shadow-md"
//             />
//           ))}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
//           {hotel?.nearby_places?.length > 0 && (
//             <Card className="shadow-xl rounded-lg">
//               <CardHeader className="bg-gray-100 p-4 rounded-t-lg">
//                 <CardTitle className="text-base font-semibold">Nearby Transport Times</CardTitle>
//               </CardHeader>
//               <CardContent className="h-[200px] p-4">
//                 <Bar
//                   data={transportData}
//                   options={{
//                     responsive: true,
//                     maintainAspectRatio: false,
//                     plugins: { legend: { display: false } },
//                   }}
//                 />
//               </CardContent>
//             </Card>
//           )}

//           {hotel?.reviews_breakdown?.length > 0 && (
//             <Card className="shadow-xl rounded-lg">
//               <CardHeader className="bg-gray-100 p-4 rounded-t-lg">
//                 <CardTitle className="text-base font-semibold">Review Sentiment %</CardTitle>
//               </CardHeader>
//               <CardContent className="h-[300px] p-4">
//                 <PolarArea
//                   data={reviewChartData}
//                   options={{
//                     responsive: true,
//                     maintainAspectRatio: false,
//                     plugins: {
//                       legend: {
//                         position: "right",
//                         labels: { color: "#4B5563" },
//                       },
//                     },
//                   }}
//                 />
//               </CardContent>
//             </Card>
//           )}

//           <Card className="shadow-xl rounded-lg">
//             <CardHeader className="bg-gray-100 p-4 rounded-t-lg">
//               <CardTitle className="text-base font-semibold">Price Comparison Chart</CardTitle>
//             </CardHeader>
//             <CardContent className="h-[200px] p-4">
//               <PriceComparisonChart hotel={hotel} />
//             </CardContent>
//           </Card>
//         </div>

//         {/* Amenities Section */}
//         <div className="pt-6">
//           <h3 className="text-lg font-semibold">Included Amenities</h3>
//           <div className="flex flex-wrap gap-3 mt-3 mb-4">
//             {hotel?.amenities?.map((a: string) => (
//               <span
//                 key={a}
//                 className="bg-green-100 text-green-700 px-4 py-2 rounded-md text-xs font-semibold shadow-md"
//               >
//                 {a}
//               </span>
//             ))}
//           </div>

//           {hotel?.excluded_amenities?.length > 0 && (
//             <>
//               <h3 className="text-lg font-semibold mt-6">Excluded Amenities</h3>
//               <div className="flex flex-wrap gap-3 mt-3 mb-4">
//                 {hotel?.excluded_amenities?.map((a: string) => (
//                   <span
//                     key={a}
//                     className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-xs font-semibold shadow-md"
//                   >
//                     {a}
//                   </span>
//                 ))}
//               </div>
//             </>
//           )}
//         </div>

//         {hotel?.essential_info?.length > 0 && (
//           <div className="mt-8">
//             <h3 className="text-lg font-semibold mb-3">Quick Facts</h3>
//             <ul className="list-disc ml-6 text-sm text-muted-foreground">
//               {hotel?.essential_info?.map((info: string, idx: number) => (
//                 <li key={idx}>{info}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </ScrollArea>

//       {/* Book Now Button */}
//       <div className="mt-8 mb-6">
//         <a href={hotel?.link} target="_blank" rel="noopener noreferrer">
//           <Button
//             variant="default"
//             className="w-full py-4 px-8 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 text-lg font-semibold"
//           >
//             Book Now
//           </Button>
//         </a>
//       </div>
//     </div>
//   </DrawerContent>
// </Drawer>





//   );
// }
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

import aiAPi from "@/api/aiAPi";
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
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

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
  const [summary, setSummary] = useState("");

  useEffect(() => {
    Summarize();
  }, []);

  const Summarize = async () => {
    console.log("Summarizing...");
    const summary = await aiAPi.hotel_summarize(hotel);
    setSummary(summary);
  };

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

  const quote =
    "If you love boutique stays with creative flair and plan to explore central Paris on foot — this one’s a gem.";

  return (
    <Drawer open={!!hotel} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="overflow-hidden rounded-t-2xl px-6 pt-6 bg-white shadow-xl">
        <DrawerHeader className="flex items-center justify-between bg-gray-800 text-white p-3 rounded-t-lg">
          <div className="text-center w-full max-w-4xl">
            <DrawerTitle className="text-2xl font-bold tracking-tight text-white">{hotel?.name}</DrawerTitle>
            <p className="text-sm mt-2 text-white">
              Check-in: {hotel?.check_in_time} | Check-out: {hotel?.check_out_time}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-2 right-2 text-white">
            <X />
          </Button>
        </DrawerHeader>

        <div className="overflow-y-auto flex flex-col h-[calc(100vh-230px)]"> {/* Adjusted height */}
        <ScrollArea className="flex-grow pr-4 space-y-6 px-4 py-2">
  <blockquote className="italic text-sm text-muted-foreground border-l-4 pl-4 border-gray-300 mb-2">
    “{quote}”
  </blockquote>

  <Card className="w-full shadow-xl rounded-lg bg-gray-50 border border-gray-200">
    <CardHeader className="bg-gray-100 p-4 rounded-t-lg">
      <CardTitle className="text-base font-semibold">Guest Highlights</CardTitle>
    </CardHeader>
    <CardContent className="w-full text-sm gap-2 p-4">
      <div className="w-full">
        {summary && (
          <div className="text-sm text-muted-foreground">
            <ReactMarkdown>{summary}</ReactMarkdown>
          </div>
        )}
      </div>
    </CardContent>
  </Card>

  {/* Image Gallery */}
  <div className="flex gap-4 overflow-x-auto justify-evenly mt-4 mb-2">
    {hotel?.images?.slice(0, 5).map((img, idx) => (
      <img
        key={idx}
        src={img.thumbnail}
        alt={`image-${idx}`}
        className="w-40 h-24 object-cover rounded-lg shadow-md"
      />
    ))}
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
    {/* Transport Times */}
    {hotel?.nearby_places?.length > 0 && (
      <Card className="shadow-xl rounded-lg">
        <CardHeader className="bg-gray-100 p-4 rounded-t-lg">
          <CardTitle className="text-base font-semibold">Nearby Transport Times</CardTitle>
        </CardHeader>
        <CardContent className="h-[200px] p-4">
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

    {/* Review Sentiment */}
    {hotel?.reviews_breakdown?.length > 0 && (
      <Card className="shadow-xl rounded-lg">
        <CardHeader className="bg-gray-100 p-4 rounded-t-lg">
          <CardTitle className="text-base font-semibold">Review Sentiment %</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] p-4">
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

    {/* Price Comparison */}
    <Card className="shadow-xl rounded-lg">
      <CardHeader className="bg-gray-100 p-4 rounded-t-lg">
        <CardTitle className="text-base font-semibold">Price Comparison Chart</CardTitle>
      </CardHeader>
      <CardContent className="h-[200px] p-4">
        <PriceComparisonChart hotel={hotel} />
      </CardContent>
    </Card>
  </div>

  {/* Included Amenities */}
  <div className="pt-6">
    <h3 className="text-lg font-semibold">Included Amenities</h3>
    <div className="flex flex-wrap gap-3 mt-3 mb-4">
      {hotel?.amenities?.map((a: string) => (
        <span
          key={a}
          className="bg-green-100 text-green-700 px-4 py-2 rounded-md text-xs font-semibold shadow-md"
        >
          {a}
        </span>
      ))}
    </div>
  </div>

  {/* Excluded Amenities */}
  {hotel?.excluded_amenities?.length > 0 && (
    <div className="pt-6">
      <h3 className="text-lg font-semibold mt-6">Excluded Amenities</h3>
      <div className="flex flex-wrap gap-3 mt-3 mb-4">
        {hotel?.excluded_amenities?.map((a: string) => (
          <span
            key={a}
            className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-xs font-semibold shadow-md"
          >
            {a}
          </span>
        ))}
      </div>
    </div>
  )}

  {/* Quick Facts / Essential Info */}
  {hotel?.essential_info?.length > 0 && (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-3">Quick Facts</h3>
      <ul className="list-disc ml-6 text-sm text-muted-foreground">
        {hotel?.essential_info?.map((info: string, idx: number) => (
          <li key={idx}>{info}</li>
        ))}
      </ul>
    </div>
  )}
</ScrollArea>


          {/* Book Now Button */}
          <div className="mt-8 mb-6">
            <a href={hotel?.link} target="_blank" rel="noopener noreferrer">
              <Button
                variant="default"
                className="w-full py-4 px-8 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 text-lg font-semibold"
              >
                Book Now
              </Button>
            </a>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
