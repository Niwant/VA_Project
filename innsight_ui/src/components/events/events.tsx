// components/event_sheet.tsx
"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"

export default function EventSheet({ events, destination }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="absolute top-4 right-4 z-50 shadow-md">
          See what's happening near you!
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Events Near You </SheetTitle>
        </SheetHeader>
        <div className="space-y-4 mt-4">
          {events.length === 0 ? (
            <p>No upcoming events found during this time.</p>
          ) : (
            events.map((event, idx) => (
              <div key={idx} className="border p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold">{event.title}</h3>
                {/* <p className="text-sm text-muted-foreground">{event.date}</p> */}
                <p className="text-sm">{event.description}</p>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
// "use client"

// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet"

// import { Button } from "@/components/ui/button"
// import { useState, useEffect } from "react"

// export default function EventSheet({ events, initialDestination }) {
//   const [destination, setDestination] = useState(initialDestination);

//   useEffect(() => {
//     setDestination(initialDestination);  // Update destination whenever the initialDestination prop changes
//   }, [initialDestination]);

//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button className="absolute top-4 right-4 z-50 shadow-md">
//           See what's happening in {destination}
//         </Button>
//       </SheetTrigger>
//       <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
//         <SheetHeader>
//           <SheetTitle>Events in {destination}</SheetTitle>
//         </SheetHeader>
//         <div className="space-y-4 mt-4">
//           {events.length === 0 ? (
//             <p>No upcoming events found during this time.</p>
//           ) : (
//             events.map((event, idx) => (
//               <div key={idx} className="border p-4 rounded-lg shadow-sm">
//                 <h3 className="font-semibold">{event.title}</h3>
//                 {/* <p className="text-sm text-muted-foreground">{event.date}</p> */}
//                 <p className="text-sm">{event.description}</p>
//               </div>
//             ))
//           )}
//         </div>
//       </SheetContent>
//     </Sheet>
//   )
// }
