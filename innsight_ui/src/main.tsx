// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { APIProvider } from '@vis.gl/react-google-maps'
import { Hotel } from 'lucide-react'
import { HotelProvider } from './context/Hotels'

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <HotelProvider>
    <BrowserRouter>
    <APIProvider apiKey="AIzaSyAikaQiBc5bZHMWlDhbzT3PeStnRGoK8_Y">
    <App />
    </APIProvider>
    
    </BrowserRouter>
    </HotelProvider>
 
)
