import express, { type Request, type Response } from "express";
import userRouter from "./routes/user.route";
import eventRouter from "./routes/event.routes";
import { errorHandler } from "./middleware/error.middleware";
export const createApp = () => {
  const app = express();
  app.use(express.json());

  app.use("/api/users", userRouter);

  app.use("/api/events", eventRouter);

  // error handling middleware
  app.use(errorHandler);

  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });
  return app;
};
