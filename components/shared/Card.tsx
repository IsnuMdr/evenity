import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime, formatPrice } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { Button } from "../ui/button";

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = async ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { userId } = await auth();

  await connectToDatabase();
  const user = await User.findOne({ clerkId: userId });

  const isEventCreator =
    user?._id.toString() === event.organizer._id.toString();

  return (
    <div className="event-card bg-white rounded-xl overflow-hidden shadow-md">
      <div className="relative">
        {/* IS EVENT CREATOR ... */}

        {isEventCreator && !hidePrice && (
          <div className="absolute left-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
            <Link href={`/events/${event._id}/update`}>
              <Image
                src="/assets/icons/edit.svg"
                alt="edit"
                width={20}
                height={20}
              />
            </Link>

            <DeleteConfirmation eventId={event._id} />
          </div>
        )}
        {event.imageUrl ? (
          <Link href={`/events/${event._id}`}>
            <Image
              src={event.imageUrl}
              alt={event.title}
              width={500}
              height={300}
              className="w-full h-48 object-cover"
            />
          </Link>
        ) : (
          <div className="h-48 bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-white opacity-80"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              ></path>
            </svg>
          </div>
        )}
        <span className="absolute top-4 right-4 bg-purple-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
          {event.category.name}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{event.title}</h3>
        <div className="flex items-center mb-4 text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
          <span>{formatDateTime(event.startDateTime).dateTime}</span>
        </div>
        <div className="flex items-center mb-4 text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          <span>{event.location}</span>
        </div>
        <p className="text-gray-600 mb-2">
          {event.description && event.description.length > 100
            ? `${event.description.substring(0, 100)}...`
            : event.description}
        </p>

        <div className="flex-between w-full mb-2">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {/* {event.organizer.firstName} {event.organizer.lastName} */}
          </p>

          {hasOrderLink && (
            <Link href={`/orders?eventId=${event._id}`} className="flex gap-2">
              <p className="text-primary-500">Order Details</p>
              <Image
                src="/assets/icons/arrow.svg"
                alt="search"
                width={10}
                height={10}
              />
            </Link>
          )}
        </div>

        <div className="flex justify-between items-center">
          <span className="text-purple-600 font-bold">
            {!hidePrice && event.isFree
              ? "FREE"
              : `${formatPrice(event.price?.toString() || "0")}`}
          </span>
          <Link href={`/events/${event._id}`}>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition flex items-center">
              Go to Detail
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
