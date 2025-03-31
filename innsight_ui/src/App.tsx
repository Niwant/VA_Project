import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar'
import { AppSidebar } from './components/app-sidebar'
import './index.css'

// Pages
import HotelList from './components/business/complist'
import AnalyzePage from './components/business/analyze' // <- create this component

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-4">
        <SidebarTrigger />

        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1 className="text-2xl font-bold text-center mt-4">Welcome to Innsight</h1>
                <p className="text-center text-gray-600">Your one-stop solution for hotel bookings</p>
                <HotelList />
              </div>
            }
          />
          <Route path="/analyze" element={<AnalyzePage />} />
        </Routes>
      </main>
    </SidebarProvider>
  )
}

export default App
