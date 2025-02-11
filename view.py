import streamlit as st
import pandas as pd
import seaborn as sns
import folium
from folium.plugins import MarkerCluster
from geopy.distance import geodesic
from streamlit_folium import st_folium
import matplotlib.pyplot as plt


# Display the map using streamlit_folium


# Load the Hotel_reviews dataset
@st.cache_data
def load_data():
    data = pd.read_csv('Hotel_reviews.csv')
    return data

# Load data
data = load_data()
data = data.dropna(subset=['lat', 'lng'])
# Sidebar filters
st.sidebar.header('Filter Reviews')

# Filter by country
# country = st.sidebar.selectbox('Select Country', data['Reviewer_Nationality'].unique())

# Filter by hotel name
hotel = st.sidebar.selectbox('Select Hotel', data['Hotel_Name'].unique())

if hotel:

    # Apply filters to the data
    filtered_data = data[(data['Hotel_Name'] == hotel)]


    # Filter the latest 50 reviews for the selected hotel
    latest_reviews = filtered_data.sort_values(by='Review_Date', ascending=False).head(50)

    # Convert 'Review_Date' to datetime
    latest_reviews['Review_Date'] = pd.to_datetime(latest_reviews['Review_Date'])

    # Plot the ratings over time
    plt.figure(figsize=(10, 6))
    sns.lineplot(data=latest_reviews, x='Review_Date', y='Reviewer_Score', marker='o')
    plt.title(f'Latest 50 Reviews Rating Over Time for {hotel}')
    plt.xlabel('Review Date')
    plt.ylabel('Rating')
    plt.xticks(rotation=45)
    plt.tight_layout()


    # Initialize geolocator
    hotel_map = folium.Map([filtered_data['lat'].iloc[0], filtered_data['lng'].iloc[0]], zoom_start=15)

    # Add a marker for the selected hotel
    folium.Marker(
        location=[filtered_data['lat'].iloc[0], filtered_data['lng'].iloc[0]],
        popup=f"{hotel} (Avg. Rating: {filtered_data['Reviewer_Score'].mean():.2f})",
        icon=folium.Icon(color='red')
    ).add_to(hotel_map)

    # Find 10 nearby hotels
    hotel_coords = (filtered_data['lat'].iloc[0], filtered_data['lng'].iloc[0])


    # Calculate distance to all other hotels
    data['distance_km'] = data.apply(lambda row: geodesic(hotel_coords, (row['lat'], row['lng'])).km, axis=1)

    # Get the 3 closest hotels (excluding the selected hotel)
    data.drop_duplicates(subset=['Hotel_Name'], inplace=True)
    nearby_hotels = data[data['Hotel_Name'] != hotel].nsmallest(5, 'distance_km')

    # Add markers for nearby hotels
    for _, row in nearby_hotels.iterrows():
        if row['lat'] and row['lng']:
            folium.Marker(
                location=[row['lat'], row['lng']],
                popup=f"{row['Hotel_Name']} (Avg. Rating: {row['Reviewer_Score']:.2f})",
                icon=folium.Icon(color='blue')
            ).add_to(hotel_map)

    # Display the map using streamlit-folium

    st_folium(hotel_map, width=1200, height=800)
    # Display the map
    # st.write(hotel_map._repr_html_(), unsafe_allow_html=True)

    # Display the plot
    st.pyplot(plt)
    # Display the data
    st.write(nearby_hotels)
    st.write(filtered_data['Tags'].value_counts().head(10))
else:
    str.write('Please select a hotel from the sidebar')
