import express from "express";
import { login, logout, signup } from "../Controllers/UserController.js";
import { createTask, getTask } from "../Controllers/TaskManger.js";
import { isAuthenticated } from "../Middlewares/Cookies.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.post("/createTask", isAuthenticated, createTask);
router.get("/getTask/:userId", isAuthenticated, getTask);
export default router;
