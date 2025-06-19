"use server";

import { CreateTicketParams } from "@/types";
import { connectToDatabase } from "../database";
import Ticket from "../database/models/ticket.model";
import { handleError } from "../utils";
import { ObjectId } from "mongodb";

export const createTicket = async (ticket: CreateTicketParams) => {
  try {
    await connectToDatabase();

    const newTicket = await Ticket.create({
      ...ticket,
      event: ticket.eventId,
      order: ticket.orderId,
      buyer: ticket.buyerId,
    });

    return JSON.parse(JSON.stringify(newTicket));
  } catch (error) {
    handleError(error);
  }
};

export const getTicketsByUser = async (userId: string) => {
  try {
    await connectToDatabase();

    const userObjectId = new ObjectId(userId);

    const tickets = await Ticket.find({ buyer: userObjectId })
      .populate({
        path: "event",
        model: "Event",
        populate: {
          path: "organizer",
          model: "User",
          select: "_id firstName lastName",
        },
      })
      .populate({
        path: "order",
        model: "Order",
        select: "_id totalAmount",
      })
      .populate({
        path: "buyer",
        model: "User",
        select: "_id firstName lastName email",
      })
      .lean();

    return JSON.parse(JSON.stringify(tickets));
  } catch (error) {
    handleError(error);
  }
};
