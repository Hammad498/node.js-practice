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


////////////////////////////////////////////////////////////////////////////////////////////////

///no video change...just metadat change
export const updateVideoMetadata=async(req,res)=>{
    try {
       
        const videoId=req.params.id 

        let video=await Video.findById(videoId);


        if(!video){
            return res.status(404).json({
                message:"Not found!",
                error
            })
        }

        ///check ownership 
        if(video.user_id.toString()!==req.user._id.toString()){
            return res.status(403).json({
                message:"Unauthorized",
                error
            })
        }

        //if user wanted to update let suppose thumbnail , previous thumbnail should be destroyed !
        if(req.files && req.files.thumbnailUrl){
            await cloudinary.uploader.destroy(video.thumbnailId);

            const thumbnailUpload=await cloudinary.uploader.upload(req.files.thumbnailUrl.tempFilePath,{folder:"thumbnails"})

            video.thumbnailUrl=thumbnailUpload.secure_url;
            video.thumbnailId=thumbnailUpload.public_id;
        }


        video.title=req.body.title || video.title;
        video.description=req.body.description || video.description;
        video.category=req.body.category || video.category;
        video.tags=req.body.tags? req.body.tags.split(",") : video.tags;

        await video.save();

        res.status(200).json({
            message:"Successfullly updated!",
            video
        })
        
    } catch (error) {
        console.error("UPLOAD ERROR:", error);
        res.status(500).json({
            message:"Error (failed to update!)",
            error
        })
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////

export const deleteVideo=async(req,res)=>{
    try {
        const videoId=req.params.id;

        let video=await Video.findById(videoId);

        if(!video){
            return res.status(404).json({
                message:"Id not found!",
                error
            })
        }

        //same for ownership 
        if(video.user_id.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message:"Unauthenticated: Delete!",
                error
            })
        }

        //now we have the video by id and ownership checked now its time to delete the video along with thumbnail from cloudinary
        await cloudinary.uploader.destroy(video.videoUrl,{resource_type:'video'});
        await cloudinary.uploader.destroy(video.thumbnailId);


        //deletd from cloudinary now by idea remove from db
        await Video.findByIdAndDelete(videoId);

        res.status(200).json({
            message:"successfully deleted !",
            data:video,
        })
        
    } catch (error) {
        console.error("DELETE ERROR:", error);
        res.status(500).json({
            message:"Error (failed to delete!)",
            error
        })
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////


export const getAllVideos=async(req,res)=>{
    try {
        const video=await Video.find().sort({createdAt:-1});
        res.status(200).json({
            message:"Successfully get all videos!",
            data:video
        })
        console.log("videos...",video);
        
    } catch (error) {
        console.error("GET_ALL_VIDEOS ERROR:", error);
        res.status(500).json({
            message:"Error (failed to getAllVideos!)",
            error
        })
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////

export const getOwnVideo=async(req,res)=>{
    try {

        //get video of that user ,who hit the request
        const video=await Video.find({user_id:req.user._id}).sort({createdAt:-1});

        res.status(200).json({
            message:"Successfully get own videos!",
            data:video
        });

        console.log("getOwnVideo",video);
        
    } catch (error) {
        console.error("GET_OWN_VIDEOS ERROR:", error);
        res.status(500).json({
            message:"Error (failed to getOwnVideos!)",
            error
        })
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////

export const getById=async(req,res)=>{
    try {
        const videoId=req.params.id;

        const video=await Video.findById(videoId);

        if(!video){
            return res.status(404).json({
                message:"video not found:getById",
                error
            })
        };

        //ownsership
        if(video.user_id.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message:"Unautorized: getById",
                error
            })
        };

        res.status(200).json({
            message:"Successfully getById",
            data:video,
        })

        console.log(`getbyid:`,video);
        
    } catch (error) {
        console.error("GET_OWN_VIDEOS ERROR:", error);
        res.status(500).json({
            message:"Error (failed to getOwnVideos!)",
            error
        })
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////

///get the video by id and viewedby feature
export const get=async(req,res)=>{
    try {
        const videoId=req.params.id;
        const userId=req.user._id;


        // Use findByIdAndUpdate to add the user ID to the viewedBy array if not already present
        const video=await Video.findByIdAndUpdate(
            videoId,
            {
                $addToSet:{viewedBy:userId}
            },
            {new:true}
        )
        
        if (!video) return res.status(404).json({ error: "Video not found" });

        res.status(200).json(video);
        console.log('video by id',video);


    } catch (error) {
        console.error("GET__VIDEOS ERROR:", error);
        res.status(500).json({
            message:"Error (failed to getVideos & viewed by!)",
            error
        })
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////

export const getByCategory=async(req,res)=>{
    try {
        const category=req.params.category;

        const videoCategory=await Video.find({category:category}).sort({createdAt:-1});

        res.status(200).json({
            message:"getByCategory successfully done!",
            data:videoCategory
        })
        console.log(videoCategory);

    } catch (error) {
         console.error("GET__BY_CATEGORY ERROR:", error);
        res.status(500).json({
            message:"Error (failed to getByCategory!)",
            error
        })
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////

export const getByTags=async(req,res)=>{
    try {
        const tag=req.params.tags;

        const videoTags=await Video.find({tags:tag}).sort({createdAt:-1});

        res.status(200).json({
            message:"successfully get by tags!",
            data:videoTags,
        })

        console.log(videoTags);
        
    } catch (error) {
        console.error("GET__BY_Tags ERROR:", error);
        res.status(500).json({
            message:"Error (failed to getByTags!)",
            error
        })
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////

export const likes=async(req,res)=>{
    try {
        const {videoId}=req.body;

        const like = await Video.findByIdAndUpdate(
            videoId,
            {
                $addToSet: { likedBy: req.user._id },
                $pull: { dislikedBy: req.user._id },
                // $addToSet:{viewedBy:req.user._id},
                // $addToSet:{likedBy:req.user.email}
            },
            { new: true }
        );

        res.status(200).json({ message: "Liked the video",like });
        console.log(like)

        
    } catch (error) {
        console.error("likes route ERROR:", error);
        res.status(500).json({
            message:"Error (failed to like!)",
            error
        })
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////

export const dislikes=async(req,res)=>{
    try {
        const {videoId}=req.body;

        const dislike=await Video.findByIdAndUpdate(
            videoId,
            {
                $addToSet: { dislikedBy: req.user._id },
                $pull: { likedBy: req.user._id }
            },
            { new: true }
        );

        res.status(200).json({
            message:"Successfully disliked!",
            data:dislike
        })

        console.log(dislike)
        
    } catch (error) {
        console.error("dislike route ERROR:", error);
        res.status(500).json({
            message:"Error (failed to dislike!)",
            error
        })
    }
}