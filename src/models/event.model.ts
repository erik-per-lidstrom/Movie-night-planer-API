import mongoose from "mongoose";

import { z } from "zod";

export interface EventDocument {
  name: string;
  date: string;
  location: string;
  starttime: string;
  endtime: string;
  description: string;
  agerate: string;
  genre: string;
  ownerId: mongoose.Types.ObjectId;
  movies: mongoose.Types.ObjectId[];
}
export const EventZodSchema = z.object({
  body: z.object({
    name: z.string("not valid name").min(3),
    date: z.string("not valid date"),
    location: z.string("not valid location").min(3),
    starttime: z.string("not valid starttime"),
    endtime: z.string("not valid endtime"),
    description: z.string("not valid description").min(3),
    agerate: z.string("not valid agerate").min(1),
    genre: z.string("not valid genre").min(1),
    ownerId: z.string("not valid ownerId"),
    movies: z.array(z.string("not valid movieId")),
  }),
});

export type CreateEventTypeZ = z.infer<typeof EventZodSchema>["body"];

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    date: { type: String, required: true },
    location: { type: String, required: true },
    starttime: { type: String, required: true },
    endtime: { type: String, required: true },
    description: { type: String, required: true },
    agerate: { type: String, required: true },
    genre: { type: String, required: true },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
  },
  { timestamps: true },
);

export const EventModel = mongoose.model<EventDocument>("Event", eventSchema);
