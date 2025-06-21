import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X, ViewIcon } from "lucide-react";
import TicketCard from "./TicketCard";
import TicketDownloadButton from "./TicketDownloadButton";

interface TicketModalProps {
  ticketData: any;
  isOpen?: boolean;
}

// Server Component - URL-based Modal Overlay
export const TicketModalOverlay: React.FC<TicketModalProps> = ({
  ticketData,
  isOpen = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 p-6 max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Ticket Details</h3>
          <Link href="?" className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </Link>
        </div>

        <TicketCard ticketData={ticketData} />

        {/* Download Button */}
        <div className="mt-6 flex justify-center space-x-4">
          <TicketDownloadButton ticket={ticketData} />
          <Link href="?">
            <Button variant="outline">Close</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Server Component - Ticket Trigger Link
interface TicketTriggerProps {
  ticketData: any;
  ticketId: string;
  triggerText?: string;
  className?: string;
}

export const TicketTrigger: React.FC<TicketTriggerProps> = ({
  ticketId,
  triggerText = "View Ticket",
  className = "",
}) => {
  return (
    <Link href={`?ticketId=${ticketId}`}>
      <button className={className}>
        <ViewIcon className="h-5 w-5 mr-2" />
        {triggerText}
      </button>
    </Link>
  );
};
