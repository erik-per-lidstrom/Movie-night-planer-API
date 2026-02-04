// services for EVENTS
import { EventDocument, EventModel } from "../models/event.model";
import { AppError } from "../utils/app.error";

export interface Event {
  id: number;
  name: string;
  date: Date;
  location: string;
  description: string;
  starttime: string;
  endtime: string;
  agerate: string;
  genre: string;
}

export const createEvent = async (
  name: string,
  date: Date,
  location: string,
  description: string,
  agerate: string,
  starttime: string,
  endtime: string,
  genre: string,
) => {
  const newEvent: EventDocument = {
    name,
    date,
    location,
    description,
    starttime,
    endtime,
    agerate,
    genre,
  };
};
