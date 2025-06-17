import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import { EventsSkeleton } from "@/components/shared/EventsSkeleton";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import { Link } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

export default async function Home({ searchParams }: SearchParamProps) {
  const { page, query, category } = await searchParams;
  const pageNumber = page ? parseInt(page as string, 10) : 1;

  const events = await getAllEvents({
    query: query?.toString() || "",
    category: category?.toString() || "",
    page: pageNumber,
    limit: 6,
  });

  return (
    <>
      <section className="bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600 text-white py-16">
        <div className="container flex flex-col justify-center mx-auto px-4 text-center h-[300px]">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Amazing Events
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Find and book tickets for the best events happening around you.
          </p>
          <Search />
        </div>
      </section>
      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <div>
          <h2 className="text-3xl font-bold mb-2 text-gray-800">
            Featured Events
          </h2>
          <p className="text-gray-600 mb-8">
            Don't miss out on these popular events
          </p>
        </div>

        <Suspense fallback={<EventsSkeleton />}>
          <Collection
            data={events?.data}
            emptyTitle="No Events Found"
            emptyStateSubtext="Come back later"
            collectionType="All_Events"
            limit={6}
            page={pageNumber}
            totalPages={events?.totalPages}
          />
        </Suspense>
      </section>
    </>
  );
}
