import mongoose, { Schema } from "mongoose";


const commentSchema=new Schema({
    Id:{
    type:mongoose.Types.ObjectId,
    },
},{timestamps:true});



const commentModel=mongoose.model("Comment",commentSchema);

export default commentModel;

