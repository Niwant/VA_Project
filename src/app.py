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

# Custom Styling for Dark Theme Fixes
st.markdown(
    """
    <style>
        .main { background-color: #181818; color: white; }
        .sidebar .sidebar-content { background-color: #222; color: white; }
        .stButton>button { width: 100%; background-color: #007BFF; color: white; border-radius: 8px; }
        .stDataFrame { background-color: white; color: black; border-radius: 8px; }
        .stSelectbox { color: black; }
        .stTable { background-color: white; }
        table td { color: white !important; }
    </style>
    """,
    unsafe_allow_html=True
)

# Sidebar - Filters
st.sidebar.title("🔍 Hotel Search")
st.sidebar.markdown("Use the filters below to find the best hotels.")

selected_location = st.sidebar.text_input("📍 Destination (e.g., New York, Paris)")
checkin_date = st.sidebar.date_input("📅 Check-in Date")
checkout_date = st.sidebar.date_input("📅 Check-out Date")
num_guests = st.sidebar.slider("👥 Number of Guests", 1, 10, 2)

# Search Button
if st.sidebar.button("🔎 Search Hotels"):
    data = fetch_google_hotels(selected_location, str(checkin_date), str(checkout_date), num_guests)

    if not data.empty:
        st.header(f"🏨 Hotel Insights for {selected_location}")

        # Create Columns for Layout
        col1, col2 = st.columns([2.5, 1.5])

        with col1:
            # Interactive Hotel Map
            st.subheader("🗺️ Interactive Hotel Map")
            create_folium_map(data)
            

        # Data Preview in an Expander
        st.subheader("📊 Data Preview")
        with st.expander("🔎 Click to Expand Data Preview"):
            st.dataframe(data.style.set_properties(**{'background-color': 'white', 'color': 'black'}))
        # Hotel Selection Dropdown
        hotel_options = {row["name"]: row for _, row in data.iterrows()}
        selected_hotel_name = st.selectbox("🏨 Select a hotel to view price trends:", ["None"] + list(hotel_options.keys()))

        selected_hotel = hotel_options.get(selected_hotel_name, None)

        # Price Trends
        st.subheader("📈 Price Trends")
        if selected_hotel:
            st.altair_chart(price_trends(data, selected_hotel), use_container_width=True)
        else:
            st.info("Select a hotel from the dropdown to see its price trend.")

        # Layout for Visualizations
        col3, col4 = st.columns(2)

        # with col3:
        #     st.subheader("📍 Best Hotel Locations")
        #     st.altair_chart(best_areas_chart(data), use_container_width=True)

        # with col4:
        st.subheader("⚖️ Hotel Sorting & Features")
        st.altair_chart(hotel_sorting_chart(data), use_container_width=True)

        # Industry Trends
        st.subheader("📊 Booking & Cancellation Trends")
        st.altair_chart(cancellation_trends(data), use_container_width=True)

        st.subheader("📉 Customer Behavior Analysis")
        st.altair_chart(customer_behavior(data), use_container_width=True)

    else:
        st.warning("⚠️ No data found. Try modifying your filters.")
