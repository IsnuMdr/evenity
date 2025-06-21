import CheckoutButton from "@/components/shared/common/CheckoutButton";
import Collection from "@/components/shared/events/Collection";
import { EventsSkeleton } from "@/components/shared/events/EventsSkeleton";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.actions";
import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import {
  BookmarkIcon,
  CalendarFoldIcon,
  ChevronRightIcon,
  CircleDollarSignIcon,
  CircleUserIcon,
  ExternalLinkIcon,
  MapPinIcon,
  Share2Icon,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
const MapBox = dynamic(() => import("@/components/shared/common/LeafletMap"), {
  ssr: true,
});

const EventDetails = async ({ params, searchParams }: SearchParamProps) => {
  const { id } = await params;
  const { page } = await searchParams;

  const pageNumber = page ? parseInt(page as string, 10) : 1;

  const event: IEvent = await getEventById(id);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: pageNumber,
  });

  const hasEventFinished = new Date(event.endDateTime) < new Date();
  return (
    <>
      <section className="container wrapper mx-auto px-4 py-8">
        <div className="flex items-center text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-purple-600">
            Home
          </Link>
          <ChevronRightIcon className="h-4 w-4" />
          <Link href="/" className="hover:text-purple-600">
            Events
          </Link>
          <ChevronRightIcon className="h-4 w-4" />
          <span
            className="text-gray-800 font-medium"
            id="event-title-breadcrumb"
          >
            {event.title}
          </span>
        </div>

        <div className="!bg-white rounded-xl shadow-md overflow-hidden">
          <Suspense
            fallback={<Skeleton className="h-full min-h-[300px] w-full" />}
          >
            <div className="relative">
              <div
                id="event-banner"
                className="h-72 md:h-96 bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center"
              >
                <Image
                  src={event.imageUrl}
                  alt="hero image"
                  width={1000}
                  height={1000}
                  className="h-full min-h-[300px] w-full object-cover object-center"
                />
              </div>
              <div className="absolute top-4 right-4">
                <span
                  id="event-category"
                  className="bg-purple-600 text-white text-sm font-semibold px-3 py-1 rounded-full"
                >
                  {event.category.name}
                </span>
              </div>
            </div>
          </Suspense>
        </div>
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
            <div className="mb-6 md:mb-0">
              <h1
                id="event-title"
                className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              >
                {event.title}
              </h1>

              <div className="flex items-center mb-4 text-gray-600">
                <CalendarFoldIcon className="h-5 w-5 mr-2" />
                <div className="flex flex-col">
                  <span className="event-date">
                    {formatDateTime(event.startDateTime).dateOnly} -{" "}
                    {formatDateTime(event.startDateTime).timeOnly}
                  </span>
                  <span className="event-date">
                    {formatDateTime(event.endDateTime).dateOnly} -{" "}
                    {formatDateTime(event.endDateTime).timeOnly}
                  </span>
                </div>
              </div>

              <div className="flex items-center mb-4 text-gray-600">
                <MapPinIcon className="h-5 w-5 mr-2" />
                <span id="event-location">{event.location}</span>
              </div>

              <div className="flex items-center mb-4 text-gray-600">
                <CircleDollarSignIcon className="h-5 w-5 mr-2" />
                <span
                  id="event-price"
                  className="font-semibold text-purple-600"
                >
                  $49.99
                </span>
              </div>
            </div>

            <div>
              {hasEventFinished && (
                <div className="flex p-2 text-red-400">
                  Sorry, tickets are no longer available.
                </div>
              )}

              <div className="flex flex-col space-y-4">
                {!hasEventFinished && <CheckoutButton event={event} />}

                <Button
                  variant="secondary"
                  className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg transition flex items-center justify-center"
                >
                  <Share2Icon className="h-5 w-5 mr-2" />
                  Share Event
                </Button>

                <Button
                  variant="secondary"
                  className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg transition flex items-center justify-center"
                >
                  <BookmarkIcon className="h-5 w-5 mr-2" />
                  Save Event
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 my-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  About This Event
                </h2>
                <div id="event-description" className="text-gray-600 space-y-4">
                  {event.description ? (
                    <p>{event.description}</p>
                  ) : (
                    <p className="text-gray-500">No description available.</p>
                  )}
                </div>
              </div>
              {/* <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  Schedule
                </h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div id="event-schedule" className="space-y-4">
                    <div className="flex">
                      <div className="w-1/3 font-semibold text-gray-800">
                        4:00 PM
                      </div>
                      <div className="w-2/3 text-gray-600">Gates Open</div>
                    </div>
                    <div className="flex">
                      <div className="w-1/3 font-semibold text-gray-800">
                        4:30 PM
                      </div>
                      <div className="w-2/3 text-gray-600">
                        Opening Act: The Soundwaves
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-1/3 font-semibold text-gray-800">
                        6:00 PM
                      </div>
                      <div className="w-2/3 text-gray-600">Sunset Strings</div>
                    </div>
                    <div className="flex">
                      <div className="w-1/3 font-semibold text-gray-800">
                        7:30 PM
                      </div>
                      <div className="w-2/3 text-gray-600">
                        Rhythm Collective
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-1/3 font-semibold text-gray-800">
                        9:00 PM
                      </div>
                      <div className="w-2/3 text-gray-600">
                        Headliner: Melody Masters
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-1/3 font-semibold text-gray-800">
                        11:00 PM
                      </div>
                      <div className="w-2/3 text-gray-600">Event Ends</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  Featured Performers
                </h2>
                <div
                  id="event-performers"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <div className="bg-white rounded-lg shadow p-4 flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-purple-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Melody Masters
                      </h3>
                      <p className="text-sm text-gray-500">Headliner</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-4 flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-purple-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Rhythm Collective
                      </h3>
                      <p className="text-sm text-gray-500">Supporting Act</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-4 flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-purple-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Sunset Strings
                      </h3>
                      <p className="text-sm text-gray-500">Supporting Act</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-4 flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-purple-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        The Soundwaves
                      </h3>
                      <p className="text-sm text-gray-500">Opening Act</p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>

            <div>
              <div className="mb-8 bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  Organizer
                </h2>
                <div className="flex items-center mb-4">
                  <CircleUserIcon className="h-8 w-8 mr-4 text-purple-600" />
                  <div>
                    <h3 id="organizer-name" className="font-semibold">
                      {event.organizer.firstName} {event.organizer.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">Event Organizer</p>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center"
                >
                  <span>View Profile</span>
                  <ChevronRightIcon className="h-4 w-4 ml-1" />
                </a>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  Location
                </h2>
                <div className="bg-gray-200 rounded-lg overflow-hidden h-48 mb-4">
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <MapBox address={event.location?.toString() || ""} />
                  </div>
                </div>
                <div id="venue-address" className="text-gray-600 text-sm">
                  {event.location}
                </div>
                <Link
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    event.location?.toString() || ""
                  )}`}
                  target="_blank"
                  className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center mt-2"
                >
                  <span>Get Directions</span>
                  <ExternalLinkIcon className="h-4 w-4 ml-1" />
                </Link>
              </div>

              {/* <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Tags</h2>
                <div className="flex flex-wrap gap-2" id="event-tags">
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    Music
                  </span>
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    Festival
                  </span>
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    Live Performance
                  </span>
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    Outdoor
                  </span>
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    Summer
                  </span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            Similar Events You May Like
          </h2>

          <Suspense fallback={<EventsSkeleton />}>
            <Collection
              data={relatedEvents?.data}
              emptyTitle="No Events Found"
              emptyStateSubtext="Come back later"
              collectionType="All_Events"
              limit={3}
              page={pageNumber}
              totalPages={relatedEvents?.totalPages}
            />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default EventDetails;
