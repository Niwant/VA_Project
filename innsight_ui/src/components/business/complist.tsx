import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card'

const Complist = (props) => {
  const navigate = useNavigate()
  const hotels = props.hotels || [] // fallback if undefined

  console.log("Complist hotels:", hotels)

  return (
    <div className="flex gap-4 p-4">
      {hotels.map((hotel) => (
        <Card key={hotel.property_token} className="shadow-md w-75">
          <CardHeader>
            <CardTitle>{hotel.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Price: {hotel?.rate_per_night?.lowest || "N/A"}</p>
          </CardContent>
          <CardFooter>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => navigate(`/analyze/${hotel.property_token}`)}
            >
              Analyze
            </button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default Complist
