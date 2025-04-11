import {Router} from 'express';

const router=Router();

router.get("/dashboard",(req,res)=>{
    res.status(200).json({message:"Hello from private route"});
})

export default router;