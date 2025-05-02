

//only authenticated user upload the video   (middleware to check it)
export const upload=async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({
            message:"Error (failed to upload)",
            error
        })
        
    }
}