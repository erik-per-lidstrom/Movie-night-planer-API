import { NextFunction, Request, Response } from "express";
import {
  createMovieService,
  getMovieByIdService,
  deleteMovieService,
  updateMovieService,
  getMoviesByEventIdService,
  getAllMoviesService,
} from "../services/movie.service";
import { MovieModel } from "../models/movie.model";

export const createMovie = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      Title,
      Description,
      AgeRate,
      Genre,
      ImageURL,
      Runtime,
      EventId,
      OwnerId = req.user?.id ?? "",
    } = req.body;

    const newMovie = await createMovieService(
      Title,
      Description,
      AgeRate,
      Genre,
      ImageURL,
      Runtime,
      EventId,
      OwnerId,
    );
    res
      .status(201)
      .json({ message: "Movie created successfully", movie: newMovie });
  } catch (error) {
    next(error);
  }
};

export const getAllMovies = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const movies = await getAllMoviesService();
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};

export const getMovieByEventId = async (
  req: Request<{ eventId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const eventId = req.params.eventId;
    // Assuming you have a service function to get movies by event ID
    const movies = await getMoviesByEventIdService(eventId);
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};
export const getMovieById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const movie = await getMovieByIdService(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    next(error);
  }
};

export const deleteMovie = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.id;
    const role = req.user!.role;
    await deleteMovieService(req.params.id, userId, role);
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateMovie = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.id;
    const role = req.user!.role;
    const id = req.params.id as string;
    const changes = req.body;
    const updatedMovie = await updateMovieService(id, changes, userId, role);
    res.status(200).json(updatedMovie);
  } catch (error) {
    next(error);
  }
};
