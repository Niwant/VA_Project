import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import hotel_summarize from "@/api/aiAPi";
import { useNavigate } from "react-router-dom";
import { HotelDrawer } from "../hotel_drawer";

interface Hotel {
  name: string;
  property_token: string;
  property_address: string;
  property_price: string;
  listing_title: string;
  property_bedrooms: number;
  property_bathrooms: number;
  property_square_feet: string;
  listing_description: string;
  images: { thumbnail: string }[];
  gps_coordinates: { latitude: number; longitude: number };
}

export const HotelAdvancedMarker = ({ hotel , setSelectedHotel }: { hotel: Hotel }) => {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const position = {
    lat: hotel.gps_coordinates.latitude,
    lng: hotel.gps_coordinates.longitude
  };

  return (
    <AdvancedMarker
      position={position}
      onClick={() => setClicked(!clicked)}
      title="Click to view hotel details"
      className="real-estate-marker"
    >
      {clicked ? (
        <div className="max-w-xl bg-white rounded-lg shadow-xl border border-gray-300 overflow-hidden">
          <div className="flex">
            <div className="w-1/3">
              <img
                src={hotel.images[0]?.thumbnail}
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-2/3 p-4 flex flex-col justify-between">
              <CardHeader className="p-0 pb-2">
                <CardTitle className="text-lg font-semibold">{hotel.listing_title}</CardTitle>
                <p className="text-sm text-muted-foreground">{hotel.property_address}</p>
              </CardHeader>

              <CardContent className="p-0 flex gap-2 mt-1 text-xs text-gray-500">
                <Badge variant="outline">{hotel.property_square_feet}²</Badge>
                <Badge variant="outline">{hotel.property_bedrooms} Beds</Badge>
                <Badge variant="outline">{hotel.property_bathrooms} Baths</Badge>
              </CardContent>

              <CardContent className="p-0 mt-2 text-sm text-gray-600 line-clamp-2">
                {hotel.listing_description}
              </CardContent>

              <CardFooter className="p-0 mt-2 flex justify-between items-center">
                <p className="text-base font-bold text-emerald-600">{hotel.property_price}</p>
                <Button size="sm" onClick={() => setClicked(false)}>
                  Close
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  id="analyze-button"
                  onClick={() => {
                    setSelectedHotel(hotel);
                    
                  }}
                  >
                   Hotel Info
                  </Button>
                  <HotelDrawer modal={false}/>
                  <Button
                    size="sm"
                    variant="outline"
                    id="details-button"
                    onClick={() => {
                      // Navigate to the hotel details page with the hotel ID
                      navigate( `/analyze/${hotel.property_token}`);
                    }}
                    >
                     Hotel Analysis
                    </Button>
              </CardFooter>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border rounded-full px-4 py-2 shadow-md text-sm font-semibold text-gray-800">
          {hotel.name}
        </div>
      )}
    </AdvancedMarker>
  );
};