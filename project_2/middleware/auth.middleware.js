///weather session exists or not and user exists or not   (before logout i think so)---->checking through middleware
////
export const Middleware=(req,res,next)=>{

    if(req.session && req.session.user){
       return next();
    }
    else{
        res.status(404).send('Unautharoized')
    }

}