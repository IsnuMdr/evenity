import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import {
  CalendarIcon,
  DownloadIcon,
  ImageIcon,
  MapPinIcon,
  PlusIcon,
  TicketIcon,
} from "lucide-react";
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { IOrder } from "@/lib/database/models/order.model";
import { IEvent } from "@/lib/database/models/event.model";
import Image from "next/image";
import { formatDateTime, formatPrice } from "@/lib/utils";
import { getTicketsByUser } from "@/lib/actions/ticket.actions";
import { ITicket } from "@/lib/database/models/ticket.model";
import {
  TicketModalOverlay,
  TicketTrigger,
} from "@/components/shared/TicketModal";

const MyTicketsPage = async ({
  searchParams,
}: {
  searchParams: { ticketId?: string };
}) => {
  const { userId } = await auth();
  const { ticketId } = await searchParams;

  await connectToDatabase();
  const user = await User.findOne({ clerkId: userId });

  const myTickets: any[] = (await getTicketsByUser(user._id.toString())) || [];

  const ticketData = ticketId
    ? myTickets.find((t) => t._id === ticketId)
    : null;

  const showModal = ticketData ? !!ticketData._id : false;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Tickets</h1>
          <p className="text-gray-600 mt-1">
            Manage all your event tickets in one place
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            href="/"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Browse Events
          </Link>
        </div>
      </div>
      {/* Tabs */}
      <Tabs defaultValue="Upcoming" className="border-b border-gray-200 mb-6">
        <TabsList>
          <TabsTrigger
            value="Upcoming"
            className="w-28 px-4 text-center text-lg font-medium"
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger
            value="Pass"
            className="w-28 px-4 text-center text-lg font-medium"
          >
            Pass
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Upcoming" className="space-y-6 mt-6">
          {myTickets?.length > 0 ? (
            myTickets?.map((ticket: any) => (
              <div
                key={ticket._id}
                className="ticket bg-white rounded-xl overflow-hidden shadow-md p-6 mx-4 md:mx-10"
              >
                <span className="ticket-badge bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  Upcoming
                </span>
                <div className="flex flex-col md:flex-row">
                  {/* Event Image */}
                  <div className="w-full md:w-1/4 mb-4 md:mb-0">
                    <Link href={`/events/${ticket.event._id}`}>
                      <Image
                        src={ticket.event.imageUrl}
                        alt={ticket.event.title}
                        width={500}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                    </Link>
                  </div>
                  {/* Event Details */}
                  <div className="w-full md:w-3/4 md:pl-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                          {ticket.event.title}
                        </h2>
                        <p className="text-purple-600 font-medium">
                          {ticket.event.category.name}
                        </p>
                      </div>
                      <div className="mt-2 md:mt-0 text-right">
                        <p className="text-gray-600">
                          Order #{ticket.order._id.toString()}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Date &amp; Time</p>
                        <div className="flex items-center mt-1">
                          <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                          <p className="text-gray-800">
                            {
                              formatDateTime(ticket.event.startDateTime)
                                .dateTime
                            }
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <div className="flex items-center mt-1">
                          <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                          <p className="text-gray-800">
                            {ticket.event.location}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <div className="flex items-center">
                        {/* <div className="bg-purple-100 text-purple-800 text-lg font-bold px-4 py-2 rounded-lg">
                          2 Tickets
                        </div> */}
                        <div className="bg-purple-100 text-purple-800 text-lg font-bold px-4 py-2 rounded-lg">
                          {ticket.event.isFree
                            ? "Free"
                            : formatPrice(ticket.event.price as string)}
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-0 flex space-x-3">
                        <TicketTrigger
                          ticketData={ticketData}
                          ticketId={ticket._id.toString()}
                          triggerText="View Ticket"
                          className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition flex items-center"
                        />

                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition flex items-center">
                          <DownloadIcon className="h-5 w-5 mr-2" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <TicketIcon className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No tickets found
              </h3>
              <p className="text-gray-600 mb-6">
                You don't have any tickets in this category yet.
              </p>
              <Link
                href="/"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition inline-flex items-center"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Browse Events
              </Link>
            </div>
          )}
        </TabsContent>
        <TabsContent value="Pass" className="space-y-6 mt-6">
          <div id="noTicketsMessage" className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <TicketIcon className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No tickets found
            </h3>
            <p className="text-gray-600 mb-6">
              You don't have any tickets in this category yet.
            </p>
            <Link
              href="/"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition inline-flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Browse Events
            </Link>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal appears based on URL parameter */}
      <TicketModalOverlay ticketData={ticketData} isOpen={showModal} />
    </div>
  );
};

export default MyTicketsPage;
