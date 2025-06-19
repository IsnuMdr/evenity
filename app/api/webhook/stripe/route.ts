import stripe from "stripe";
import { NextResponse } from "next/server";
import { createOrder } from "@/lib/actions/order.actions";
import { createTicket } from "@/lib/actions/ticket.actions";

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  // Get the ID and type
  const eventType = event.type;

  // CREATE
  if (eventType === "checkout.session.completed") {
    const { id, amount_total, metadata } = event.data.object;

    try {
      const order = {
        stripeId: id,
        eventId: metadata?.eventId || "",
        buyerId: metadata?.buyerId || "",
        totalAmount: amount_total ? (amount_total / 100).toString() : "0",
        createdAt: new Date(),
      };

      const newOrder = await createOrder(order);

      const ticket = {
        eventId: metadata?.eventId || "",
        orderId: newOrder._id.toString(),
        buyerId: metadata?.buyerId || "",
        createdAt: new Date(),
        isUsed: false,
      };

      const newTicket = await createTicket(ticket);

      return NextResponse.json(
        {
          message: "Order created successfully",
          newOrder,
          newTicket,
        },
        { status: 200 }
      );
    } catch (error: Error | any) {
      return NextResponse.json({ message: error?.message }, { status: 500 });
    }
  }

  return new Response("", { status: 200 });
}
