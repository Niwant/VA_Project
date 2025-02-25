import altair as alt
import pandas as pd
import folium
from streamlit_folium import folium_static
import altair as alt
import pandas as pd
import streamlit as st


def create_map(data):
    """
    Create a geographical map showing hotel locations using Altair.
    """
    # Ensure lat/lon columns are numeric
    data["latitude"] = pd.to_numeric(data["latitude"], errors="coerce")
    data["longitude"] = pd.to_numeric(data["longitude"], errors="coerce")

    # Drop rows with missing coordinates
    data = data.dropna(subset=["latitude", "longitude"])

    # Define the base map
    background = alt.Chart(pd.DataFrame({"latitude": [0], "longitude": [0]})).mark_circle(size=0).encode(
        latitude="latitude:Q",
        longitude="longitude:Q"
    )

    # Plot hotel locations
    points = alt.Chart(data).mark_circle(size=80, color="blue").encode(
        longitude="longitude:Q",
        latitude="latitude:Q",
        tooltip=["name", "price", "rating"]
    )

    return background + points


def create_folium_map(data):
    """
    Create an interactive map using Folium where users can click on a hotel to see its price trend.
    """
    if data.empty:
        return None  # No data available

    # Get the average location to center the map
    avg_lat = data["latitude"].mean()
    avg_lon = data["longitude"].mean()

    # Create the map
    map_ = folium.Map(location=[avg_lat, avg_lon], zoom_start=12)

    # Store selected hotel in session state
    if "selected_hotel" not in st.session_state:
        st.session_state.selected_hotel = None

    # Add markers for hotels
    for _, row in data.iterrows():
        if pd.notna(row["latitude"]) and pd.notna(row["longitude"]):
            folium.Marker(
                location=[row["latitude"], row["longitude"]],
                popup=f"{row['name']} - ${row['price']} per night",
                tooltip=row["name"],
                icon=folium.Icon(color="blue", icon="info-sign")
            ).add_to(map_)

    return folium_static(map_)


def price_trends(data, selected_hotel):
    """
    Create a price trend chart for a selected hotel.
    If no hotel is selected, show an empty chart.
    """
    if not selected_hotel or not isinstance(selected_hotel, dict) or "price" not in selected_hotel:
        return alt.Chart(pd.DataFrame(columns=["date", "price"])).mark_line()

    # Simulate daily price fluctuations (since real API data might not have historical trends)
    price_data = pd.DataFrame({
        "date": pd.date_range(start="2025-03-01", periods=7, freq="D"),
        "price": [selected_hotel["price"] + i * 5 for i in range(7)]  # Simulating a trend
    })

    # Create the price trend visualization
    chart = alt.Chart(price_data).mark_line(color="blue").encode(
        x=alt.X("date:T", title="Date"),
        y=alt.Y("price:Q", title="Price ($)"),
        tooltip=["date", "price"]
    ).properties(
        title=f"Price Trend for {selected_hotel['name']}"
    )

    return chart


def best_areas_chart(data):
    """
    Identify the best locations for hotels.
    """
    area_chart = alt.Chart(data).mark_bar().encode(
        x="city:N",
        y="review_score:Q",
        tooltip=["city:N", "review_score:Q"]
    ).properties(title="Top Hotel Locations")
    return area_chart

def hotel_sorting_chart(data):
    """
    Allow users to filter and sort hotels based on features.
    """
    sorting_chart = alt.Chart(data).mark_bar().encode(
        x="name:N",
        y="price:Q",
        color="room_count:O",
        tooltip=["name:N", "price:Q", "room_count:O"]
    ).properties(title="Hotel Sorting & Comparison")
    return sorting_chart

def cancellation_trends(data):
    """
    Show booking and cancellation trends.
    """
    cancel_chart = alt.Chart(data).mark_area(opacity=0.6).encode(
        x="date:O",
        y="cancellations:Q",
        tooltip=["date:O", "cancellations:Q"]
    ).properties(title="Booking & Cancellation Trends")
    return cancel_chart

def customer_behavior(data):
    """
    Analyze customer behavior based on booking patterns.
    """
    behavior_chart = alt.Chart(data).mark_bar().encode(
        x="customer_type:N",
        y="count():Q",
        tooltip=["customer_type:N", "count():Q"]
    ).properties(title="Customer Behavior Analysis")
    return behavior_chart
