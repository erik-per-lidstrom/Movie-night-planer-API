import { MovieDocument, MovieModel } from "../models/movie.model";
import { AppError } from "../utils/app.error";

export const createMovieService = async (
  Title: string,
  AgeRate: string,
  Genre: string,
  Description: string,
  ImageURL: string,
  Runtime: string,
  EventId: string,
  OwnerId: string,
) => {
  const existingMovie = await MovieModel.findOne({ Title });
  console.log(existingMovie);
  if (existingMovie) throw new AppError("movie already exists", 409);
  const newMovie = {
    Title,
    AgeRate,
    Genre,
    Description,
    ImageURL,
    Runtime,
    EventId,
    OwnerId,
  };
  await MovieModel.create(newMovie);
  return newMovie;
};

export const getAllMoviesService = async () => {
  const movies = await MovieModel.find();
  if (movies.length === 0) {
    throw new AppError("No movies found", 404);
  }

  return movies;
};

export const getMoviesByEventIdService = async (eventId: string) => {
  const movies = await MovieModel.find({ eventId: eventId });
  if (!movies || movies.length === 0) {
    throw new AppError("No movies found for this event", 404);
  }
  return movies;
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
