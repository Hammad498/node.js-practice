
import { createTask,getTasks } from "../services/task.service.js";


export const addTask=async(req,res)=>{
    const {title,description}=req.body;

    try {
        const task=await createTask(req.session.userId,title,description);

        res.status(201).json({
            message:"task created successfully!",
            success:true,
            data:task
        })
        
    } catch (error) {
        res.status(500).json({
            message:"Failed to create task",
            success:false,
            error:message.error
        })
        
    }

}


export const fetchTask=async(req,res)=>{

    try {
        const tasks=await getTasks(req.session.userId);

        res.status(200).json({
            message:"task get successfully!",
            success:true,
            data:tasks
        })
        
    } catch (error) {
        res.status(500).json({
            message:"Failed to create task",
            success:false,
            error:message.error
        })
        
    }
    
}