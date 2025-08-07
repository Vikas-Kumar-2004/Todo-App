import express from "express";
import Task from "../models/Task.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Create Task
router.post("/", authMiddleware, async (req, res) => {
  try {
    const task = new Task({ ...req.body, user: req.user });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get All Tasks
router.get("/", authMiddleware, async (req, res) => {
  const tasks = await Task.find({ user: req.user });
  res.json(tasks);
});

// Update Task
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate({ _id: req.params.id, user: req.user }, req.body, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete Task
router.delete("/:id", authMiddleware, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, user: req.user });
  res.json({ message: "Task deleted" });
});

// Rate Task
router.post("/:id/rate", authMiddleware, async (req, res) => {
  const { rating } = req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      { rating },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Aggregation - Average Rating
router.get("/ratings/average", authMiddleware, async (req, res) => {
  try {
    const avgRatings = await Task.aggregate([
      { $match: { user: req.user } },
      { $group: { _id: "$user", averageRating: { $avg: "$rating" } } }
    ]);
    res.json(avgRatings[0] || { averageRating: 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
