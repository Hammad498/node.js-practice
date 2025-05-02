import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
import Video from "../models/video.model.js";

//only authenticated user upload the video   (middleware to check it)
export const upload=async(req,res)=>{
    try {
        

        // console.log("FILES RECEIVED:", req.files);
        // console.log("BODY RECEIVED:", req.body);

        if(!req.files || !req.files.videoUrl || !req.files.thumbnailUrl){
            return  res.status(400).json({
                error:"Video and thumbnail are required!"
            })
        }
        
        const videoUpload=await cloudinary.uploader.upload(req.files.videoUrl.tempFilePath,{resource_type:"video",folder:"videos"});
        const thumbnailUpload=await cloudinary.uploader.upload(req.files.thumbnailUrl.tempFilePath,{folder:"thumbnails"});

        const newVideo=new Video({
            _id:new mongoose.Types.ObjectId(),
            title:req.body.title,
            description:req.body.description,
            user_id:req.user._id,
            videoUrl:videoUpload.secure_url,
            videoId:videoUpload.public_id,
            thumbnailUrl:thumbnailUpload.secure_url,
            thumbnailId:thumbnailUpload.public_id,
            category:req.body.category,
            tags:req.body.tags? req.body.tags.split(','):[],

        })

        let video=await newVideo.save();

        res.status(200).json({
            message:"Uploaded successfully!",
            video
        })
        
    } catch (error) {
        console.error("UPLOAD ERROR:", error);
        res.status(500).json({
            message:"Error (failed to upload)",
            error
        })
        
    }
}