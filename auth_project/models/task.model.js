import { Schema, model } from "mongoose";


const taskSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        
    }
},{timestamps:true});



const Task= model("Task",taskSchema);


export default Task;