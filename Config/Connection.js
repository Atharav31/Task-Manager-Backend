import mongoose from "mongoose";

const Connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { dbName: "Task-Manager" });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(error);
  }
};

export default Connection;
