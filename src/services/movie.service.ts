import ru from "zod/v4/locales/ru.js";
import { MovieDocument, MovieModel } from "../models/movie.model";
import { ListResult, MovieListRequest } from "../types/query.types";
import { AppError } from "../utils/app.error";
import {
  buildSearchQuery,
  parseBoolean,
  parseProjection,
  parseSort,
} from "../utils/query.utils";

const allowedSortFields = [
  "createdAt",
  "updatedAt",
  "title",
  "agerate",
  "genre",
  "description",
  "imgUrl",
  "runtime",
] as const;
const allowedProjectionFields = [
  "_id",
  "createdAt",
  "updatedAt",
  "title",
  "agerate",
  "genre",
  "description",
  "imgUrl",
  "runtime",
] as const;

export const getAllMoviesService = async (
  queryParams: MovieListRequest,
): Promise<ListResult<MovieDocument>> => {};

export const createMovieService = async (
  Title: string,
  AgeRate: string,
  Genre: string,
  Description: string,
  ImageURL: string,
  Runtime: string,
) => {
  const existingMovie = await MovieModel.findOne({ Title });
  console.log(existingMovie);
  if (existingMovie) throw new AppError("movie already exists", 409);
  const newMovie = { Title, AgeRate, Genre, Description, ImageURL, Runtime };
  await MovieModel.create(newMovie);
  return newMovie;
};

export const getMovieByIdService = async (id: string) => {
  const Movie = await MovieModel.findById(id);
  if (!Movie) {
    throw new AppError("Movie not found", 404);
  }

  return Movie;
};

export const updateMovieService = async (
  id: string,
  MovieData: Partial<MovieDocument>,
) => {
  const existingMovie = await MovieModel.findById(id);
  if (!existingMovie) throw new Error("User not found...");
  const updatedMovie = await MovieModel.findByIdAndUpdate(id, MovieData, {
    new: true,
    runValidators: true,
  });

  if (!updatedMovie) throw new Error("User not found...");
  return updatedMovie;
};

export const deleteMovieService = async (id: string) => {
  const deletedMovie = await MovieModel.findByIdAndDelete(id);
  if (!deletedMovie) throw new Error("User not found...");
  return deletedMovie;
};
