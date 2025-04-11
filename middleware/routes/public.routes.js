
import {Router} from 'express';
import { generateToken, validateToken } from '../utils/token.utils.js';



const router=Router();


router.get("/generate-token",(req,res)=>{
    const token=generateToken();

    res.status(200).json({token});
    
})


router.get("/", (req,res)=>{
    res.status(200).json({message:"Hello from public route"});
})


export default router;