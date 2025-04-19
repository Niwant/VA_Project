// import { Routes, Route, useLocation } from 'react-router-dom'
// import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar'
// import { AppSidebar } from './components/app-sidebar'
// import { APIProvider, Map, AdvancedMarker  , Marker} from '@vis.gl/react-google-maps'
// import './index.css'
// import AnalyzePage from './components/business/analyze'
// import HotelList from './components/business/complist'
// import { useHotelContext } from './context/Hotels'
// import { CustomAdvancedMarker, HotelAdvancedMarker } from './components/custom_marker/custom_marker'
// import { HotelDrawer } from './components/hotel_drawer'
// import { useState } from 'react'

// function App() {
//   const { hotels } = useHotelContext()
//   const [selectedHotel, setSelectedHotel] = useState(null)
//   const location = useLocation() // <-- get the current path

//   const center = {
//     lat: 35.2271, // Charlotte, NC
//     lng: -80.8431
//   }

//   return (
//     <SidebarProvider>
//       <div className="relative h-screen w-screen overflow-hidden">

//         {/* Show map only on '/' route */}
        
//         {location.pathname === '/' && (
//           <Map
//             mapId='47a62328fcb304'
//             style={{
//               width: '100%',
//               height: '100%',
//               position: 'absolute',
//               zIndex: 0
//             }}
//             center={
//               hotels.length
//                 ? {
//                     lat: hotels[0].gps_coordinates.latitude,
//                     lng: hotels[0].gps_coordinates.longitude
//                   }
//                 : center
//             }
//             defaultZoom={14}
//             gestureHandling="greedy"
//             disableDefaultUI={false}
//           >
//             {hotels.map(hotel => (
//               <HotelAdvancedMarker
//                 setSelectedHotel={setSelectedHotel}
//                 hotel={hotel}
//                 key={hotel.property_token}
//               />
//             ))}
//           </Map>
//         )}

//         {/* Overlay UI Layer */}
//         <div className="relative z-10 w-full h-full pointer-events-none">
//           <div className="flex w-full h-full">
//             <div className="pointer-events-auto">
//               <AppSidebar />
              
//             </div>

//             <main className="flex flex-wrap w-full p-4">
//               <SidebarTrigger className="pointer-events-auto" />
//               {selectedHotel && (
//                 <HotelDrawer
//                   hotel={selectedHotel}
//                   onClose={() => setSelectedHotel(null)}
//                 />
//               )}
              
//               {/* Main content area */}
//               <Routes>
//                 <Route
//                   path="/"
//                   element={
//                     <>
//                       <div className="w-full h-full text-center poiner-events-auto">
//                         <h1 className="text-5xl font-bold text-black mt-4 drop-shadow-md">
//                           Welcome to Innsight
//                         </h1>
//                         <p className="text-black mb-4 drop-shadow-md">
//                           Your one-stop solution for hotel bookings
//                         </p>
//                       </div>
                      
//                       {/* <div className="absolute bottom-0 left-0 right-0 z-20 rounded-t-2xl shadow-md max-h-[40%] overflow-y-auto pointer-events-auto">
//                         <HotelList hotels={hotels} />
//                       </div> */}
//                     </>
//                   }
//                 />
//                 <Route path="/analyze/:id" element={<AnalyzePage />} />
//               </Routes>
//             </main>
//           </div>
//         </div>
//       </div>
//     </SidebarProvider>
//   )
// }

// export default App
import { Routes, Route, useLocation } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import { AppSidebar } from './components/app-sidebar';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import './index.css';
import AnalyzePage from './components/business/analyze';
import { useHotelContext } from './context/Hotels';
import { HotelAdvancedMarker } from './components/custom_marker/custom_marker';
import { HotelDrawer } from './components/hotel_drawer';
import { useState } from 'react';

function App() {
  const { hotels = [] } = useHotelContext(); // ✅ fallback to empty array
  const [selectedHotel, setSelectedHotel] = useState(null);
  const location = useLocation();

  const center = {
    lat: 35.2271, // Charlotte, NC
    lng: -80.8431
  };

  return (
    <SidebarProvider>
      <div className="relative h-screen w-screen overflow-hidden">
        {/* Show map only on '/' route */}
        {location.pathname === '/' && (
          <Map
            mapId="47a62328fcb304"
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              zIndex: 0
            }}
            center={
              hotels.length > 0
                ? {
                    lat: hotels[0].gps_coordinates.latitude,
                    lng: hotels[0].gps_coordinates.longitude
                  }
                : center
            }
            defaultZoom={14}
            gestureHandling="greedy"
            disableDefaultUI={false}
          >
            {hotels.map(hotel => (
              <HotelAdvancedMarker
                setSelectedHotel={setSelectedHotel}
                hotel={hotel}
                key={hotel.property_token}
              />
            ))}
          </Map>
        )}

        {/* Overlay UI */}
        <div className="relative z-10 w-full h-full pointer-events-none">
          <div className="flex w-full h-full">
            <div className="pointer-events-auto">
              <AppSidebar />
            </div>

            <main className="flex flex-wrap w-full p-4">
              <SidebarTrigger className="pointer-events-auto" />
              {selectedHotel && (
                <HotelDrawer
                  hotel={selectedHotel}
                  onClose={() => setSelectedHotel(null)}
                />
              )}

              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <div className="w-full h-full text-center poiter-events-auto">
                        <h1 className="text-5xl font-bold text-black mt-4 drop-shadow-md">
                          Welcome to Innsight
                        </h1>
                        <p className="text-black mb-4 drop-shadow-md">
                          Your one-stop solution for hotel bookings
                        </p>
                      </div>

                      {/* Optional hotel list view at the bottom */}
                      {/* {hotels.length > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 z-20 rounded-t-2xl shadow-md max-h-[40%] overflow-y-auto pointer-events-auto">
                          <HotelList hotels={hotels} />
                        </div>
                      )} */}
                    </>
                  }
                />
                <Route path="/analyze/:id" element={<AnalyzePage />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
