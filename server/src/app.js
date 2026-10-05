import express from "express";
import cors from "cors";

import taskRoutes from "./routes/task.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
  });
});

app.use("/api/tasks", taskRoutes);

export default app;