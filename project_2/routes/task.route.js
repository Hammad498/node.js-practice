import { Router } from "express";
import { getAllTask,createTask,updateTask,deleteTask } from "../controller/task.controller.js";
import { Middleware } from "../middleware/auth.middleware.js";


const router=Router();

router.get("/",Middleware,getAllTask);
router.post("/",Middleware,createTask);
router.put("/:id",Middleware,updateTask);
router.delete("/:id",Middleware,deleteTask);



export default router;