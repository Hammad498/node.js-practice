

import User from "../models/user.model.js";
import { registerUser } from "../services/user.service.js";

export const signup=async(req,res)=>{
    const {username,password}=req.body;


    try {
        const user=await registerUser(username,password);
        res.status(201).json({message:"user created successfully!",success:true,data:user});
        
    } catch (error) {
        res.status(500).json({error:"Internal server error:signup",error});
        
    }

    
}


export const login=async(req,res)=>{
    res.status(200).json({message:"Hello from login route"});
}



export const logout=async(req,res)=>{
    res.status(200).json({message:"Hello from logout route"});
}