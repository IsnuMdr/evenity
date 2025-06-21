import { Schema, model, models, Document } from "mongoose";

export interface ITicket extends Document {
  _id: string;
  createdAt: Date;
  isUsed?: boolean;
  ticketType?: string;
  buyer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  event: {
    _id: string;
    title: string;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    location: string;
    isFree: boolean;
    price: string;
    category: {
      _id: string;
      name: string;
    };
  };
  order: {
    _id: string;
    stripeId: string;
  };
}

export type ITicketItem = {
  _id: string;
  isUsed: boolean;
  createdAt: Date;
  eventTitle: string;
  eventId: string;
  orderId: string;
  buyer: string;
};

const TicketSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  ticketType: {
    type: String,
    default: "General Admission",
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event",
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order",
  },
});

const Ticket = models.Ticket || model("Ticket", TicketSchema);

export default Ticket;
