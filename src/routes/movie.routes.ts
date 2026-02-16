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

<<<<<<< HEAD
router.post(
  "/event/:id",
  validate(MovieZodSchema),
  protect,
  restrictTo("admin"),
  createMovie,
);
=======
router.post("/", validate(MovieZodSchema), protect, createMovie);
>>>>>>> 4eb16ffa35465b55a9ffb92cc5c433979a62a9af

router.get("/", protect, getAllMovies);

router.get("/:id", protect, getMovieById);

router.get("/event/:id", protect, getMovieByEventId);

router.put("/:id", protect, updateMovie);

router.delete("/:id", protect, deleteMovie);

export default router;
