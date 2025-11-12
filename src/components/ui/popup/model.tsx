"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTAmodal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 12000); // 30 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-gray-950 border border-gray-800 text-gray-100 max-w-md mx-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#86F5C2]">
            Enjoying the concept?
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-sm mt-1">
            If you like what One Card is building, support us by subscribing to our newsletter
            — and check out our other links while you’re here.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => window.location.href = "/subscribe"}
            className="flex-1 bg-[#2EE6A6] text-gray-900 hover:opacity-90 font-medium"
          >
            Subscribe Now <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

        </div>

        <button
          onClick={() => setOpen(false)}
          className="mt-4 text-xs text-gray-500 hover:text-gray-300 underline w-full text-center"
        >
          Maybe later
        </button>
      </DialogContent>
    </Dialog>
  );
}
