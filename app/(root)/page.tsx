import Collection from "@/components/shared/Collection";
import { EventsSkeleton } from "@/components/shared/EventsSkeleton";
import Search from "@/components/shared/Search";
import { getAllCategoriesWithEventCounts } from "@/lib/actions/category.actions";
import { getAllEvents } from "@/lib/actions/event.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { IEvent } from "@/lib/database/models/event.model";
import { SearchParamProps } from "@/types";
import {
  BookOpenIcon,
  CpuIcon,
  DumbbellIcon,
  FilmIcon,
  MoreHorizontalIcon,
  MusicIcon,
  PartyPopperIcon,
  UtensilsIcon,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

interface ICategoryWithCount extends ICategory {
  eventCount: number;
}

export default async function Home({ searchParams }: SearchParamProps) {
  const { page, query, category } = await searchParams;
  const pageNumber = page ? parseInt(page as string, 10) : 1;

  const events: { data: IEvent[]; totalPages: number } | undefined =
    await getAllEvents({
      query: query?.toString() || "",
      category: category?.toString() || "",
      page: pageNumber,
      limit: 6,
    });

  const categories: ICategoryWithCount[] =
    await getAllCategoriesWithEventCounts();

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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">
            Browse by Category
          </h2>
          <p className="text-gray-600 mb-8">
            Find events that match your interests
          </p>

          {categories.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`?category=${category.name}`}
                  className={`rounded-xl p-6 text-center text-white hover:shadow-lg transition cursor-pointer ${
                    category.name === "Music"
                      ? "bg-gradient-to-r from-purple-500 to-indigo-600"
                      : category.name === "Technology"
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                      : category.name === "Food & Drink"
                      ? "bg-gradient-to-r from-amber-500 to-red-500"
                      : category.name === "Sports"
                      ? "bg-gradient-to-r from-green-500 to-emerald-500"
                      : category.name === "Arts & Film"
                      ? "bg-gradient-to-r from-violet-500 to-purple-500"
                      : category.name === "Festivals"
                      ? "bg-gradient-to-r from-pink-500 to-rose-500"
                      : category.name === "Education"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                      : category.name === "More"
                      ? "bg-gradient-to-r from-gray-700 to-gray-900"
                      : "bg-gradient-to-r from-blue-500 to-green-500"
                  }`}
                >
                  {
                    // Render different lucide-react icons based on category name
                    category.name === "Music" ? (
                      <MusicIcon className="h-12 w-12 mx-auto mb-4 text-purple-100" />
                    ) : category.name === "Technology" ? (
                      <CpuIcon className="h-12 w-12 mx-auto mb-4 text-blue-100" />
                    ) : category.name === "Food & Drink" ? (
                      <UtensilsIcon className="h-12 w-12 mx-auto mb-4 text-amber-100" />
                    ) : category.name === "Sports" ? (
                      <DumbbellIcon className="h-12 w-12 mx-auto mb-4 text-green-100" />
                    ) : category.name === "Arts & Film" ? (
                      <FilmIcon className="h-12 w-12 mx-auto mb-4 text-violet-100" />
                    ) : category.name === "Festivals" ? (
                      <PartyPopperIcon className="h-12 w-12 mx-auto mb-4 text-pink-100" />
                    ) : category.name === "Education" ? (
                      <BookOpenIcon className="h-12 w-12 mx-auto mb-4 text-cyan-100" />
                    ) : category.name === "More" ? (
                      <MoreHorizontalIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    ) : (
                      <MusicIcon className="h-12 w-12 mx-auto mb-4 text-purple-100" />
                    )
                  }
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                  <p className="mt-2 text-blue-100">
                    {category.eventCount} Events
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No categories available</p>
          )}
        </div>
      </section>
    </>
  );
}
