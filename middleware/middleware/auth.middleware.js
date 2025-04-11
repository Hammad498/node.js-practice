
import { validateToken } from "../utils/token.utils.js";

const authMiddleware=(req,res,next)=>{
    const token=req.headers['authorizations'];

    if(token && validateToken(token)){
        //custom user
        req.user={name:"ali", id:1};
        next();

    }
    else{
        res.status(404).send("unauthorized: missing or invalid token")
    }
}


export default authMiddleware;