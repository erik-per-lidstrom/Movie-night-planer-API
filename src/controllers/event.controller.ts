import { NextFunction, Request, Response } from "express";
import * as EventService from "../services/event.service";
export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, date, location } = req.body;
    const newEvent = await EventService.createEvent(title, date, location);
    res.status(201).json({ message: "Event created successfully" });
  } catch (error) {
    next(error);
  }
};

export const showEvents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const events = await EventService.getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

export const getEventById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const event = await EventService.getEventById(req.params.id);
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    await EventService.deleteEvent(req.params.id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    next(error);
  }
};
