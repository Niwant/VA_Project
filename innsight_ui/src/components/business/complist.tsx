import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface Hotel {
    id: number;
    name: string;
    location: string;
    price: string;
}


const hotels = [
    {
      id: 1,
      name: "Embassy Suites by Hilton Charlotte Uptown",
      lat: 35.221813,
      lng: -80.84267,
      price: 189 // USD per night
    },
    {
      id: 2,
      name: "HYATT house Charlotte Airport",
      lat: 35.174047,
      lng: -80.885982,
      price: 129 // USD per night
    },
    {
      id: 3,
      name: "The Westin Charlotte",
      lat: 35.2216,
      lng: -80.8473,
      price: 215 // USD per night
    }
  ];
  

const HotelList: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-wrap gap-4 p-4">
            {hotels.map((hotel) => (
                <Card key={hotel.id} className="shadow-md w-75">
                    <CardHeader>
                        <CardTitle>{hotel.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* <p>Location: {hotel.location}</p> */}
                        <p>Price: {hotel.price}</p>
                    </CardContent>
                    <CardFooter>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={()=> navigate(`/analyze/${hotel.id}`)}>
                            Analyze
                        </button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default HotelList;