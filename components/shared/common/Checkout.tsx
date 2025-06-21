import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { IEvent } from "@/lib/database/models/event.model";
import { Button } from "../../ui/button";
import { checkoutOrder } from "@/lib/actions/order.actions";
import { CheckoutOrderParams } from "@/types";
import { TicketIcon } from "lucide-react";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ event, userId }: { event: IEvent; userId: string }) => {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  const onCheckout = async () => {
    const order: CheckoutOrderParams = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price!,
      isFree: event.isFree,
      buyerId: userId,
    };

    await checkoutOrder(order);
  };

  return (
    <Button
      type="submit"
      onClick={onCheckout}
      role="link"
      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition flex items-center justify-center"
    >
      <TicketIcon className="h-5 w-5 mr-2" />
      {event.isFree ? "Get Ticket" : "Buy Ticket"}
    </Button>
  );
};

export default Checkout;
