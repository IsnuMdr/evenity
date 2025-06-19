import React from "react";
import { TicketData, TicketModal } from "./TicketModal";
import { ImageIcon } from "lucide-react";

// Wrapper Client Component for Server Component Usage
interface TicketModalWrapperProps {
  ticketData: TicketData;
  triggerText?: string;
  triggerClassName?: string;
}

export const TicketModalWrapper: React.FC<TicketModalWrapperProps> = ({
  ticketData,
  triggerText = "View Ticket",
  triggerClassName = "",
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button
        className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition flex items-center"
        onClick={() => setIsOpen(true)}
      >
        <ImageIcon className="h-5 w-5 mr-2" />
        View Ticket
      </button>

      <TicketModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        ticketData={ticketData}
      />
    </>
  );
};
