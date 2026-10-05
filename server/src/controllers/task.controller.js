import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../services/task.service.js";

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await getAllTasks(req.user._id);

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleTask = async (req, res, next) => {
  try {
    const task = await getTaskById(
      req.params.id,
      req.user._id
    );

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const createNewTask = async (req, res, next) => {
  try {
    const { title, description, status, priority } = req.body;

    if (!title) {
      res.status(400);
      throw new Error("Title is required");
    }

    const task = await createTask(
      {
        title,
        description,
        status,
        priority,
      },
      req.user._id
    );

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const updateExistingTask = async (
  req,
  res,
  next
) => {
  try {
    const task = await updateTask(
      req.params.id,
      req.body,
      req.user._id
    );

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteExistingTask = async (
  req,
  res,
  next
) => {
  try {
    const task = await deleteTask(
      req.params.id,
      req.user._id
    );

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};