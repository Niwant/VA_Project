import pandas as pd

def apply_filters(data, selected_country, room_filter, price_range):
    """
    Apply country, room availability, and price range filters to the data.
    """

    if "country" in data.columns:
        filtered_data = data[
            (data["country"].str.contains(selected_country, case=False, na=False)) &
            (data["room_count"] >= room_filter) &
            (data["price"] >= price_range[0]) &
            (data["price"] <= price_range[1])
        ]
    
    elif "country_code" in data.columns:  # If country is stored as "country_code"
        filtered_data = data[
            (data["country_code"].str.contains(selected_country, case=False, na=False)) &
            (data["room_count"] >= room_filter) &
            (data["price"] >= price_range[0]) &
            (data["price"] <= price_range[1])
        ]
    
    else:
        raise KeyError("Column 'country' or 'country_code' not found in the dataset.")

    return filtered_data
