import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Download, ViewIcon, QrCodeIcon } from "lucide-react";
import { formatDateTime, formatPrice } from "@/lib/utils";

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

        <Card className="overflow-hidden">
          {/* Header Section */}
          <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-white text-xl font-bold">
                  {ticketData.event.title}
                </h4>
                <p className="text-purple-200">
                  {formatDateTime(ticketData.event.startDateTime).dateTime}
                </p>
              </div>
              <div className="bg-white text-purple-700 px-3 py-1 rounded-full font-bold">
                #{ticketData._id}
              </div>
            </div>
          </CardHeader>

          {/* Ticket Content */}
          <CardContent className="p-6 border-2 border-t-0 border-dashed border-gray-300">
            {/* Ticket Details Grid */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Ticket Holder</p>
                <p className="text-gray-800 font-medium">
                  {ticketData.buyer.firstName} {ticketData.buyer.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Ticket Type</p>
                <p className="text-gray-800 font-medium">
                  {ticketData.ticketType}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Quantity</p>
                <p className="text-gray-800 font-medium">1</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* <div>
                <p className="text-sm text-gray-500">Venue</p>
                <p className="text-gray-800 font-medium">{ticketData.venue}</p>
              </div> */}
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-gray-800 font-medium">
                  {ticketData.event.isFree
                    ? "Free"
                    : formatPrice(ticketData.event.price)}
                </p>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 p-4 rounded-lg">
                <QrCodeIcon className="h-40 w-40 mx-auto" />
                <p className="text-center text-sm text-gray-500 mt-2">
                  Scan at the event entrance
                </p>
              </div>
            </div>

            {/* Footer Notes */}
            <div className="text-center text-sm text-gray-500 space-y-1">
              <p>This ticket is non-refundable and non-transferable.</p>
              <p>Please arrive 30 minutes before the event starts.</p>
            </div>
          </CardContent>
        </Card>

        {/* Download Button */}
        <div className="mt-6 flex justify-center space-x-4">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3">
            <Download className="h-5 w-5 mr-2" />
            Download Ticket
          </Button>
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
