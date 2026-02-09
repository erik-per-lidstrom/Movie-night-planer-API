// services for EVENTS

import { mongo } from "mongoose";
import { EventDocument, EventModel } from "../models/event.model";
import { AppError } from "../utils/app.error";

export const createEvent = async (
  name: string,
  date: string,
  location: string,
  description: string,
  agerate: string,
  starttime: string,
  endtime: string,
  genre: string,
  ownerId: mongo.ObjectId,
  movies: mongo.ObjectId[],
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
    ownerId,
    movies,
  };
  const existingEvent = await EventModel.findOne({ name });
  if (existingEvent) {
    throw new AppError("Event with this name already exists", 409);
  }
  const createdEvent = (await EventModel.create(newEvent)).populate("movies");
  return createdEvent;
};

export const showEvents = async () => {
  const events = await EventModel.find();
  if (events.length === 0) {
    throw new AppError("No events found", 404);
  }
  return events;
};

export const getEventById = async (id: string) => {
  const event = await EventModel.findById(id).populate("movies");
  if (!event) {
    throw new AppError("Event not found", 404);
  }

  return event;
};

export const updateEvent = async (
  id: string,
  updateData: Partial<EventDocument>,
) => {
  const updatedEvent = await EventModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedEvent) {
    throw new AppError("Event not found", 404);
  }

  return updatedEvent;
};

export const deleteEvent = async (id: string) => {
  const deletedEvent = await EventModel.findByIdAndDelete(id);
  if (!deletedEvent) {
    throw new AppError("Event not found", 404);
  }
  return deletedEvent;
};
