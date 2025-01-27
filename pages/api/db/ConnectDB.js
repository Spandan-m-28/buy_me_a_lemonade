import mongoose from 'mongoose';

const dbConnect = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default dbConnect;
