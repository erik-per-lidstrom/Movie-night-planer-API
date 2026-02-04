import mongoose from "mongoose";

export interface EventDocument {
  title: string;
  date: Date;
  location: string;
  description: string;
  agerate: string;
  genre: string;
  runtime: number;
  imgUrl: string;
}
import { z } from "zod";

export interface Event {
  name: string;
  date: Date;
  location: string;
  starttime: string;
  endtime: string;
  ownerId: mongoose.Types.ObjectId;
}
export const EventZodSchema = z.object({
  body: z.object({
    name: z.string("not valid name").min(3),
    date: z.string("not valid date"),
    location: z.string("not valid location").min(3),
    starttime: z.string("not valid starttime"),
    endtime: z.string("not valid endtime"),
    ownerId: z.string("not valid ownerId"),
  }),
});

export type CreateEventTypeZ = z.infer<typeof EventZodSchema>["body"];

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    starttime: { type: String, required: true },
    endtime: { type: String, required: true },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);
export const EventModel = mongoose.model<Event>("Event", eventSchema);
