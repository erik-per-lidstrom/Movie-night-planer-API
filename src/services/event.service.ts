// services for EVENTS
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
  date: number,
  location: string,
  description?: string,
  agerate?: string,
  genre?: string,
  runtime?: number,
  imgUrl?: string,
) => {
  const newEvent: EventDocuemnt = {
    title,
    date,
    location,
    description,
    agerate,
    genre,
    runtime,
  };
};
