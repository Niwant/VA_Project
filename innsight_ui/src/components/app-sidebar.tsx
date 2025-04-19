import { useState } from "react";
import { format } from "date-fns";
import { MapPin, CalendarIcon, Search } from "lucide-react";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Slider } from "../components/ui/slider";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import { Checkbox } from "../components/ui/Checkbox";
import HotelsAPi from "../api/hotelsApi";
import { useHotelContext } from "../context/Hotels";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "../components/ui/sidebar";

// Property type options
const propertyOptions = [
  { id: 12, label: "Beach hotels" },
  { id: 14, label: "Hostels" },
  { id: 15, label: "Inns" },
  { id: 16, label: "Motels" },
  { id: 17, label: "Resorts" },
  { id: 18, label: "Spa hotels" },
  { id: 21, label: "Apartment hotels" },
];

// Amenity options
const amenityOptions = [
  { id: 1, label: "Free parking" },
  { id: 3, label: "Parking" },
  { id: 4, label: "Indoor pool" },
  { id: 5, label: "Outdoor pool" },
  { id: 7, label: "Fitness center" },
  { id: 8, label: "Restaurant" },
  { id: 9, label: "Free breakfast" },
  { id: 10, label: "Spa" },
  { id: 11, label: "Beach access" },
  { id: 12, label: "Child-friendly" },
  { id: 15, label: "Bar" },
  { id: 19, label: "Pet-friendly" },
  { id: 22, label: "Room service" },
  { id: 35, label: "Free Wi-Fi" },
  { id: 40, label: "Air-conditioned" },
  { id: 52, label: "All-inclusive available" },
  { id: 53, label: "Wheelchair accessible" },
  { id: 61, label: "EV charger" },
];

export function AppSidebar({ onSearchResult }) {
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [guests, setGuests] = useState(2);
  const [destination, setDestination] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("3");
  const [rating, setRating] = useState("");
  const [propertyTypes, setPropertyTypes] = useState<number[]>([]);
  const [amenitiesSelected, setAmenitiesSelected] = useState<number[]>([]);
  const [hotelClass, setHotelClass] = useState<number[]>([]);
  const { setHotels } = useHotelContext();

  const handlePropertyChange = (id: number, checked: boolean) => {
    setPropertyTypes((prev) =>
      checked ? [...prev, id] : prev.filter((val) => val !== id)
    );
  };

  const handleAmenityChange = (id: number, checked: boolean) => {
    setAmenitiesSelected((prev) =>
      checked ? [...prev, id] : prev.filter((val) => val !== id)
    );
  };

  const handleClassChange = (id: number, checked: boolean) => {
    setHotelClass((prev) =>
      checked ? [...prev, id] : prev.filter((val) => val !== id)
    );
  };

  const handleSearchClick = async () => {
    console.log("Search clicked");
    const payload = {
      destination,
      checkIn,
      checkOut,
      guests,
      sort_by: sortBy,
      min_price: minPrice,
      max_price: maxPrice,
      property_types: propertyTypes.join(","),
      amenities: amenitiesSelected.join(","),
      rating,
      hotel_class: hotelClass.join(","),
    };

    const results =await HotelsAPi.hotelSearch(payload);
    if (results && onSearchResult) {
      onSearchResult(results);
    }
    setHotels(results);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Hotel Search</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-4">
              {/* Destination */}
              <div>
                <Label className="flex items-center gap-2">
                  <MapPin size={16} /> Destination
                </Label>
                <Input
                  className="border-zinc-700 mt-1"
                  placeholder="e.g., New York, Paris"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>

              {/* Check-in */}
              <div>
                <Label className="flex items-center gap-2">
                  <CalendarIcon size={16} /> Check-in Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start mt-1">
                      {format(checkIn, "yyyy/MM/dd")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Check-out */}
              <div>
                <Label className="flex items-center gap-2">
                  <CalendarIcon size={16} /> Check-out Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start mt-1">
                      {format(checkOut, "yyyy/MM/dd")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Guests */}
              <div className="space-y-1">
                <Label className="flex items-center gap-2">👥 Number of Guests</Label>
                <div className="text-red-400 text-sm font-medium">{guests}</div>
                <Slider
                  defaultValue={[guests]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={([value]) => setGuests(value)}
                />
              </div>

              {/* Price Range */}
              <div className="flex gap-2">
                <div className="w-1/2">
                  <Label>Min Price</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 100"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>
                <div className="w-1/2">
                  <Label>Max Price</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 500"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>

              {/* Sort By */}
              {/* <div>
                <Label>Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select sort option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">Lowest price</SelectItem>
                    <SelectItem value="8">Highest rating</SelectItem>
                    <SelectItem value="13">Most reviewed</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}

              {/* Rating */}
              <div>
                <Label>Rating</Label>
                <Select value={rating} onValueChange={setRating}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">3.5+ stars</SelectItem>
                    <SelectItem value="8">4.0+ stars</SelectItem>
                    <SelectItem value="9">4.5+ stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Hotel Class */}
              <div>
                <Label>Hotel Class</Label>
                <div className="space-y-2 mt-1">
                  {[2, 3, 4, 5].map((cls) => (
                    <div key={cls} className="flex items-center gap-2">
                      <Checkbox
                        id={`class-${cls}`}
                        checked={hotelClass.includes(cls)}
                        onCheckedChange={(checked) =>
                          handleClassChange(cls, Boolean(checked))
                        }
                      />
                      <label htmlFor={`class-${cls}`} className="text-sm">
                        {cls}-star
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Property Types */}
              <div>
                <Label>Property Types</Label>
                <div className="space-y-2 mt-1">
                  {propertyOptions.map((item) => (
                    <div key={item.id} className="flex items-center gap-2">
                      <Checkbox
                        id={`property-${item.id}`}
                        checked={propertyTypes.includes(item.id)}
                        onCheckedChange={(checked) =>
                          handlePropertyChange(item.id, Boolean(checked))
                        }
                      />
                      <label htmlFor={`property-${item.id}`} className="text-sm">
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <Label>Amenities</Label>
                <div className="space-y-2 mt-1 max-h-48 overflow-y-auto pr-2">
                  {amenityOptions.map((item) => (
                    <div key={item.id} className="flex items-center gap-2">
                      <Checkbox
                        id={`amenity-${item.id}`}
                        checked={amenitiesSelected.includes(item.id)}
                        onCheckedChange={(checked) =>
                          handleAmenityChange(item.id, Boolean(checked))
                        }
                      />
                      <label htmlFor={`amenity-${item.id}`} className="text-sm">
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Search */}
              <Button className="w-full mt-2" onClick={handleSearchClick}>
                <Search className="mr-2" size={16} /> Search Hotels
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
