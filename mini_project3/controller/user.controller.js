import User from "../model/user.model.js";


export const getUsers=async(req,res)=>{
    try {
        const user=await User.find();
        res.status(200).json(user,{message:"User fetched successfully"});
        
    } catch (error) {
        res.status(500).json({error:"Internal server error:getUsers",error})
        
    }
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


export const updateUsers = async (req, res) => {
    const { id } = req.params;
    const { name, age, weight } = req.body;

    try {
        

        const updateUser  = await User.findByIdAndUpdate(id, { name, age, weight }, { new: true, runValidators: true });

        if (!updateUser ) {
            return res.status(404).json({
                message: "User  not found."
            });
        }

        res.status(200).json({
            message: "User  updated successfully",
            updateUser 
        });

    } catch (error) {
        res.status(500).json({ error: "Internal server error: updateUsers", error });
    }
}





export const deleteUsers = async (req, res) => {
    const { id } = req.params;
    try {
        

        const deleteUser  = await User.findByIdAndDelete(id);

        if (!deleteUser ) {
            return res.status(404).json({
                message: "User  not found"
            });
        }

        res.status(200).json({
            message: "User  deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal server error: deleteUsers", error });
    }
}


