import mongoose from "mongoose";
import { createApp } from "./app";
import dotenv from "dotenv";
dotenv.config();

const PORT = Number(process.env.PORT) || 4000;
const NODE_ENV = process.env.NODE_ENV || "development";
const MONGO_URI = process.env.MONGO_URI ?? "mongodb://localhost:27017/myapp";

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.info(" Connected to MongoDB");
    const app = createApp();
    app.listen(PORT, () => {
      console.log(
        `• Server running in ${NODE_ENV} mode on http://localhost:${PORT}`,
      );
    });
  } catch (error) {
    console.error("L Failed to start server");
    console.error(error);
    process.exit(1);
  }
};
startServer();
