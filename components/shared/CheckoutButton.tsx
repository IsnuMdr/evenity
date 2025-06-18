"use client";

import { IEvent } from "@/lib/database/models/event.model";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Checkout from "./Checkout";
import { TicketIcon } from "lucide-react";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const hasEventFinished = new Date(event.endDateTime) < new Date();

  return (
    <>
      <SignedOut>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition flex items-center justify-center">
          <TicketIcon className="h-5 w-5 mr-2" />
          <Link href="/sign-in">Get Ticket</Link>
        </Button>
      </SignedOut>

      <SignedIn>
        <Checkout event={event} userId={userId} />
      </SignedIn>
    </>
  );
};

export default CheckoutButton;
