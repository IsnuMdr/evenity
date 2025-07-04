import Collection from "@/components/shared/events/Collection";
import { EventsSkeleton } from "@/components/shared/events/EventsSkeleton";
import { Button } from "@/components/ui/button";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { connectToDatabase } from "@/lib/database";
import { IOrder } from "@/lib/database/models/order.model";
import User from "@/lib/database/models/user.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React, { Suspense } from "react";

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { userId } = await auth();

  const query = await searchParams;

  await connectToDatabase();
  const user = await User.findOne({ clerkId: userId });

  const ordersPage = Number(query?.ordersPage as string) || 1;
  const eventsPage = Number(query?.eventsPage as string) || 1;

  const orders = await getOrdersByUser({
    userId: user._id.toString(),
    page: ordersPage,
  });

  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
  const organizedEvents = await getEventsByUser({
    userId: user._id.toString(),
    page: eventsPage,
  });

  return (
    <>
      {/* My Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/">Explore More Events</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Suspense fallback={<EventsSkeleton />}>
          <Collection
            data={orderedEvents}
            emptyTitle="No tickets purchased yet"
            emptyStateSubtext="Explore events and book your tickets now"
            collectionType="My_Tickets"
            limit={3}
            page={ordersPage}
            urlParamName="ordersPage"
            totalPages={orders?.totalPages}
          />
        </Suspense>
      </section>

      {/* Events Organized */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/events/create">Create New Event</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Suspense fallback={<EventsSkeleton />}>
          <Collection
            data={organizedEvents?.data}
            emptyTitle="No events have been created yet"
            emptyStateSubtext="Go create some now"
            collectionType="Events_Organized"
            limit={3}
            page={eventsPage}
            urlParamName="eventsPage"
            totalPages={organizedEvents?.totalPages}
          />
        </Suspense>
      </section>
    </>
  );
};

export default ProfilePage;
