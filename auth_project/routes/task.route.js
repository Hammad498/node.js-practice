import { Router } from "express";

import { addTask,fetchTask } from "../controller/task.controller.js";
import { validateSession } from "../middleware/session.middleware.js";

const router=Router();

//add task that is currently loged in , so make a middleware for it
router.post('/',validateSession,addTask)
router.get('/',validateSession,fetchTask)


export default router;