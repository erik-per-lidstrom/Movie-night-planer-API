import { EventDocument, EventModel } from "../models/event.model";
import { AppError } from "../utils/app.error";
import { EventListRequest, ListResult } from "../types/query.types";
import {
  buildSearchQuery,
  parseProjection,
  parseSort,
} from "../utils/query.utils";

const allowedSortFields = [
  "createdAt",
  "updatedAt",
  "name",
  "date",
  "location",
  "description",
  "starttime",
  "endtime",
  "agerate",
  "genre",
  "ownerId",
] as const;
const allowedProjectionFields = [
  "_id",
  "name",
  "date",
  "location",
  "description",
  "starttime",
  "endtime",
  "agerate",
  "genre",
  "ownerId",
  "createdAt",
  "updatedAt",
] as const;
const allowedSearchFields = ["name", "description", "category"];

export const showEventsService = async (
  params: EventListRequest,
): Promise<ListResult<EventDocument>> => {
  const {
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
  } = params;

  const filters: Record<string, unknown> = {};
  if (date) filters.date = date;
  if (location) filters.location = location;
  if (ownerId) filters.ownerId = ownerId;
  if (agerate) filters.agerate = agerate;
  if (genre) filters.genre = genre;

  const SearchQuery = buildSearchQuery(search, [...allowedSearchFields]);
  const query: Record<string, unknown> = { ...filters, ...(SearchQuery ?? {}) };

  const sortBy = parseSort(sort, [...allowedSortFields], "-createdAt");
  const projection = parseProjection(fields, [...allowedProjectionFields]);

  const skip = (page - 1) * limit;
  const findQuery = EventModel.find(query).sort(sortBy).skip(skip).limit(limit);
  if (projection) findQuery.select(projection);

  const [data, total] = await Promise.all([
    findQuery.exec(),
    EventModel.countDocuments(query),
  ]);

  const totalPages = Math.ceil(total / limit) || 1;
  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages,
    },
  };
};

export const createEventService = async (params: EventDocument) => {
  const {
    date,
    location,
    description,
    starttime,
    endtime,
    agerate,
    genre,
    ownerId,
  } = params;
  const newEvent = {
    name: params.name,
    date,
    location,
    description,
    starttime,
    endtime,
    agerate,
    genre,
    ownerId,
  };
  await EventModel.create(newEvent);
  return newEvent;
};

export const getEventByIdService = async (id: string) => {
  const event = await EventModel.findById(id);
  if (!event) {
    throw new AppError("Event not found", 404);
  }
  return event;
};

export const updateEventService = async (
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

export const deleteEventService = async (id: string) => {
  const deletedEvent = await EventModel.findByIdAndDelete(id);
  if (!deletedEvent) {
    throw new AppError("Event not found", 404);
  }
  return deletedEvent;
};
