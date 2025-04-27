


import User from "../models/user.model.js";
import { registerUser,LoginUser } from "../services/user.service.js";

export const signup=async(req,res)=>{
    const {username,password}=req.body;


    try {
        const user=await registerUser(username,password);
        res.status(201).json({message:"user created successfully!",success:true,user});
        
    } catch (error) {
        res.status(500).json({error:"Internal server error:signup",error});
        
    }

    
}

//when signup we get an id of the user , when login store that id in session ,so that we can identify the user with that id(or currently loged in user)
export const login=async(req,res)=>{
    const {username,password}=req.body;



    try {
        //find user
        const user=await LoginUser(username,password);

        //save id in session
        req.session.userId=user._id;
        res.status(200).json({
            success:true,
            message:"Login successful!"
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error login",
            error:error.message
        })
        
    }
}






export const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).json({ success: false, message: "Logout failed" });
        }

        res.clearCookie("connect.sid"); 
        res.status(200).json({ success: true, message: "Logout successful" });
    });
};
