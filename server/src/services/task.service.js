import Task from "../models/Task.js";

export const getAllTasks = async (userId) => {
  return await Task.find({
    user: userId,
  }).sort({
    createdAt: -1,
  });
};

export const getTaskById = async (taskId, userId) => {
  return await Task.findOne({
    _id: taskId,
    user: userId,
  });
};

export const createTask = async (taskData, userId) => {
  return await Task.create({
    ...taskData,
    user: userId,
  });
};

export const updateTask = async (
  taskId,
  taskData,
  userId
) => {
  return await Task.findOneAndUpdate(
    {
      _id: taskId,
      user: userId,
    },
    taskData,
    {
      new: true,
      runValidators: true,
    }
  );
};

export const deleteTask = async (taskId, userId) => {
  return await Task.findOneAndDelete({
    _id: taskId,
    user: userId,
  });
};