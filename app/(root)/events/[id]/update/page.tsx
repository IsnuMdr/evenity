import EventForm from "@/components/shared/EventForm";
import { getEventById } from "@/lib/actions/event.actions";
import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { auth } from "@clerk/nextjs/server";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

type UpdateEventProps = {
  params: {
    id: string;
  };
};

const UpdateEvent = async ({ params }: UpdateEventProps) => {
  const { id } = await params;
  const { userId } = await auth();

  await connectToDatabase();
  const user = await User.findOne({ clerkId: userId });

  const _UserId = user?._id.toString();
  const event = await getEventById(id);

  return (
    <>
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-purple-600">
            Home
          </Link>
          <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400" />
          <Link href="#" className="hover:text-purple-600">
            My Events
          </Link>
          <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400" />
          <span className="text-gray-800 font-medium">Create Event</span>
        </div>
        <EventForm
          type="Update"
          event={event}
          eventId={event._id}
          userId={_UserId}
        />
      </section>
    </>
  );
};

export default UpdateEvent;
