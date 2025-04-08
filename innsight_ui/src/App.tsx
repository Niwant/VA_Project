import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar'
import { AppSidebar } from './components/app-sidebar'
import {APIProvider , Map , Marker } from '@vis.gl/react-google-maps'
import './index.css'
import data from "./api/mock.json"

// Pages
import HotelList from './components/business/complist'
import AnalyzePage from './components/business/analyze' // <- create this component

function App() {
  const containerStyle = {
    width: '80vw',
    height: '750px'
  };
  
  const center = {
    lat: 35.2271, // Charlotte, NC
    lng: -80.8431
  };
  let hotelList = data["properties"]
  console.log(hotelList)
  
  return (
    
    <SidebarProvider>
      <div className='flex w-full'>
      <AppSidebar />
      <main className="flex flex-wrap w-full">
        <SidebarTrigger />

        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1 className="text-2xl font-bold text-center mt-4">Welcome to Innsight</h1>
                <p className="text-center text-gray-600">Your one-stop solution for hotel bookings</p>
                
                  <Map
                    style={containerStyle}
                    defaultCenter={center}
                    defaultZoom={12}
                    gestureHandling={'greedy'}
                    disableDefaultUI={false}
                  >
                    <Marker position={center} />
                    {hotelList.map(hotel => (
                    <Marker key={hotel.property_token} position={{ lat: hotel.gps_coordinates.latitude, lng: hotel.gps_coordinates.longitude }} />
                  ))}

                  </Map>
                
                <HotelList />
              </div>
            }
          />
          <Route path="/analyze" element={<AnalyzePage />} />
        </Routes>
      </main>
      </div>
    </SidebarProvider>
    
  )
}

export default App
