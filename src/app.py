import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import streamlit as st
import pandas as pd
import altair as alt
from booking_api import fetch_google_hotels
from visualizations import create_folium_map, price_trends, best_areas_chart, hotel_sorting_chart, cancellation_trends, customer_behavior


# Streamlit App Configuration
st.set_page_config(page_title="Hotel Booking Insights", layout="wide")

# Sidebar Filters
st.sidebar.title("Filters")
selected_location = st.sidebar.text_input("Enter Destination (e.g., New York, Paris)")
checkin_date = st.sidebar.date_input("Check-in Date")
checkout_date = st.sidebar.date_input("Check-out Date")
num_guests = st.sidebar.slider("Number of Guests", 1, 10, 2)

# Fetch Data Dynamically from Google Hotels API
if st.sidebar.button("Search Hotels"):
    data = fetch_google_hotels(selected_location, str(checkin_date), str(checkout_date), num_guests)

    if not data.empty:
        st.header(f"Hotel Insights for {selected_location}")

        # Display Data Table
        st.write("Hotel Data Preview:")
        st.dataframe(data)

        # Interactive Map with Hotel Selection
        # Hotel Map with Clickable Markers
        st.subheader("Interactive Hotels Map")
        create_folium_map(data)  # Display map

        # Dropdown for selecting a hotel
        hotel_options = {row["name"]: row for _, row in data.iterrows()}
        selected_hotel_name = st.selectbox("Select a hotel to view price trends:", ["None"] + list(hotel_options.keys()))

        # Get the selected hotel dictionary
        selected_hotel = hotel_options.get(selected_hotel_name, None)


        # Hotel Price Trends
        # Hotel Price Trends
        st.subheader("Price Trends")
        if selected_hotel:
            st.altair_chart(price_trends(data, selected_hotel), use_container_width=True)
        else:
            st.write("Select a hotel from the dropdown to see its price trend.")


        # Best Areas for Hotels
        st.subheader("Top Hotel Locations")
        st.altair_chart(best_areas_chart(data), use_container_width=True)

        # Hotel Sorting by Features
        st.subheader("Filter & Sort Hotels")
        st.altair_chart(hotel_sorting_chart(data), use_container_width=True)

        # Hotel Industry Dashboard
        st.subheader("Booking & Cancellation Trends")
        st.altair_chart(cancellation_trends(data), use_container_width=True)

        st.subheader("Customer Behavior Analysis")
        st.altair_chart(customer_behavior(data), use_container_width=True)
    else:
        st.warning("No data found. Try changing the filters.")
