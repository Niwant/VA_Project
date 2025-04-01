import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface Hotel {
    id: number;
    name: string;
    location: string;
    price: string;
}


const hotels: Hotel[] = [
    { id: 1, name: "Hotel Sunshine", location: "New York", price: "$200/night" },
    { id: 2, name: "Ocean View Resort", location: "California", price: "$300/night" },
    { id: 3, name: "Mountain Retreat", location: "Colorado", price: "$250/night" },
];

const HotelList: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-wrap gap-4 p-4">
            {hotels.map((hotel) => (
                <Card key={hotel.id} className="shadow-md">
                    <CardHeader>
                        <CardTitle>{hotel.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Location: {hotel.location}</p>
                        <p>Price: {hotel.price}</p>
                    </CardContent>
                    <CardFooter>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={()=> navigate('/analyze')}>
                            Analyze
                        </button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default HotelList;