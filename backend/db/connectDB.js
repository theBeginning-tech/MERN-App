import mongoose from "mongoose";

async function connectDB() {
  try {
    const URI = process.env.MONGODB_URI;
    await mongoose.connect(URI);

    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
}

export default connectDB;
