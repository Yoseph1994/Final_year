"use server";
import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_ATLAS);
    console.log("mongodb connected");
  } catch (error) {
    console.log(error);
    throw new Error("Error occurred in mongodb", error);
  }
};

export default connectDB;
