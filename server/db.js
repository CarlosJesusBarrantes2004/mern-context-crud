import mongoose from "mongoose";
import { MONGO_USER, MONGO_PASSWORD } from "./config.js";

const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.yjlgm9r.mongodb.net/dbposts?retryWrites=true&w=majority&appName=Cluster0`;

export const connectDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("Database connected");
  } catch (err) {
    console.error(err);
  }
};
