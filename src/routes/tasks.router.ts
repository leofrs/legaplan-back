import { Router } from "express";

import { TasksController } from "../controllers/tasks.controller";

export const routerTask = Router();
const tasksController = new TasksController();

routerTask.get("/api/v1/get-all-task", tasksController.getAllTasks);
routerTask.post("/api/v1/create-task", tasksController.create);
routerTask.delete("/api/v1/delete-task-by-id/:id", tasksController.deleteById);
routerTask.put("/api/v1/updated-task/:id", tasksController.concludeTask);
