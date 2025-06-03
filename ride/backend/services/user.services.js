import userModel from "../models/users.model.js";



export const createUser=async({firstname,lastname,email,password})=>{
    

    if(!firstname || !lastname || !email || !password){
        res.status(404).json({
            message:"Not found!",
            error
        })
    }

    const newUser=userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })

    return newUser;
    
}