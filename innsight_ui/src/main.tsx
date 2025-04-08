// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { APIProvider } from '@vis.gl/react-google-maps'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <APIProvider apiKey="AIzaSyAikaQiBc5bZHMWlDhbzT3PeStnRGoK8_Y">
    <App />
    </APIProvider>
    
    </BrowserRouter>
  </React.StrictMode>
)
