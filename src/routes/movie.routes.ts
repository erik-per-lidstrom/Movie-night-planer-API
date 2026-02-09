import { Router } from "express";
import {
  createMovie,
  getMovieByEventId,
  getMovieById,
  deleteMovie,
  updateMovie,
} from "../controllers/movie.controller";
import { protect, restrictTo } from "../middleware/auth.middelware";
import { validate } from "../middleware/validate.middleware";
import { MovieZodSchema } from "../models/movie.model";

const router = Router();

router.post("/", validate(MovieZodSchema), protect, createMovie);

router.get("/:id", protect, getMovieById);

router.get("/event/:id", protect, getMovieByEventId);

router.put("/:id", protect, updateMovie);

router.delete("/:id", protect, deleteMovie);

export default router;
