"use server";

import { CreateTicketParams, GetTicketsByUserParams } from "@/types";
import { connectToDatabase } from "../database";
import Ticket from "../database/models/ticket.model";
import { handleError } from "../utils";
import Order from "../database/models/order.model";
import User from "../database/models/user.model";
import Category from "../database/models/category.model";
import Event from "../database/models/event.model";

const populateTicket = (query: any) => {
  return query
    .populate({
      path: "event",
      model: Event,
      select:
        "_id title category organizer imageUrl startDateTime endDateTime location price isFree url",
      populate: [
        {
          path: "organizer",
          model: User,
          select: "_id firstName lastName",
        },
        {
          path: "category",
          model: Category,
          select: "_id name",
        },
      ],
    })
    .populate({
      path: "order",
      model: Order,
      select: "_id status",
    })
    .populate({
      path: "buyer",
      model: User,
      select: "_id firstName lastName",
    });
};

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

export const getTicketsByUser = async ({
  userId,
  limit = 6,
  page,
}: GetTicketsByUserParams) => {
  try {
    await connectToDatabase();

    const conditions = { buyer: userId };
    const skipAmount = (page - 1) * limit;

    const ticketsQuery = Ticket.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const tickets = await populateTicket(ticketsQuery);
    const ticketsCount = await Ticket.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(tickets)),
      totalPages: Math.ceil(ticketsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
};

export const getTicketById = async (ticketId: string) => {
  try {
    await connectToDatabase();

    const ticket = await populateTicket(Ticket.findById(ticketId));
    return JSON.parse(JSON.stringify(ticket));
  } catch (error) {
    handleError(error);
  }
};
