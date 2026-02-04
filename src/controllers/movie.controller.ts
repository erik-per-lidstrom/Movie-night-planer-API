import { NextFunction, Request, Response } from "express";
import {
  createMovieService,
  getMovieByIdService,
  deleteMovieService,
  updateMovieService,
} from "../services/movie.service";

export const createMovie = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { Title, Description, AgeRate, Genre, ImageURL, Runtime, EventId } =
      req.body;

    const newMovie = await createMovieService(
      Title,
      Description,
      AgeRate,
      Genre,
      ImageURL,
      Runtime,
      EventId,
    );
    res
      .status(201)
      .json({ message: "Movie created successfully", movie: newMovie });
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
    await deleteMovieService(req.params.id);
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
    const id = req.params.id as string;
    const changes = req.body;
    const updatedMovie = await updateMovieService(id, changes);
    res.status(200).json(updatedMovie);
  } catch (error) {
    next(error);
  }
};
