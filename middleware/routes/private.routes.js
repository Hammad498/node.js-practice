import {Router} from 'express';
import  authMiddleware  from '../middleware/auth.middleware.js';

const router=Router();


//auth middleware before accessing the dashboard
router.get("/dashboard",authMiddleware,(req,res)=>{
    res.status(200).json({message:`Welcome to dashboard:${req.user.name}` });
})

export default router;