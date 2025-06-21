import { ITicket } from "@/lib/database/models/ticket.model";
import { formatDateTime } from "@/lib/utils";
import QRCode from "react-qr-code";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const TicketCard = ({ ticketData }: { ticketData: ITicket }) => {
  return (
    <Card className="w-full mx-auto rounded-xl shadow-md overflow-hidden border border-gray-200">
      {/* Header */}
      <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h4 className="text-white text-lg font-bold">
              {ticketData.event.title}
            </h4>
            <p className="text-purple-200 text-sm">
              {formatDateTime(ticketData.event.startDateTime).dateTime}
            </p>
          </div>
          <span className="bg-white text-purple-700 px-3 py-1 rounded-full text-sm font-semibold ">
            #{ticketData._id}
          </span>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="p-4 space-y-4">
        {/* Details */}
        <div className="flex justify-between gap-3 text-sm">
          <div>
            <p className="text-gray-500">Holder</p>
            <p className="text-gray-800 font-medium">
              {ticketData.buyer.firstName} {ticketData.buyer.lastName}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Type</p>
            <p className="text-gray-800 font-medium">{ticketData.ticketType}</p>
          </div>
          {/* <div>
            <p className="text-gray-500">Qty</p>
            <p className="text-gray-800 font-medium">1</p>
          </div> */}
          {/* <div>
            <p className="text-gray-500">Price</p>
            <p className="text-gray-800 font-medium">
              {ticketData.event.isFree
                ? "Free"
                : formatPrice(ticketData.event.price)}
            </p>
          </div> */}
        </div>

        {/* QR Code */}
        <div className="flex justify-center">
          <div className="bg-gray-100 p-4 rounded-lg text-center w-fit">
            <div
              style={{
                height: "auto",
                margin: "0 auto",
                maxWidth: 100,
                width: "100%",
              }}
            >
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={ticketData._id}
                viewBox={`0 0 256 256`}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Scan at the event entrance
            </p>
          </div>
        </div>

        {/* Notes */}
        <div className="text-xs text-center text-gray-500 space-y-1">
          <span>This ticket is non-refundable and non-transferable.</span>
          <span>Please arrive 30 minutes before the event starts.</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketCard;
