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
    const {title,description}=req.body;

    if(!title && !description){
        res.status(401).json({
            message:"Title and description required!"
        })
    }

    //append new tasks in already present tasks.
    const tasks=await readTask();

    const newTask={
        id:Date.now(),
        username:req.session.user.username,
        title,
        description,
        completed:false,
    }

    tasks.push(newTask);
    await writeTask(tasks);

    res.status(201).send(newTask);
}

export const updateTask=(req,res)=>{
    res.send('task route');
}


export const deleteTask=(req,res)=>{
    res.send('task route');
}
