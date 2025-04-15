import { createContext, useState, useContext } from 'react';

const HotelContext = createContext({});

export const HotelProvider = ({ children }) => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);

  return (
    <HotelContext.Provider value={{ hotels, setHotels, selectedHotel, setSelectedHotel }}>
      {children}
    </HotelContext.Provider>
  );
};

export const useHotelContext = () => useContext(HotelContext);
