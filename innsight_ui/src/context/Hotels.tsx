// import { createContext, useState, useContext } from 'react';

// const HotelContext = createContext({});

// export const HotelProvider = ({ children }) => {
//   const [hotels, setHotels] = useState([]);
//   const [selectedHotel, setSelectedHotel] = useState(null);

//   return (
//     <HotelContext.Provider value={{ hotels, setHotels, selectedHotel, setSelectedHotel }}>
//       {children}
//     </HotelContext.Provider>
//   );
// };

// export const useHotelContext = () => useContext(HotelContext);
import { createContext, useState, useContext, ReactNode } from "react";

// Define a minimal Hotel type (you can extend this later)
interface Hotel {
  property_token: string;
  name: string;
  gps_coordinates: {
    latitude: number;
    longitude: number;
  };
  [key: string]: any;
}

// Define context shape
interface HotelContextType {
  hotels: Hotel[];
  setHotels: React.Dispatch<React.SetStateAction<Hotel[]>>;
  selectedHotel: Hotel | null;
  setSelectedHotel: React.Dispatch<React.SetStateAction<Hotel | null>>;
  events?: any;
  setEvents?: React.Dispatch<React.SetStateAction<any>>;
}

// Create the context with undefined as initial value
const HotelContext = createContext<HotelContextType | undefined>(undefined);

export const HotelProvider = ({ children }: { children: ReactNode }) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [events, setEvents] = useState<any>([]); // Optional: Add event state if needed

  return (
    <HotelContext.Provider value={{ hotels, setHotels, selectedHotel, setSelectedHotel , events, setEvents }}>
      {children}
    </HotelContext.Provider>
  );
};

export const useHotelContext = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error("useHotelContext must be used within a HotelProvider");
  }
  return context;
};
