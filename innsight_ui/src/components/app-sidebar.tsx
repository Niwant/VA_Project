import { useState } from "react";
import { format } from "date-fns";
import { MapPin, CalendarIcon, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import HandleSearch  from "@/api/hotelsApi"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [guests, setGuests] = useState(2);

  return (
    <Sidebar className="bg-zinc-900  w-[300px]">
      <SidebarContent className="p-4 space-y-6">
        <SidebarGroup>
          <SidebarGroupLabel>Hotel Search</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-4">
              <div>
                <Label className="flex items-center gap-2">
                  <MapPin size={16} /> Destination
                </Label>
                <Input className=" border-zinc-700  mt-1" placeholder="e.g., New York, Paris" />
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  <CalendarIcon size={16} /> Check-in Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full   justify-start mt-1">
                      {format(checkIn, "yyyy/MM/dd")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  <CalendarIcon size={16} /> Check-out Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full  justify-start mt-1">
                      {format(checkOut, "yyyy/MM/dd")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

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

              <Button className="w-full " onClick={() => HandleSearch.handleSearch({ destination: "New York", checkIn, checkOut, guests })}>
                <Search className="mr-2" size={16} /> Search Hotels
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
