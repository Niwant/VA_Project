
import axios from "axios";
import { toast } from "sonner";
import hotel_data from "./mock.json";

const API_KEY = "b7ac4bc4468c8208fa6899b52b919495e0c3061303b29de34f5a42208844a77e";//changed api key

const hotelSearch = async (data: any) => {
  if (!data.destination || data.destination.trim() === "") {
    toast({ title: "Please enter a destination" });
    return [];
  }

  if (formatDate(data.checkIn) === formatDate(data.checkOut)) {
    toast({
      title: "Invalid Dates",
      description: "Check-in and Check-out dates must be different.",
      variant: "destructive",
    });
    return [];
  }

  const payload: Record<string, any> = {
    engine: "google_hotels",
    q: data.destination,
    check_in_date: formatDate(data.checkIn),
    check_out_date: formatDate(data.checkOut),
    adults: Number(data.guests),
    api_key: API_KEY,
  };

  // ✅ Optional filters
  if (data.sort_by?.trim()) payload.sort_by = data.sort_by.trim();
  if (data.min_price !== undefined) payload.min_price = String(data.min_price).trim();
  if (data.max_price !== undefined) payload.max_price = String(data.max_price).trim();
  if (data.property_types?.trim()) payload.property_types = data.property_types.trim();
  if (data.amenities?.trim()) payload.amenities = data.amenities.trim();
  if (data.rating?.trim()) payload.rating = data.rating.trim();
  if (data.hotel_class?.trim()) payload.hotel_class = data.hotel_class.trim();

  // console.log("🔍 Sending hotel search request with:", payload);

  try {
    const response = await axios.get("/api/search.json", { params: payload });

    if (
      response.data?.error ||
      !response.data?.properties ||
      !Array.isArray(response.data.properties)
    ) {
      console.warn("⚠️ API returned no results. Falling back to mock.");
      toast({
        title: "No results from API",
        description: "Showing mock data instead.",
      });
      return hotel_data.properties;
    }

    // console.log("✅ Hotels found:", response.data);
    return response.data.properties;
  } catch (error) {
    console.error("❌ Error fetching hotels:", error);
    toast({
      title: "Error fetching hotels",
      description: "Check your API key or try again later.",
      variant: "destructive",
    });

    // console.log("📦 Using local mock data instead:");
    return hotel_data.properties;
  }
};

function formatDate(date: any) {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
}

const fetchNearbyEvents = async (payload: any) => {
  const params = new URLSearchParams({
    engine: "google_events",
    q: `events near ${payload.destination}`,
    hl: "en",
    gl: "us",
    api_key: API_KEY, // or use .env securely
  });

  const res = await fetch(`/api/search.json?${params.toString()}`);
  const data = await res.json();

  return data.events_results || [];
  // // Optional: Filter events by start-end date
  // const filteredEvents = data.events_results?.filter((event) => {
  //   const eventDate = dayjs(event.date?.start_date || event.date?.when);
  //   return eventDate.isAfter(start) && eventDate.isBefore(end);
  // });

  return filteredEvents || [];
};


export default { hotelSearch , fetchNearbyEvents };

// import axios from "axios";
// import { toast } from "sonner";
// import hotel_data from "./mock.json";

// const API_KEY = "84a16e28171c959e8fbcb5b4d9f604f54b40b72c595199079e24f2f1002d0ead";

// const hotelSearch = async (data: any) => {
//   if (!data.destination || data.destination.trim() === "") {
//     toast({ title: "Please enter a destination" });
//     return [];
//   }

//   if (formatDate(data.checkIn) === formatDate(data.checkOut)) {
//     toast({
//       title: "Invalid Dates",
//       description: "Check-in and Check-out dates must be different.",
//       variant: "destructive",
//     });
//     return [];
//   }

//   const payload: Record<string, any> = {
//     engine: "google_hotels",
//     q: data.destination,
//     check_in_date: formatDate(data.checkIn),
//     check_out_date: formatDate(data.checkOut),
//     adults: Number(data.guests),
//     api_key: API_KEY,
//   };

//   // ✅ Optional filters (excluding property_types, which we’ll handle manually)
//   if (data.sort_by?.trim()) payload.sort_by = data.sort_by.trim();
//   if (data.min_price !== undefined) payload.min_price = String(data.min_price).trim();
//   if (data.max_price !== undefined) payload.max_price = String(data.max_price).trim();
//   if (data.amenities?.trim()) payload.amenities = data.amenities.trim();
//   if (data.rating?.trim()) payload.rating = data.rating.trim();
//   if (data.hotel_class?.trim()) payload.hotel_class = data.hotel_class.trim();

//   console.log("🔍 Sending hotel search request with:", payload);

//   try {
//     const response = await axios.get("/api/search.json", { params: payload });

//     if (
//       response.data?.error ||
//       !response.data?.properties ||
//       !Array.isArray(response.data.properties)
//     ) {
//       console.warn("⚠️ API returned no results. Falling back to mock.");
//       toast({
//         title: "No results from API",
//         description: "Showing mock data instead.",
//       });
//       return hotel_data.properties;
//     }

//     console.log("✅ Hotels found:", response.data);

//     let filteredResults = response.data.properties;

//     // ✅ Local filtering for property_types using OR logic
//     if (data.property_types?.trim()) {
//       const allowedTypes = data.property_types.split(",").map(Number);
//       filteredResults = filteredResults.filter((hotel: any) =>
//         allowedTypes.includes(hotel.property_type_id)
//       );
//     }

//     return filteredResults;
//   } catch (error) {
//     console.error("❌ Error fetching hotels:", error);
//     toast({
//       title: "Error fetching hotels",
//       description: "Check your API key or try again later.",
//       variant: "destructive",
//     });

//     console.log("📦 Using local mock data instead:");
//     return hotel_data.properties;
//   }
// };

// function formatDate(date: any) {
//   if (!date) return "";
//   return new Date(date).toISOString().split("T")[0];
// }

// export default { hotelSearch };
