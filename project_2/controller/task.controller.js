import {readTask,writeTask} from "../utils/file.utils.js"


//get task for a user who exists   (if user exists then get the task specific for that user)
export const getAllTask=async(req,res)=>{

    //although we have implemented middleware for this , but somehow if someone breaches then it used here for security purposes.
    if(!req.session.user){
        return res.status(401).json({
            message:"unauthanticated"
        })
    }

    const tasks=await readTask();

    res.json(tasks.filter((task)=>task.username===req.session.user.username));
}




export const createTask=async(req,res)=>{
    
}

export const updateTask=(req,res)=>{
    res.send('task route');
}


export const deleteTask=(req,res)=>{
    res.send('task route');
}
