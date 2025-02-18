import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("MongoDB connection failed");
  }
};

export default dbConnect;
