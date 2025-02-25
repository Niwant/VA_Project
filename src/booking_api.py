import requests
import pandas as pd

# SerpAPI Credentials
SERP_API_KEY = "d829de68e652863c05ba2d6f9b284b51f5661edb4b1eb16db89a6f8f215d9dfb"
API_URL = "https://serpapi.com/search"

def fetch_google_hotels(location, checkin, checkout, guests=1, num_results=10):
    """
    Fetch hotel data from Google Hotels API via SerpAPI.
    """
    params = {
        "engine": "google_hotels",
        "q": location,  # Destination
        "check_in_date": checkin,
        "check_out_date": checkout,
        "adults": guests,
        "gl": "us",  # Country for localization
        "hl": "en",  # Language
        "currency": "USD",
        "api_key": SERP_API_KEY
    }

    response = requests.get(API_URL, params=params)

    # ✅ Print response for debugging
    print("API Response Status Code:", response.status_code)
    data = response.json()
    print("API Response JSON:", data)  # Full JSON response

    if response.status_code == 200:
        # ✅ Check if "properties" key exists
        if "properties" not in data:
            print("❌ Error: 'properties' key missing in API response.")
            return pd.DataFrame()

        hotels = data["properties"]
        if not hotels:
            print("❌ No hotel data found for this query.")
            return pd.DataFrame()

        # Convert API response to Pandas DataFrame
        df = pd.DataFrame(hotels)

        # Extract relevant columns
        extracted_data = []
        for hotel in hotels:
            extracted_data.append({
                "name": hotel.get("name", "N/A"),
                "address": hotel.get("description", "N/A"),
                "price": hotel.get("rate_per_night", {}).get("extracted_lowest", None),
                "rating": hotel.get("overall_rating", None),
                "reviews": hotel.get("reviews", None),
                "latitude": hotel.get("gps_coordinates", {}).get("latitude", None),
                "longitude": hotel.get("gps_coordinates", {}).get("longitude", None),
                "hotel_class": hotel.get("extracted_hotel_class", None)
            })

        df = pd.DataFrame(extracted_data)

        return df.head(num_results)  # Return limited results
    else:
        print("❌ Error fetching data:", response.text)
        return pd.DataFrame()  # Return empty DataFrame if API call fails
