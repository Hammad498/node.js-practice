
import {Router} from 'express';

const router=Router();


router.get("/generate-token",(req,res)=>{
    const token="1234567890abcdefg";
    res.status(200).json({token});
})


router.get("/", (req,res)=>{
    res.status(200).json({message:"Hello from public route"});
})


export default router;