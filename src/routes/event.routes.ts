import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  showEvents,
  getEventById,
  updateEvent,
} from "../controllers/event.controller";
import { protect, restrictTo } from "../middleware/auth.middelware";
import { validate } from "../middleware/validate.middleware";
import { EventZodSchema } from "../models/event.model";

const router = Router();

router.get("/", protect, showEvents);

router.get("/:id", protect, getEventById);

router.put("/:id", protect, restrictTo("admin"), updateEvent);

router.delete("/:id", protect, restrictTo("admin"), deleteEvent);

router.post(
  "/",
  validate(EventZodSchema),
  protect,
  restrictTo("admin"),
  createEvent,
);
export default router;
