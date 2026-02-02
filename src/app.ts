import express, { type Request, type Response } from "express";
import userRouter from "./routes/user.route";
export const createApp = () => {
  const app = express();
  app.use(express.json());

  app.use("/api/users", userRouter);

  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });
  return app;
};
