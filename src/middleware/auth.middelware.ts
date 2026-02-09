import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../utils/app.error";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AppError("unauthorised", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    const paload = decoded as JwtPayload;

    req.user = { id: paload.id, role: paload.role };

    next();
  } catch (error) {
    next(error);
  }
};

type Roles = "user" | "modirator" | "admin";

export const restrictTo = (...allowedRoles: Roles[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user || !allowedRoles.includes(user.role as Roles)) {
      throw new AppError("forbiden", 403);
    }

    // allow owner to update and delete
    if (allowedRoles.includes("admin") || allowedRoles.includes("modirator")) {
      if (req.params.id && user.id !== req.params.id) {
        throw new AppError("forbiden", 403);
      }
    }

    next();
  };
};
