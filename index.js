import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import Connection from "./Config/Connection.js";
import router from "./Routes/routes.js";
const app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:3000",
  "https://task-manger-hazel.vercel.app",
];
app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
  })
);
Connection();

app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
