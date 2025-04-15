import axios from "axios"
import { toast } from "sonner"
const API_KEY = '84a16e28171c959e8fbcb5b4d9f604f54b40b72c595199079e24f2f1002d0ead'
import hotel_data from './mock.json'



const hotelSearch = async (data) => {
  if (!data.destination) {
    toast({ title: "Please enter a destination" })
    return
  }
  console.log("Searching for hotels in:", data.destination)
    console.log(hotel_data["properties"])
  // return hotel_data["properties"]

  try {
    const response = await axios.get("/api/search.json", {
      params: {
        engine: "google_hotels",
        q: data.destination,
        check_in_date: data.checkIn,
        check_out_date: data.checkOut,
        adults: data.guests,
        api_key: API_KEY,
      },
    })

    console.log("Hotels found:", response.data)
    return response.data.properties
    // Show results in UI or route to a results page
  } catch (error) {
    console.error("Error fetching hotels:", error)
    toast({
      title: "Error fetching hotels",
      description: "Check your API key or try again later.",
      variant: "destructive",
    })
  }
}


export default { hotelSearch}