import mongoose from "mongoose";

mongoose.set("strictQuery", true);

export const connectDB = async () => {
  const url =
    "mongodb+srv://sinm4:zRfeyBnBMVsQ5GID@cluster0.2xmtyoe.mongodb.net/";

  try {
    const connection = await mongoose.connect(url, {
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (e) {
    console.log("Failed to connect database:", e);
  }
};
