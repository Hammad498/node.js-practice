
import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signup=async(req,res)=>{
    try {
        const hashedPassword=await bcrypt.hash(req.body.password,10);
        const uploadImage=await cloudinary.uploader.upload(req.files.logoUrl.tempFilePath);
        console.log("image:",uploadImage);

        const newUser=new User({
            _id:new mongoose.Types.ObjectId(),
            channelName:req.body.channelName,
            email:req.body.email,
            phone:req.body.phone,
            password:hashedPassword,
            logoUrl:uploadImage.secure_url,
            logoId:uploadImage.public_id
        })

        let user=await newUser.save();

        res.status(201).json({message:"user created successfully!",success:true,user});

    } catch (error) {
        res.status(500).json({error:"Internal server error:signup",error});
        
    }
}



       