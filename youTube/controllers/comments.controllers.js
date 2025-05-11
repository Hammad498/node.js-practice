import mongoose from "mongoose";
import Comment from "../models/comment.model.js";

export const comment=async(req,res)=>{
    try {
        const {video_id,commentText}=req.body;

        if(!commentText && !video_id){
            return res.status(404).json({
                message:"not found",
            })
        }
///
        const newComment=new Comment({
            _id:new mongoose.Types.ObjectId(),
            video_id,
            commentText,
            user_id:req.user._id
        })

        await newComment.save();


        res.status(200).json({
            message:"Successfully created a new comment!",
            data:newComment
        })
        console.log(newComment);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Something went wrong!:comment",
            error
        })
    }
}