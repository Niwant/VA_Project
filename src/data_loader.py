import pandas as pd
import json

def load_json_data(file_path):
    """
    Load hotel booking data from a JSON file and convert it to a DataFrame.
    """
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            data = json.load(file)

        # ✅ Check if JSON structure has "hotels" key
        if "hotels" in data:
            hotels = data["hotels"]
        else:
            raise KeyError("Missing 'hotels' key in JSON data.")

        # ✅ Convert to DataFrame
        df = pd.DataFrame(hotels)

        # ✅ Ensure required columns exist
        required_columns = ["name", "city", "country", "price", "room_count", "longitude", "latitude", "review_score", "cancellations"]
        available_columns = [col for col in required_columns if col in df.columns]

        if not available_columns:
            raise KeyError(f"No required columns found in JSON. Available columns: {df.columns.tolist()}")

        return df[available_columns]  # Return only necessary columns

    except FileNotFoundError:
        print("Error: JSON file not found at", file_path)
        return pd.DataFrame()  # Return empty DataFrame

    except json.JSONDecodeError:
        print("Error: Invalid JSON format.")
        return pd.DataFrame()  # Return empty DataFrame
