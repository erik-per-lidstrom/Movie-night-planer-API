import { NextFunction, Request, Response } from "express";
import {
  createMovieService,
  getAllMoviesService,
  getMovieByIdService,
  deleteMovieService,
  updateMovieService,
} from "../services/movie.service";
import {
  capLimit,
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  toPositiveInteger,
} from "../utils/query.utils";
import { MovieListQueryParams, MovieListRequest } from "../types/query.types";

export const createMovie = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { Title, Date, Description, AgeRate, Genre, ImageURL } = req.body;

    const newMovie = await createMovieService(
      Title,
      Date,
      Description,
      AgeRate,
      Genre,
      ImageURL,
    );
    res
      .status(201)
      .json({ message: "Movie created successfully", movie: newMovie });
  } catch (error) {
    next(error);
  }
};

export const getMovies = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      page: pageParam,
      limit: limitParam,
      sort,
      Title,
      AgeRate,
      Genre,
      Description,
      ImageURL,
      search,
    } = req.query as MovieListQueryParams;
    const page = toPositiveInteger(pageParam, DEFAULT_PAGE);
    const limit = capLimit(toPositiveInteger(limitParam, DEFAULT_LIMIT));
    const options: MovieListRequest = {
      limit,
      page,
      Title,
      AgeRate,
      Genre,
      Description,
      ImageURL,
      search,
      sort,
    };

    const movies = await getAllMoviesService(options);
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
