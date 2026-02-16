import { NextFunction, Request, Response } from "express";
import * as EventService from "../services/event.service";
import { Types } from "mongoose";
import { EventListQueryParams } from "../types/query.types";
import {
  capLimit,
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  toPositiveInteger,
} from "../utils/query.utils";

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      name,
      date,
      location,
      starttime,
      endtime,
      description,
      agerate,
      genre,
      movies,
    } = req.body;

    const newEvent = await EventService.createEventService({
      name,
      date,
      location,
      starttime,
      endtime,
      description,
      agerate,
      genre,
      ownerId: new Types.ObjectId(req.user!.id),
      movies,
    });

    res.status(201).json({
      message: "Event created successfully",
      event: {
        _id: newEvent._id,
        name: newEvent.name,
        date: newEvent.date,
        location: newEvent.location,
        starttime: newEvent.starttime,
        endtime: newEvent.endtime,
        description: newEvent.description,
        agerate: newEvent.agerate,
        genre: newEvent.genre,
        movies: newEvent.movies,
        ownerId: newEvent.ownerId,
      },
    });
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
    const {
      page: pageParam,
      limit: limitParam,
      sort,
      fields,
      search,
      date,
      location,
      ownerId,
      agerate,
      genre,
    } = req.query as EventListQueryParams;
    const page = toPositiveInteger(pageParam, DEFAULT_PAGE);
    const limit = capLimit(toPositiveInteger(limitParam, DEFAULT_LIMIT));
    const events = await EventService.showEventsService({
      page,
      limit,
      sort,
      fields,
      search,
      date,
      location,
      ownerId,
      agerate,
      genre,
    });
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
    const event = await EventService.getEventByIdService(req.params.id);
    res.status(200).json({
      _id: event._id,
      name: event.name,
      date: event.date,
      location: event.location,
      starttime: event.starttime,
      endtime: event.endtime,
      description: event.description,
      agerate: event.agerate,
      genre: event.genre,
      movies: event.movies,
      ownerId: event.ownerId,
    });
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.id;
    const role = req.user!.role;
    const id = req.params.id as string;
    const changes = req.body;
    const updatedEvent = await EventService.updateEventService(
      id,
      changes,
      userId,
      role,
    );
    res.status(200).json(updatedEvent);
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
    const userId = req.user!.id;
    const role = req.user!.role;
    await EventService.deleteEventService(req.params.id, userId, role);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    next(error);
  }
};
