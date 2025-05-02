
import jwt from 'jsonwebtoken'

export const checkAuth=async(req,res,next)=>{

    try {

        //login user has a token (get that token), then verify that token then he can upload video
        const token=req.headers.authorization?.split(" ")[1];

        if(!token){
            return res.status(401).json({
                message:'no token provided!'
            })
        }
        const decodedUser=jwt.verify(token,process.env.JWT_TOKEN);
        req.user=decodedUser;
        next();


    } catch (error) {
        console.error("authentication error:", error);
      res.status(500).json({ error: "Internal server error: checkAuth", error });
    }
}