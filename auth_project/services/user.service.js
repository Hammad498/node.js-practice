
import bcrypt from "bcrypt";
import User from '../models/user.model.js';

export const registerUser=async(username,password)=>{
    const hashedPassword=await bcrypt.hash(password,10);
    const user=new User({username,password:hashedPassword})
    await user.save();

}