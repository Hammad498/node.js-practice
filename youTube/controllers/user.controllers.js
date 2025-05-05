
import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
import bcrypt, { hash } from "bcrypt";
import jwt from 'jsonwebtoken'
import userModel from "../models/user.model.js";




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

   //////////////////////////////////////////////////////

  ////update channelName ,phone ,email and logoUrl///////
  export const updateProfile=async(req,res)=>{
    try {
      const userId=req.params.id;

      const user=await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      let newLogoUrl=null;

      if(req.files && req.files.logoUrl){
        await cloudinary.uploader.destroy(user.logoId);

        newLogoUrl=await cloudinary.uploader.upload(req.files.logoUrl.tempFilePath);
        
      }

      user.channelName = req.body.channelName || user.channelName;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;

      if (newLogoUrl) {
        user.logoUrl = newLogoUrl.secure_url;
        user.logoId = newLogoUrl.public_id;
      }
  
      await user.save();

      res.status(200).json({
        message:"successfuly updated!",
        data:user
      })



    } catch (error) {
      console.error("userUpdate error:", error);
      res.status(500).json({ error: "Internal server error: updateUser", error });
    }
  }


  //////////////////////////////////////////////////////



export const subscribe = async (req, res) => {
  try {

    //req to subscribe a channel comes
    const { channelId } = req.body;   // req.user._id=current user    want to subscribe channelId=other user's channel

    // Prevent subscribing to yourself (check that you are subscribing yourself)
    if (req.user._id.toString() === channelId.toString()) {
      return res.status(400).json({
        message: "Cannot subscribe to yourself!"
      });
    }

    // Check if channel exists   (when a req to subscribe a channel came check it )
    const userExists = await User.findById(channelId);
    if (!userExists) {
      return res.status(404).json({ message: "Channel not found" });
    }


    //okay now add subscription in subscribedChannel array (means current user is added )
    // Add channel to user's subscriptions
    //that channel is added to currentuser's array 
    const currentUser = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { subscribedChannels: channelId } },
      { new: true }
    );

    // Increment the subscriber count on the channel  
    const subscribedUser = await User.findByIdAndUpdate(
      channelId,
      { $inc: { subscribers: 1 } },
      { new: true }
    );

    res.status(200).json({
      message: "Successfully subscribed!",
      currentUser,
      subscribedUser
    });

  } catch (error) {
    console.error("Subscribe error:", error);
    res.status(500).json({
      message: "Failed to subscribe!",
      error: error.message || error
    });
  }
}

//////////////////////////////////////////////////////


export const unsubscribe = async (req, res) => {
  try {

    //req to unsubscribe a channel comes
    const { channelId } = req.body;   // req.user._id=current user    want to unsubscribe channelId=other user's channel

    if (!channelId) {
      return res.status(400).json({ message: "channelId is required!" });
    }

    // Prevent unsubscribing to yourself (check that you are unsubscribing yourself)
    if (req.user._id.toString() === channelId.toString()) {
      return res.status(400).json({
        message: "Cannot unsubscribe from yourself!"
      });
    }

    // Check if channel exists   (when a req to unsubscribe a channel came check it )
    const userExists = await User.findById(channelId);
    if (!userExists) {
      return res.status(404).json({ message: "Channel not found" });
    }


    //okay now add unsubscription in subscribedChannel array (means current user is removed )
    // remove channel to user's subscriptions
    //that channel is removed to currentuser's array 
    const currentUser = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { subscribedChannels: channelId } },
      { new: true }
    );

    // decrement the subscriber count on the channel  
    const subscribedUser = await User.findByIdAndUpdate(
      channelId,
      { $inc: { subscribers: -1 } },
      { new: true }
    );

    res.status(200).json({
      message: "Successfully Unsubscribed!",
      currentUser,
      subscribedUser
    });

  } catch (error) {
    console.error("UnSubscribe error:", error);
    res.status(500).json({
      message: "Failed to Unsubscribe!",
      error: error.message || error
    });
  }
}

  