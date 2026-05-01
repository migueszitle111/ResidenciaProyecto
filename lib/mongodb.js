// lib/mongodb.js
import mongoose from 'mongoose';

let isConnected = false;

export const connectMongoDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("DB connected");
  } catch (error) {
    console.error("Error connecting to DB:", error);
    throw error;
  }
};
