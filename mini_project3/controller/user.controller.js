import User from "../model/user.model.js";


export const getUsers=async(req,res)=>{
    res.send('user get')
}

export const createUsers=async(req,res)=>{
    try {
        const {name,age,weight}=req.body;
    if(!name || !age || !weight ){
        res.status(401).json({
            message:"name,age,weight are required."
        })
    }
    const newUser=new User({
        name,
        age,
        weight
    })

    await newUser.save();

    res.status(201).json({
        message:"User created successfully",
    });

        
    } catch (error) {
        res.status(500).json({error:"Internal server error",error})
        
    }
}


export const updateUsers=async(req,res)=>{
    res.send('user update')
}

export const deleteUsers=async(req,res)=>{
    res.send('user delete')
}


