
import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
import bcrypt, { hash } from "bcrypt";
import jwt from 'jsonwebtoken'




export const signup = async (req, res) => {
    try {
      console.log("Request made!");
  
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      // console.log("Password hashed");
  
      // console.log("Uploading image...");
      const uploadImage = await cloudinary.uploader.upload(req.files.logoUrl.tempFilePath);
      // console.log("Image uploaded", uploadImage);
  
      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        channelName: req.body.channelName,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword,
        logoUrl: uploadImage.secure_url,
        logoId: uploadImage.public_id
      });
  
      let user = await newUser.save();
      console.log("User saved to DB");
  
      res.status(201).json({ message: "User created successfully!", success: true, user });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ error: "Internal server error: signup", error });
    }
  };
  //////////////////////////////////////////////////////

  //login take 2 things (email & password) and then store in jwt token

  export const login=async(req,res)=>{
    try {

      //now user is signedup and as we know the email is unique in db, so try to find weather user exists or not
      const existingUser=await User.findOne({email:req.body.email});

      if(!existingUser){
        return res.status(404).json({
          message:"user not found!:login",
        })
      }

      ///now password
      const isValid=await bcrypt.compare(req.body.password,existingUser.password);

      if(!isValid){
        return res.status(404).json({
          message:"password is incorrect!:login",
        })
      }


      //now after email&password store it in jwttoken

      const token=jwt.sign({
        _id:existingUser._id,
        channelName:existingUser.channelName,
        email:existingUser.email,
        phone:existingUser.phone,
        logoId:existingUser.logoId
      },process.env.JWT_TOKEN,{expiresIn:"10d"})

      res.status(200).json({
        _id:existingUser._id,
        channelName:existingUser.channelName,
        email:existingUser.email,
        phone:existingUser.phone,
        logoId:existingUser.logoId,
        logoUrl:existingUser.logoUrl,
        token:token,
        subscribers:existingUser.subscribers,
        subscribedChannels:existingUser.subscribedChannels
      })
      
    } catch (error) {
      console.error("login error:", error);
      res.status(500).json({ error: "Internal server error: login", error });
    }
  }


       