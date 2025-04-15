import { Router } from "express";
import { getAllTask,createTask,updateTask,deleteTask } from "../controller/task.controller.js";
// import { Middleware } from "../middleware/auth.middleware.js";


const router=Router();

router.get("/",getAllTask);
router.post("/",createTask);
router.put("/:id",updateTask);
router.delete("/:id",deleteTask);



export default router;