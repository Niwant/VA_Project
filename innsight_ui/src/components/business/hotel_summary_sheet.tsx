import React, { useEffect } from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import aiAPi from "@/api/aiAPi";
import { useHotelContext } from "@/context/Hotels.js";
import remarkGfm from "remark-gfm";

export default function HotelSummarySheet({ open, onOpenChange, markdown , hotel , setSummaryMarkdown }) {
  const {reviewData, setReviewData} = useHotelContext();
  useEffect(() => {
    if (open) {
        fetchHotelSummary();
    }
    }, [open]);

    const fetchHotelSummary = async () => {
        try {
            const response = await aiAPi.final_summary(hotel , reviewData);
            console.log("Hotel summary:", response);
            setSummaryMarkdown(response);
        } catch (error) {
            console.error("Error fetching hotel summary:", error);
        }
    }


  return (
    <SheetPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <SheetPrimitive.Portal>
        <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-black/70" />
        <SheetPrimitive.Content
          className={cn(
            "fixed top-0 right-0 z-50 h-full w-full sm:w-[45%] lg:w-[30%] bg-white dark:bg-zinc-900 p-6 overflow-y-auto shadow-xl border-l"
          )}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Hotel Business Summary</h2>
            <SheetPrimitive.Close asChild>
              <Button variant="ghost" size="icon">
                <X className="h-5 w-5" />
              </Button>
            </SheetPrimitive.Close>
          </div>

          <ScrollArea className="h-[90vh] pr-4 text-xl">
          <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}
            >
                {markdown}
            </ReactMarkdown>
            </div>
          </ScrollArea>
        </SheetPrimitive.Content>
      </SheetPrimitive.Portal>
    </SheetPrimitive.Root>
  );
}
