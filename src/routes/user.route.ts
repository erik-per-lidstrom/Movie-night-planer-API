import { Router } from "express";
import {
  loginControler,
  regiseterControler,
} from "../controllers/user.controller";
import { validate } from "../middleware/validate.middleware";
import {
  logInUserValidation,
  registerUserValidation,
} from "../models/user.model";

const router = Router();

router.post("/register", validate(registerUserValidation), regiseterControler);

router.post("/login", validate(logInUserValidation), loginControler);

export default router;
