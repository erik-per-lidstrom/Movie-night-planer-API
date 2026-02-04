// services for EVENTS
import { EventDocument, EventModel } from "../models/event.model";
import { AppError } from "../utils/app.error";

export interface Event {
  id: number;
  title: string;
  date: Date;
  location: string;
  description?: string;
  agerate?: string;
  genre?: string;
  runtime?: number;
  imgUrl?: string;
}

export const createEvent = async (
  title: string,
  date: Date,
  location: string,
  description: string,
  agerate: string,
  genre: string,
  runtime: number,
  imgUrl: string,
) => {
  const newEvent: EventDocument = {
    title,
    date,
    location,
    description,
    agerate,
    genre,
    runtime,
    imgUrl,
  };
};
