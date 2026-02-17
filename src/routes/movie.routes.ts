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
  "/",
  protect,
  validate(MovieZodSchema),
  restrictTo("admin"),
  createMovie,
);

router.get("/", protect, getAllMovies);
router.get("/event/:id", protect, getMovieByEventId);
router.get("/:id", protect, getMovieById);

router.put("/:id", protect, updateMovie);

router.delete("/:id", protect, deleteMovie);

export default router;
