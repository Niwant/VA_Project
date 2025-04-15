import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HotelCardProps {
  hotel: {
    name: string;
    property_address: string;
    property_price: string;
    listing_title: string;
    property_bedrooms: number;
    property_bathrooms: number;
    property_square_feet: string;
    listing_description: string;
    images: { thumbnail: string }[];
  };
}

export const HotelCard = ({ hotel }: HotelCardProps) => {
  return (
    <Card className="flex max-w-2xl w-full overflow-hidden shadow-lg border border-gray-200">
      {/* Image */}
      <div className="w-1/3">
        <img
          src={hotel.images[0]?.thumbnail}
          alt={hotel.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <CardHeader className="p-0 pb-2">
          <CardTitle className="text-xl font-semibold">{hotel.listing_title}</CardTitle>
          <p className="text-sm text-muted-foreground">{hotel.property_address}</p>
        </CardHeader>

        <CardContent className="p-0 flex gap-4 mt-2">
          <Badge variant="outline">{hotel.property_square_feet}²</Badge>
          <Badge variant="outline">{hotel.property_bedrooms} Beds</Badge>
          <Badge variant="outline">{hotel.property_bathrooms} Baths</Badge>
        </CardContent>

        <CardContent className="p-0 mt-2 text-sm text-muted-foreground">
          {hotel.listing_description}
        </CardContent>

        <CardFooter className="p-0 mt-3 flex justify-between items-center">
          <p className="text-lg font-bold text-emerald-600">{hotel.property_price}</p>
          <Button size="sm">More Info</Button>
        </CardFooter>
      </div>
    </Card>
  );
};
