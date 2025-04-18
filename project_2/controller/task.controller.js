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

    //append new tasks in already present tasks.//
    const tasks=await readTask();
    /////////////

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




export const updateTask=async (req,res)=>{
    
    const { id } = req.params;
    const {title, description}=req.body;

    const parsedId=parseInt(id);

    const tasks = await readTask();

    const taskIndex = tasks.findIndex((task) => task.id === parsedId);

    if (taskIndex === -1) {
        return res.status(404).send("Task with the specified ID not found");
    }

    
    const updatedTask = {
        ...tasks[taskIndex], 
        title: title || tasks[taskIndex].title, 
        description: description || tasks[taskIndex].description,
    };

    // Replace the old task with the updated task
    tasks[taskIndex] = updatedTask;

    
    await writeTask(tasks);

    
    res.json({
        message: "Task updated successfully",
        task: updatedTask,
    });
    
}


export const deleteTask=async (req,res)=>{
    const {id}=req.params;

    const parsedId=parseInt(id);

    const tasks=await readTask();

    const taskIndex=tasks.findIndex((task)=>task.id===parsedId);


    if(taskIndex===-1){
        return res.status(404).send("Task with the specified ID not found:deleteTask")
    }

    const deletedTask=tasks.splice(taskIndex,1)[0];
 
////////////////////////////
    
    await writeTask(tasks);

    res.json({
        message:"Task deleted successfully",
        task:deletedTask
    })

    
}
