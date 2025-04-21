# VA_Project

This repo is the code base for InnSight.

---

## App Deployment URL
The app will be deployed at
http://localhost:5173/

## To Deploy the app
1. Clone the repository (main branch)
    for HTTP: git clone https://github.com/Niwant/VA_Project.git
    for SSH: git clone git@github.com:Niwant/VA_Project.git
2. cd innsight_ui
3. npm install
4. npm run dev

Open the Deployment URL to explore the app.

Note:
While exploring the app, please use checkin and checkout dates that are not <today's> date. Additionally please dont leave the minimum price empty, as these are some of the code quality tests we have implemented to ensure smooth running of the code.

### **1. For Consumers: Best Hotels & Area Visualizations**

These visualizations help users find the best hotels and understand the hotel landscape in a given location.

#### **Geospatial Visualizations**

- **Interactive Hotel Map** 📍
  - Plot all hotels on a **geo map** with color-coded markers (green for high ratings, red for low ratings).
  - Clicking on a marker shows hotel details, reviews, and pricing.

- **Hotel Heatmap** 🔥
  - A heatmap showing the **density of highly-rated hotels** in a city or area.

#### **Ranking & Reviews**

- **Top 10 Best-Rated Hotels** 🏆
  - A **bar chart** showing the highest-rated hotels in a selected area.
  
- **Histogram of Hotel Ratings** 📊
  - Shows the distribution of hotel review scores in a region.

- **Sentiment Analysis (Word Cloud & Bar Chart)** 💬
  - Word clouds for **common words in positive & negative reviews**.
  - A bar chart of the most **frequent complaints & praises**.

#### **Consumer Preferences**

- **Pie Chart of Reviewer Nationalities** 🌍
  - Helps users see which hotels are popular among international travelers.

- **Average Price vs. Review Score Scatter Plot** 💰
  - Helps users find the best value-for-money hotels.

---

### **2. For Hotel Owners: Competitor Analysis & New Location Insights**

These visualizations help hotel owners analyze their competitors and explore potential new locations.

#### **Competitor Analysis**

- **Competitor Pricing & Rating Comparison** 📊
  - A **scatter plot** of hotel prices vs. review scores to compare competitors.

- **Bar Chart of Total Reviews per Competitor** 📈
  - Shows which hotels receive the most reviews (indicating popularity).

- **Customer Complaint Analysis** 🚨
  - A bar chart of **common negative review words** for competitors.

#### **New Location Analysis**

- **Best Areas for New Hotels (Heatmap & Cluster Analysis)** 🏨
  - Identify **underserved areas** where good hotels are missing.
  - Use clustering techniques to **highlight potential locations** for a new hotel.

- **Hotel Demand Trend Over Time (Line Chart)** ⏳
  - Show the **growth of hotel reviews in a city** over time to identify rising demand.

- **Comparison of Nearby Hotel Ratings (Box Plot)** 📦
  - Compare hotel ratings in different parts of the city.

---

### **Implementation Strategy**

- **Frontend**: Display these visualizations in an interactive web dashboard (React + D3.js / Chart.js).
- **Backend**: Use **Python (Flask/Django) with Folium, Plotly, Matplotlib, and NLP (for sentiment analysis).**
- **Data Sources**: Combine hotel reviews with **real-time pricing from APIs (e.g., Google Hotels, Google Events, Google Places).**
