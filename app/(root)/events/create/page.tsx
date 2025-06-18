import EventForm from "@/components/shared/EventForm";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

const CreateEvent = async () => {
  const { userId } = await auth();
  const user = await currentUser();

  return (
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
      <EventForm userId={userId as string} type="Create" />
    </section>
  );
};

export default CreateEvent;
