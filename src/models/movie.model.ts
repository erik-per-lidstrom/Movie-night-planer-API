import mongoose from "mongoose";
import { z } from "zod";

export interface MovieDocument {
  Title: string;
  AgeRate: string;
  Genre: string;
  Description: string;
  ImageURL: string;
  Runtime: string;
  EventId: mongoose.Types.ObjectId;
  OwnerId: mongoose.Types.ObjectId;
}

export const MovieZodSchema = z.object({
  body: z.object({
    Title: z.string("not valid title").min(3),
    AgeRate: z.string("not valid age rate"),
    Genre: z.string("not valid genre").min(3),
    Description: z.string("not valid description"),
    ImageURL: z.string("not valid image URL"),
    Runtime: z.string("not valid runtime"),
    EventId: z.string("not valid eventId").min(1),
  }),
});

export type CreateEventTypeZ = z.infer<typeof MovieZodSchema>["body"];

const movieSchema = new mongoose.Schema(
  {
    Title: { type: String, required: true },
    AgeRate: { type: String, required: true },
    Genre: { type: String, required: true },
    Description: { type: String, required: true },
    ImageURL: { type: String, required: true },
    Runtime: { type: String, required: true },
    EventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    OwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
  },
  { timestamps: true },
);
export const MovieModel = mongoose.model<MovieDocument>("Movie", movieSchema);
