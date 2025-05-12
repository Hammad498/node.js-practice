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

////////////////////////////////////////////////////////////////////////////////

export const deleteComment=async(req,res)=>{
    try {
        const commentId=req.params.id;
        const comment=await Comment.findById(commentId);

        if(!comment){
            return res.status(404).json({
                message:"Not found that comment!",
                error
            })
        }

        if(comment.user_id.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message:"Forbidden!:unauthorized",
                error
            })
        }


        await Comment.findByIdAndDelete(comment);
        res.status(200).json({
            message:"Successfull in deleting comment!",
            data:comment
        })

        console.log(comment);
        
    } catch (error) {
         console.log(error);
        res.status(500).json({
            message:"Something went wrong!:delete_comment",
            error
        })
    }
}



////////////////////////////////////////////////////////////////////////////////

export const editComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { commentText } = req.body;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                message: "Not found that comment!"
            });
        }

        if (comment.user_id.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Forbidden!:unauthorized"
            });
        }

        comment.commentText = commentText;
        await comment.save();

        res.status(200).json({
            message: "Successfully updated comment!",
            data: comment
        });

        console.log(comment);

    } catch (error) {
        console.error("EDIT COMMENT ERROR:", error);
        res.status(500).json({
            message: "Something went wrong!:edit_comment",
            error: error.message
        });
    }
};
