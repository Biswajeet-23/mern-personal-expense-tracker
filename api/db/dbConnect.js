import mongoose from "mongoose";
import { config } from "dotenv";
config();

const url = process.env.MONGO_URL;

const dbConnect = async () => {
  try {
    await mongoose.connect(url);
    console.log("database connected successfully");
  } catch (err) {
    console.log(err.message);
  }
};

export default dbConnect;
