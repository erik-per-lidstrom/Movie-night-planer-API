import { NextFunction, Request, Response } from "express";
import {
  loginUserServise,
  registerUserService,
} from "../services/user.service";

export const regiseterControler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, age, email, password } = req.body;
  try {
    const newUser = await registerUserService({ name, email, age, password });
    newUser.password = undefined;
    res
      .status(201)
      .json({ message: "acount created succsesfuly", user: newUser });
  } catch (error) {
    next(error);
  }
};

export const loginControler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  try {
    const newUser = await loginUserServise({ email, password });

    const safeUser = {
      name: newUser.user.name,
      email: newUser.user.email,
      age: newUser.user.age,
      role: newUser.user.role,
    };

    res.status(200).json({
      message: "login successfuly",
      user: safeUser,
      token: newUser.token,
    });
  } catch (error) {
    next(error);
  }
};
