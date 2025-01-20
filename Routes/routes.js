import express from "express";
import { login, signup } from "../Controllers/UserController.js";
import { createTask } from "../Controllers/TaskManger.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/createTask", createTask);
export default router;
