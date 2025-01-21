import express from "express";
import {
  login,
  logout,
  profile,
  signup,
} from "../Controllers/UserController.js";
import {
  createTask,
  deleteTask,
  getTask,
  updateTask,
} from "../Controllers/TaskManger.js";
import { isAuthenticated } from "../Middlewares/Cookies.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.put("/profile", isAuthenticated, profile);
router.post("/createTask", isAuthenticated, createTask);
router.get("/getTask/:userId", isAuthenticated, getTask);
router.put("/updateTask/:taskId", isAuthenticated, updateTask);
router.delete("/deleteTask/:taskId", isAuthenticated, deleteTask);
export default router;
