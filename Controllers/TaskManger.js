import User from "../Models/User.js";
import Task from "../Models/Task.js";

export const createTask = async (req, res) => {
  try {
    console.log(req.body);
    const { title, description, status, userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!title || !description || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingTask = await Task.findOne({ $or: [{ title }, { userId }] });

    if (existingTask) {
      if (existingTask.title === title) {
        return res.status(400).json({ message: "Task title already exists" });
      }
    }

    const task = new Task({ title, description, status, userId });
    await task.save();
    res.status(201).json({ message: "Task created successfully", data: task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTask = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(userId);
    const tasks = await Task.find({ userId });
    console.log(tasks);
    res.status(200).json({ message: "Get Task", data: tasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status } = req.body;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.title = title;
    task.description = description;
    task.status = status;
    await task.save();
    res.status(200).json({ message: "Task updated successfully", data: task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    await task.deleteOne();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
