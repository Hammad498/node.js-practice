import { validationResult } from "express-validator"
import userModel from "../models/users.model.js"
import { createUser } from "../services/user.services.js"




////register user with name ,email and password , if not exists then first create user then register 
export const registerUser=async(req,res,next)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({
            message:'Error while validating the user',
            errors
        })
    }

    try {
        const {fullname,email,password}=req.body;

    const hashedPassword=await userModel.hashPassword(password);

    const user=await createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    })

    console.log('New user:', user);

    //token associated with the user (who is currently logedin or registed---whenever a new user created a token of that user also created along with that user)
    const token=user.generateAuthToken();

    res.status(200).json({token,user,message:"Successfully registered!"})

    } catch (error) {
    console.error('Register error:', error.message, error.stack);
    res.status(500).json({
        message: "Unable to register the user!",
        error: error.message
    });
}

};
