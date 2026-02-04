import mongoose from "mongoose";

export interface EventDocument {
  title: string;
  date: Date;
  location: string;
  description: string;
  agerate: string;
  genre: string;
  runtime: number;
  imgUrl: string;
}
