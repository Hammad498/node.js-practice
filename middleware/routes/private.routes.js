import {Router} from 'express';

const router=Router();


//auth middleware before accessing the dashboard
router.get("/dashboard",authMiddleware,(req,res)=>{
    res.status(200).json({message:"Hello from private route"});
})

export default router;