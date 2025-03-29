import mongoose from "mongoose";
import { DATABASE_URI, NODE_ENV } from "../config/env.js";

if (!DATABASE_URI) {
  throw new Error("Database URI is not provided");
}

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URI);
    console.log(`MongoDB connected: ${NODE_ENV}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
