import EventForm from "@/components/shared/EventForm";
import { getEventById } from "@/lib/actions/event.actions";
import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { auth } from "@clerk/nextjs/server";

type UpdateEventProps = {
  params: {
    id: string;
  };
};

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
  const { userId } = await auth();

  await connectToDatabase();
  const user = await User.findOne({ clerkId: userId });

  const _UserId = user?._id.toString();
  const event = await getEventById(id);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Update Event
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm
          type="Update"
          event={event}
          eventId={event._id}
          userId={_UserId}
        />
      </div>
    </>
  );
};

export default UpdateEvent;
