import mongoose, { Schema } from "mongoose";


const commentSchema=new Schema({
    _Id:{
    type:mongoose.Types.ObjectId,
    },
    video_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video",
        required:true
    },
    commentText:{
        type:String,
        required:true
    },
    user_id:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true});





const Comment=mongoose.model("Comment",commentSchema);

export default Comment;

