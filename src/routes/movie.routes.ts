import { Router } from "express";
import {
  createMovie,
  getMovieByEventId,
  getMovieById,
  deleteMovie,
  updateMovie,
  getAllMovies,
} from "../controllers/movie.controller";
import { protect, restrictTo } from "../middleware/auth.middelware";
import { validate } from "../middleware/validate.middleware";
import { MovieZodSchema } from "../models/movie.model";

const router = Router();

router.post(
  "/event/:id",
  validate(MovieZodSchema),
  protect,
  restrictTo("admin"),
  createMovie,
);

router.get("/", protect, getAllMovies);

router.get("/:id", protect, getMovieById);

router.get("/event/:id", protect, getMovieByEventId);

router.put("/:id", protect, restrictTo("admin"), updateMovie);

router.delete("/:id", protect, restrictTo("admin"), deleteMovie);

export default router;
